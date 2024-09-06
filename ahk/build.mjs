import { readFileSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import { cwd } from "node:process";
import { stratagems } from "../help/src/js/stratagems.js"
import { EOL as ending } from "node:os";

// Constructs the AutoHotkey script, using dynamic data, including the version number, and the entire list of Stratagems.

/**
 * Read file contents. Path is relative to the current working directory.
 * @param {string[]} p
 * @returns {string}
 */
function read(...p) {
	return readFileSync(join(cwd(),...p)).toString("utf8")
}

const part1 = read("part1.ahk"),
	part2 = read("part2.ahk"),
	part3 = read("part3.ahk"),
	part4 = read("part4.ahk"),
	version = read("..","version.txt"),
	html = read("..","help","dist","index.html").replaceAll("`","``"), // Must escape backticks.
	formatedStratagems = stratagems.map(item => 
		`${ending
		}Case "${item.key.toLowerCase().replace("-", " ")}":${ending
		}\tStratagem(${JSON.stringify(item.code)})`)
		.join('');

for (const line of html.split(ending)) {
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

let file = part1 + version + part2 + formatedStratagems + part3 + html + part4,
	lines = file.split(ending),
	multilineComment = false;

// This sections removes empty lines and single line comments, but leaves multiline comments alone.
// Does not remove comments on the same line as code.
for (let i = 0; i < lines.length; i++) {
	if (!multilineComment) {
		if (lines[i].includes("/*")) {
			multilineComment = true;
		} else if (/^(\s*;.*|\s*)$/.test(lines[i])) {
			lines = [...lines.slice(0, i), ...lines.slice(i+1)];
			i--;
		}
	}
	if (lines[i].includes("*/")) {
		multilineComment = false;
	}
}
file = lines.join(ending)

writeFileSync(join(cwd(), "..", "Helldivers 2 Macros.ahk"), file)