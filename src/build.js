import { writeFileSync } from "node:fs"
import { join } from "node:path"
import { cwd, env } from "node:process";
import { stratagems } from "../help/src/js/stratagems.js"
import { EOL } from "node:os";
import { includeFile, replaceInjectKeyword } from "./inject.js";
import { read } from "./read.js";
import { langLong } from "./lang.js";

// Constructs the AutoHotkey script, using dynamic data, including the version number, and the entire list of Stratagems.



const template = read("Helldivers 2 Macros.ahk"),
	html = read("..","help","dist","index.html").replaceAll("`","``"), // Must escape backticks.
	formattedStratagems = stratagems.map(item => 
		`${EOL
		}Case "${item.key.toLowerCase().replace("-", " ")}":${EOL
		}\tStratagem(${JSON.stringify(item.code)})`)
		.join('')

for (const line of html.split(EOL)) {
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
		and leave the AutoHotkey parser the potential to parse non AHK data.
	*/
	if (/^\s*\)".*/.test(line)) throw new Error("Cannot process file. AutoHotkey script will crash. If a line starts with `)\"`, it will prematurely end multiline variables. Not compiling.")
}


let file = includeFile(
		replaceInjectKeyword(template, {
			html,
			stratagems: formattedStratagems,
			language: langLong
		})
	),
	lines = file.split(EOL),
	multilineComment = false;

// This sections removes empty lines, single line comments, and JSDoc comments from AutoHotkey scripts, but leaves multiline comments alone.
// However, if a single line comment comes after some code on the same line, it's not removed.
// Multiline comments are not removed, as I need them to add a license header.
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
		if (isMultiLine.test(lines[i])) {
			multilineComment = true;
		} else if (shouldRemoveLine.test(lines[i])) {
			lines = [...lines.slice(0, i), ...lines.slice(i+1)];
			i--;
		}
	}
	if (lines[i].includes("*/")) {
		multilineComment = false;
	}
}
file = lines.join(EOL)

writeFileSync(join(cwd(), "..", "dist", `Helldivers 2 Macros.${language}.ahk`), file)