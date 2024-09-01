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
	formatedStratagems = stratagems.map(item => `${ending}Case "${item.key.toLowerCase().replace("-", " ")}":${ending}\tStratagem(${JSON.stringify(item.code)})`).join('');

let file = part1 + version + part2 + formatedStratagems + part3 + html + part4,
	lines = file.split(ending),
	multilineComment = false;

// This section removes any empty lines, but not inside multiline comments,
// and single line comments, but not if it comes after some code.
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