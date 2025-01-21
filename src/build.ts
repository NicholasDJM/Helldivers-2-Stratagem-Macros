import { writeFileSync, existsSync } from "node:fs"
import { join } from "node:path"
import { cwd } from "node:process";
import { stratagems, version } from "../help/src/js/stratagems.js"
import { EOL } from "node:os";
import { parse, parseReturn } from "./inject.mjs"; // Requires Deno to import, as this module uses web imports.
import { read } from "./read.mjs";
import { langLong } from "./lang.mjs";
import { optionsData } from "./config_template.js"
import { actions } from "./actions.mjs";
import { commands } from "./command_template.js";
import { configOutput } from "./config_gen.mjs";


// Constructs the AutoHotkey script, using dynamic data, including the version number, and the entire list of Stratagems.


interface Options {
	name: string,
	type: "string" | "number" | "boolean" | "path",
	defaultData: string | number | boolean,
	description: string
}



function buildAhk() {
	const html = read("..","help","dist","index.html").replaceAll("`","``"), // Must escape backticks.
		formattedStratagems = stratagems.map(item => {
			// TODO Action handling should be moved to it's own file, and referenced here, and anywhere else we need to format stratagems. Prebuild.js should also do this.
			if (item.buildConfig) {
				
				if (item.buildConfig.note) {
					console.info(item.buildConfig.note)
				}
				if (item.buildConfig.action && item.buildConfig.action === "do not generate") {
					return ""
				}
				if (item.buildConfig.action && item.buildConfig.action === "warn") {
					console.warn("===================================================");
					console.warn(`Warning: ${item.key} encountered, action set to warn against stratagem.`);
					console.warn("===================================================");
				}
				if (item.buildConfig.action && item.buildConfig.action === "fail") {
					throw new Error(`Error: ${item.key} encountered, action set to fail build against stratagem.`);
				}
				if (item.buildConfig.specialAction && actions[item.buildConfig.specialAction]) {
					return actions[item.buildConfig.specialAction](item)
				} else {
					throw new Error(`${item.key}: No such action as "${item.buildConfig.specialAction}"`)
				}
				
			}
			return `${EOL
			}Case "${item.key.toLowerCase().replace("-", " ")}":${EOL
			}\tStratagem(${JSON.stringify(item.code)})`
		}).join('')
	//let optionsData: Options[] = JSON5.parse(read("config_template.json5"));
	let count = 0
	for (const line of html.split(EOL)) {
		count++;
		/*
			In AutoHotkey, variables can span multiple lines if they're written as this:

			```ahk
			multiline := "
			(
				This
				Is
				A
				Multiline
				Variable
			)"
			```
			So if a line inside the injected data contains that last bit, the `)"`,
			it will prematurely end the multiline variable, causing data to leak,
			and leave the AutoHotkey parser the potential to parse non-AHK data.
		*/
		if (/^\s*\)".*/.test(line)) throw new Error("Cannot process file. AutoHotkey script will crash. Line "+count+" starts with `)\"`, which will prematurely end a multiline variable. Not compiling.")
	}

	optionsData.forEach(({name, type}, index)=>{
		if (!name) throw new Error(`Missing a name in config_template.json5 (Entry ${index+1})`);
		if (!type) throw new Error(`Missing a type in config_template.json5 (Entry ${index+1})`);
		if (type !== "string" && type !== "boolean" && type !== "number" && type !== "path") throw new Error(`Type is incorrect in config_template.json5. Should be one of string, number, boolean, or path. (Entry ${index+1})`);
	})
	const optionsData2 = optionsData.map(({name, type, defaultData, description})=>{
		// Surround value in quotes
		if (type === "string" || type === "path") defaultData = `"${defaultData}"`
		return {name, type, defaultData, description}
	})
	// These are dynamically generated AutoHotkey code, which enables dynamically generating CLI flags parsing and config file parsing
	const optionsDefault = optionsData2.map(({name, defaultData, description})=>{
		return `options["${name}"] := ${defaultData} ; ${description}`
	}).join(EOL),
		optionsParse = optionsData2.map(({name, type}, index)=>{
			return `${index > 0 ? "\t\t" : ""}options["${name}"] := tomlRead${type[0].toUpperCase()+type.slice(1)}(A_LoopReadLine, "${name}") || options["${name}"]`
		}).join(EOL),
		cliParse = optionsData2.map(({name, type}, index)=>{
			let str = ""
			switch (type) {
				case "boolean":
					str = `split[2] = "true"`
					break;
				case "string":
				case "number":
					str = `split[2]`
					break
				case "path":
					str = `RegExReplace(RegExReplace(split[2], "^[\`"']"), "[\`"']$")`
					break
			}
			return `${index > 0 ? "\t\t\t" : ""}case "${name}":${EOL}\t\t\t\toptions["${name}"] := ${str}`;
		}).join(EOL),
		commandParse = commands.map(({name, goto}, index)=>{
			return `${index > 0 ? "\t\t\t" : ""}case "${name}":${EOL}\t\t\t\tgoto ${goto}`
		}).join(EOL)

	let file = parseReturn("Helldivers 2 Macros_template.ahk", {
			html,
			stratagems: formattedStratagems,
			language: langLong,
			options: optionsDefault,
			optionsParse,
			cliParse,
			configOutput,
			commandParse
		}),
		lines = file.split(EOL),
		multilineComment = false,
		removeLine = false,
		multilineVariable = false;
		
	for (let i = 0;i<lines.length;i++) if (typeof lines[i]!=="string") throw new Error("Got a line that is not of type string. How?");
	
	// TODO: Some of the below code should be moved to inject.js, as some of the functionality is it's job, not this script's job.
	// Started building the injection functionality before I had a solid idea of function boundaries.
	// Ideally, all of inject.js and the code below should be moved into a dedicated AutoHotkey script parser/compiler. But that's waaaaay out of scope for this project.

	// This sections removes empty lines, single line comments, and JSDoc comments from AutoHotkey scripts, but leaves multiline comments alone.
	// However, if a single line comment comes after some code on the same line, it's not removed.
	// Multiline comments are not removed, as I need them to add a license header.
	// Removes lines between !REMOVE_START() and !REMOVE_END(), inclusively.
	for (let i = 0; i < lines.length; i++) {
		const ahkComment = "\\s*;.*", // This only removes comments on their own line. It's too complex to detect comments on the same line as code.
			emptyLine = "\\s*",
			jsDocComment = "\\s*\\/\\*\\*.*",
			jsDocMiddle = "\\s*\\*.*",
			multilineCommentEnd = ".*\\*\\/.*",
			removeLineComment = ".*;!REMOVE().*", // Add ;!REMOVE() to any line to remove it from the final build.
			shouldRemoveLine = RegExp(`^(${ahkComment}|${emptyLine}|${jsDocComment}|${jsDocMiddle}|${multilineCommentEnd}|${removeLineComment})$`),
			isMultiLine = RegExp("^\\s*\\/\\*(?!\\*).*") // Why is regex so god damn hard?! Thank you, AI chat bots for fixing this for me! I'm never touching this code again.
		if (!multilineComment) {
			if (isMultiLine.test(lines[i]) && !removeLine) {
				multilineComment = true;
			} else if (shouldRemoveLine.test(lines[i]) || removeLine) {
				if (lines[i].includes("!REMOVE_START()")) removeLine = true;
				if (lines[i].includes("!REMOVE_END()")) removeLine = false;
				lines = [...lines.slice(0, i), ...lines.slice(i+1)];
				i--;
				if (i<0) i=0 // Must clamp index. If file starts with a line that is removed, we end up in the negatives.
			}
		}
		if (lines[i].includes("*/")) {
			multilineComment = false;
		}
		if (!multilineVariable) {
			// TODO: This doesn't check for multiline comments.
			if (/^\($/.test(lines[i])) { // This test ensures multiline variables in AutoHotkey have any tabs in their text preserved.
				multilineVariable = true
			} else {
				lines[i] = lines[i].replace(/^\t+/, "") // Remove tab characters.
			}
		}
		if (/^\)"/.test(lines[i])) {
			multilineVariable = false
		}
	}
	const lastbuild = Number(existsSync("./lastBuild.txt") && read("lastBuild.txt")) || 1
	lines.unshift(`; Build ${lastbuild}, last built ${new Date().toLocaleString()}`)
	file = lines.join(EOL)

	writeFileSync(join(cwd(), "..", "dist", `Helldivers 2 Macros.${langLong}.ahk`), file)

}

buildAhk()


parse(`readme_template.md`, "../readme.md", {
	version,
	example: read("../help/src/example.ahk"),
	stratagems: stratagems.map(item => `- ${item.displayName ?? item.key.split(" ").map(value=>value[0].toUpperCase()+value.slice(1)).join(" ")}`).join("\n")
})


parse("./wizard_template.ahk", "../install.ahk", {
	language: langLong,
	languageMap: JSON.stringify(
		read("supportedLangs.txt")
			.replaceAll("`", "``") // Backticks must be doubled, as backticks are escape characters in AutoHotkey
			.split(EOL)
			.filter(value=>!/[\s]*/.test(value))
			.map(value=>value.split("="))
		)
})