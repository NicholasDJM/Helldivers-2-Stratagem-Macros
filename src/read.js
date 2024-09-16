import { readFileSync } from "node:fs";
import { join } from "node:path";
import { cwd } from "node:process";
/**
 * Read file contents. Path is relative to the current working directory.
 * @param {string[]} p
 * @returns {string}
 */
export function read(...p) {
	return readFileSync(join(cwd(),...p)).toString("utf8")
}