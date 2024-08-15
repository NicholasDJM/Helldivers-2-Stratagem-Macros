import { readFileSync, writeFileSync } from "node:fs"
import path from "node:path"
import process from "node:process";
import JSON5 from "json5"

const cwd = process.cwd(),
	{stratagems, hd2version} = JSON5.parse(readFileSync(path.join(cwd,"..","help","src","stratagems.json5")).toString("utf8")),
	part1 = readFileSync(path.join(cwd,"part1.ahk")).toString("utf8"),
	part2 = readFileSync(path.join(cwd,"part2.ahk")).toString("utf8"),
	part3 = readFileSync(path.join(cwd,"part3.ahk")).toString("utf8"),
	part4 = readFileSync(path.join(cwd,"part4.ahk")).toString("utf8"),
	version = readFileSync(path.join(cwd,"..","version.txt")).toString("utf8"),
	html = readFileSync(path.join(cwd,"..","help","dist","index.html")).toString("utf8").replaceAll("`", "``") // Must escape backticks.

/**
 * @typedef {import("../help/src/stratagems").Stratagem} Stratagem
 */	

/*** @type {string} */
const output = stratagems.map(/*** @param {Stratagem} item */ item => `
Case "${item.key}":
	Stratagem(${JSON.stringify(item.code)})
`).join('');

writeFileSync(path.join(cwd, "..", "Helldivers 2 Macros.ahk"), part1 + version + part2 + output + part3 + html + part4)