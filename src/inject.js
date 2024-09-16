import { existsSync } from "node:fs";
import { join } from "node:path";
import { cwd, env } from "node:process";
import { read } from "./read.js";
//@ts-expect-error
import JSON5 from "https://cdn.jsdelivr.net/npm/json5@2.2.3/dist/index.min.mjs"

const langShort = env.LANG?.split(".")[0].split("-")[0] || "en",
	langLong = env.LANG?.split(".")[0].toLowerCase() || "en-ca";

let locales
if (existsSync(join(cwd(), "locales", `${langLong}.json5`))) {
	locales = read("locales", `${langLong}.json5`)
} else if (existsSync(join(cwd(), "locales", `${langShort}.json5`))) {
	locales = read("locales", `${langShort}.json5`)
} else {
	throw new Error("Cannot find language file for current language.")
}

locales = JSON5.parse(locales);

/**
 * Finds and replaces special `!INJECT()` keywords in the given text.  
 * Example:
 * ```ts
 * 	replaceInjectKeyword("!INJECT("test") World", {test: "Hello"}) // Returns "Hello World"
 * ```
 * @param {string} text - The input text containing !INJECT() keyword.
 * @param {Object<string, *>} vars - The variables to inject.
 * @returns {string} The modified text with inject keywords replaced.
 */
export function replaceInjectKeyword(text, vars, _apostrophe = false) {
	const injectText = _apostrophe ? "!INJECT('" : "!INJECT(\"";
	let limit = text.split(injectText).length - 1;
	let result = text;

	let safeVars = Object.create(null)
	for (let key in vars) {
		if (vars.hasOwnProperty(key)) {
			safeVars[key] = vars[key]
		}
	}
	
	while (limit > 0) {
		const start = result.indexOf(injectText);
		if (start === -1) break;
		
		const end = result.indexOf(_apostrophe ? "')" : "\")", start);
		if (end === -1) break;
		
		const key = result.slice(start + injectText.length, end);
		let value = "";
		
		const multi = key.split(".");
		if (safeVars[multi[0]] !== undefined) {
			if (multi.length > 1) {
				let current = safeVars[multi[0]];
				for (let i = 1; i < multi.length; i++) {
					if (current[multi[i]] !== undefined) {
						current = current[multi[i]];
					}
				}
				value = current;
			} else {
				value = safeVars[key];
			}
		}
		
		result = result.slice(0, start) + value + result.slice(end + 2);

		limit--;
	}

	if (!_apostrophe && result === text) {
		// Try again with apostrophes.
		result = replaceInjectKeyword(text, vars, true)
	}
	
	return result;
}

/**
 * Finds and replaces special `!INCLUDE()` keywords in the given text.  
 * Example:
 * ```ahk
 * ; foo.ahk
 * foo() {
 * return "bar"
 * }
 * ```
 * ```ahk
 * 	!INCLUDE("foo.ahk")
 * ```
 * @param {string} text - The input text containing !INCLUDE() keyword.
 * @returns {string} The modified text with include keywords replaced.
 */
export function includeFile(text, _apostrophe=false) {
	const injectText = _apostrophe ? "!INCLUDE('" : "!INCLUDE(\"";
	let limit = text.split(injectText).length - 1;
	let result = text;
	
	while (limit > 0) {
		const start = result.indexOf(injectText);
		if (start === -1) break;
		
		const end = result.indexOf(_apostrophe ? "')" : "\")", start);
		if (end === -1) break;
		
		const filename = result.slice(start + injectText.length, end);

		const file = read(...filename.split("/"))
		
		result = result.slice(0, start) + file + result.slice(end + 2);

		limit--;
	}

	if (!_apostrophe && result === text) {
		// Try again with apostrophes.
		result = includeFile(text, true)
	}
	
	return result;
}

/**
 * TODO
 * 
 * Example:
 * ```ts
 * 	
 * ```
 * @param {string} text - The input text containing !LOCALE() keyword.
 * @returns {string} The modified text with locale keywords replaced.
 */
export function replaceLocaleKeyword(text, _apostrophe = false) {
	const injectText = _apostrophe ? "!LOCALE('" : "!LOCALE(\"";
	let limit = text.split(injectText).length - 1;
	let result = text;
	while (limit > 0) {
		const start = result.indexOf(injectText);
		if (start === -1) break;
		
		const end = result.indexOf(_apostrophe ? "')" : "\")", start);
		if (end === -1) break;
		
		const key = result.slice(start + injectText.length, end);
		
		result = result.slice(0, start) + locales[key] + result.slice(end + 2);

		limit--;
	}

	if (!_apostrophe && result === text) {
		// Try again with apostrophes.
		result = replaceLocaleKeyword(text, true)
	}
	
	return result;
}