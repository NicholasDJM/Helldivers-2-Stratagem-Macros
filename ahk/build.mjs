import { readFileSync, writeFileSync } from "node:fs"
import path from "node:path"
import process from "node:process";
import {stratagems} from "../help/src/stratagems.js"

// Constructs the AutoHotkey script, using dynamic data, including the version number, and the entire list of Stratagems.
// TODO: Can an AutoHotkey script be minified? Other than removing blank lines, currently, there's no system for minifying.


const cwd = process.cwd(),
	part1 = readFileSync(path.join(cwd,"part1.ahk")).toString("utf8"),
	part2 = readFileSync(path.join(cwd,"part2.ahk")).toString("utf8"),
	part3 = readFileSync(path.join(cwd,"part3.ahk")).toString("utf8"),
	part4 = readFileSync(path.join(cwd,"part4.ahk")).toString("utf8"),
	version = readFileSync(path.join(cwd,"..","version.txt")).toString("utf8"),
	html = readFileSync(path.join(cwd,"..","help","dist","index.html")).toString("utf8").replaceAll("`", "``") // Must escape backticks.




const output = stratagems.map(item => `
Case "${item.key}":
	Stratagem(${JSON.stringify(item.code)})
`).join('');

writeFileSync(path.join(cwd, "..", "Helldivers 2 Macros.ahk"), part1 + version + part2 + output + part3 + html + part4)