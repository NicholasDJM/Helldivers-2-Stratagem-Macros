import { readFileSync, writeFileSync } from "node:fs"
import path from "node:path"
import process from "node:process";
import JSON5 from "json5"

const cwd = process.cwd(),
	{stratagems, version: hd2version} = JSON5.parse(readFileSync(path.join(cwd,"..","help","src","stratagems.json5")).toString("utf8")),
	part1 = readFileSync(path.join(cwd,"part1.md")).toString("utf8"),
	part2 = readFileSync(path.join(cwd,"part2.md")).toString("utf8"),
	part3 = readFileSync(path.join(cwd,"part3.md")).toString("utf8"),
	part4 = readFileSync(path.join(cwd,"part4.md")).toString("utf8"),
	exampleCode = readFileSync(path.join(cwd,"..","help","src","example.ahk")).toString("utf8"),
	version = readFileSync(path.join(cwd,"..","version.txt")).toString("utf8")

/**
 * @typedef {import("../help/src/stratagems").Stratagem} Stratagem
 */	

/*** @type {string} */
const output = stratagems.map(/*** @param {Stratagem} item */ item => `
- ${
	item.displayName ?
	item.displayName
	: item.key.split(" ").map(value=>value[0].toUpperCase()+value.slice(1)).join(" ")
}`).join("");

writeFileSync(path.join(cwd, "..", "README.md"),
	`${part1 + version + part2 + version + part3 + exampleCode + part4}\`${hd2version}\`.
${output}`)