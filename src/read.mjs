import { readFileSync } from "node:fs";
import { join } from "node:path";
import { cwd } from "node:process";
/**
 * Read file contents. Path is relative to the current working directory.
 * @param {string[]} p
 * @returns {string}
 */
export function read(...p) {
	if (p[0] === undefined) throw new Error("Must provide a valid path.")
	let path = p
	path = path.filter(value=>value.length)
	if (path.length === 0) throw new Error("Must provide a valid path.");
	return readFileSync(join(cwd(),...path)).toString("utf8")
}