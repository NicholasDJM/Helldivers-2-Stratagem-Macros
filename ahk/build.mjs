import { readFileSync, writeFileSync } from "node:fs"
import {join} from "node:path"
import {cwd} from "node:process";
import {stratagems} from "../help/src/stratagems.js"
const ending = "\r\n" // Change this if compiling on Linux. Although, I don't know why you would be, as this entire repo is dedicated to a tool that only runs on Windows.

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
	html = read("..","help","dist","index.html").replaceAll("`","``") // Must escape backticks.

const output = stratagems.map(item => `${ending}Case "${item.key}":${ending}tStratagem(${JSON.stringify(item.code)})`).join('');


let file = part1 + version + part2 + output + part3 + html + part4;
let lines = file.split(ending);

// This section removes any empty lines, but not inside multiline comments.
let multilineComment = false;
for (let i = 0; i < lines.length; i++) {
	if (!multilineComment) {
		if (lines[i].includes("/*")) {
			multilineComment = true
		} else if (lines[i] === "") {
			lines = [...lines.slice(0, i), ...lines.slice(i+1)]
			i--
		}
	}
	if (lines[i].includes("*/")) {
		multilineComment = false
	}
}
file = lines.join(ending)

writeFileSync(join(cwd(), "..", "Helldivers 2 Macros.ahk"), file)