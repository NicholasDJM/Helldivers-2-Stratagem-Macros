import { readFileSync, writeFileSync } from "node:fs"
import {join} from "node:path"
import {cwd} from "node:process";
import {stratagems} from "../help/src/stratagems.js"

// Constructs the AutoHotkey script, using dynamic data, including the version number, and the entire list of Stratagems.
// TODO: Can an AutoHotkey script be minified? Other than removing blank lines, currently, there's no system for minifying.

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




const output = stratagems.map(item => `
Case "${item.key}":
	Stratagem(${JSON.stringify(item.code)})
`).join('');

writeFileSync(join(cwd(), "..", "Helldivers 2 Macros.ahk"), part1 + version + part2 + output + part3 + html + part4)