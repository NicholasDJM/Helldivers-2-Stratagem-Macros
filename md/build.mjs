import { readFileSync, writeFileSync } from "node:fs"
import {join} from "node:path"
import {cwd} from "node:process";
import {stratagems, version as hd2version} from "../help/src/stratagems.js"

// Constructs README.md with dynamic data, such as the script version number, and example code.
// Since the dynamic data is used elsewhere, having to manually update in the README is just wasted time.

/**
 * Read file contents. Path is relative to the current working directory.
 * @param {string[]} p 
 * @returns {string}
 */
function read(...p) {
	return readFileSync(join(cwd(),...p)).toString("utf8")
}

const part1 = read("part1.md"),
	part2 = read("part2.md"),
	part3 = read("part3.md"),
	part4 = read("part4.md"),
	exampleCode = read("..","help","src","example.ahk"),
	version = read("..","version.txt")



const output = stratagems.map(item => `\n- ${item.displayName ?? item.key.split(" ").map(value=>value[0].toUpperCase()+value.slice(1)).join(" ")}`).join("");

writeFileSync(join(cwd(), "..", "README.md"),`${part1 + version + part2 + version + part3 + exampleCode + part4}\`${hd2version}\`.\n${output}`)