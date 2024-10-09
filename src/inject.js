import { existsSync } from "node:fs";
import { join } from "node:path";
import { cwd } from "node:process";
import { read } from "./read.mjs";
//@ts-expect-error TypeScript can't get typings from Internet based modules.
import JSON5 from "https://cdn.jsdelivr.net/npm/json5@2.2.3/dist/index.min.mjs"
import { langShort, langLong } from "./lang.mjs";
import { writeFileSync } from "node:fs";


// Some of the code below was generated with Bito AI and/or Bing Copilot.
// It would have taken me a few hours to rewrite this code to my liking, so thanks!

let locales
if (existsSync(join(cwd(), "locales", `${langLong}.json5`))) {
	locales = read("locales", `${langLong}.json5`)
} else if (existsSync(join(cwd(), "locales", `${langShort}.json5`))) {
	locales = read("locales", `${langShort}.json5`)
} else {
	const e = `Cannot find language file for current language. [${langLong}]`;
	throw new Error(e)
}

locales = JSON5.parse(locales);

/**
 * Finds and replaces special `!INJECT()` keywords in the given text.  
 * Example:
 * ```ts
 * 	replaceInjectKeyword("!INJECT('test') World", {test: "Hello"}) // Returns "Hello World"
 * ```
 * @param {string} text - The input text containing !INJECT() keyword.
 * @param {Object<string, *>} vars - The variables to inject.
 * @returns {string} The modified text with inject keywords replaced.
 */
export function replaceInjectKeyword(text, vars) {
	const injectTextSingle = "!INJECT('";
	const injectTextDouble = '!INJECT("';
	let result = text;
	let safeVars = Object.create(null);

	// Create a safe copy of vars
	for (let key in vars) {
		if (vars.hasOwnProperty(key)) {
			safeVars[key] = structuredClone(vars[key]);
		}
	}

	/**
	 * Function to replace keywords based on the injectText and quote style
	 * @param {string} injectText 
	 * @param {string} quoteChar 
	 */
	const replaceKeywords = (injectText, quoteChar) => {
		let limit = result.split(injectText).length - 1;
		while (limit > 0) {
			const start = result.indexOf(injectText);
			if (start === -1) break;

			const end = result.indexOf(quoteChar, start + injectText.length);
			if (end === -1) break;

			const key = result.slice(start + injectText.length, end);
			let value = "";

			// Handle nested keys
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
	};

	// First, try replacing with double quotes
	replaceKeywords(injectTextDouble, '"');
	
	// Then, try replacing with single quotes
	replaceKeywords(injectTextSingle, "'");

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
export function includeFile(text) {
	const injectTextSingle = "!INCLUDE('";
	const injectTextDouble = '!INCLUDE("';
	let result = text;

	/**
	 * Function to replace keywords based on the injectText and quote style
	 * @param {string} injectText 
	 * @param {string} quoteChar 
	 */
	const replaceKeywords = (injectText, quoteChar) => {
		let limit = result.split(injectText).length - 1;
		while (limit > 0) {
			const start = result.indexOf(injectText);
			if (start === -1) break;

			const end = result.indexOf(quoteChar+")", start + injectText.length);
			if (end === -1) break;

			const filename = result.slice(start + injectText.length, end);
			const file = read(...filename.split("/")); // Assuming read is defined elsewhere
			result = result.slice(0, start) + file + result.slice(end + 2);
			limit--;
		}
	};

	// First, try replacing with double quotes
	replaceKeywords(injectTextDouble, '"');

	// Then, try replacing with single quotes
	replaceKeywords(injectTextSingle, "'");

	return result;
}

/**
 * Finds and replaces special `!LOCALE()` keywords in the given text.  
 * @param {string} text - The input text containing !LOCALE() keyword.
 * @returns {string} The modified text with locale keywords replaced.
 */
export function replaceLocaleKeyword(text) {
	const injectTextSingle = "!LOCALE('";
	const injectTextDouble = '!LOCALE("';
	let result = text;

	/**
	 * Function to replace keywords based on the injectText and quote style
	 * @param {string} injectText 
	 * @param {string} quoteChar 
	 */
	const replaceKeywords = (injectText, quoteChar) => {
		let limit = result.split(injectText).length - 1;
		while (limit > 0) {
			const start = result.indexOf(injectText);
			if (start === -1) break;

			const end = result.indexOf(quoteChar+")", start + injectText.length);
			if (end === -1) break;

			const key = result.slice(start + injectText.length, end);
			result = result.slice(0, start) + locales[key] + result.slice(end + 2);
			limit--;
		}
	};

	// First, try replacing with double quotes
	replaceKeywords(injectTextDouble, '"');

	// Then, try replacing with single quotes
	replaceKeywords(injectTextSingle, "'");

	return result;
}



// TODO: Having to manually setup parsing is becoming a chore. I should use something like globby to scan a entire directory. The "_template" suffix could be used to automatically create output files, sans suffix.
/**
 * Automatically reads a template file and writes the output to a file, using {@link replaceInjectKeyword()}, {@link replaceLocaleKeyword()}, and {@link includeFile()} functions, in that order.  
 * 
 * If you need to modify the output, use {@link parseReturn()} instead.
 * @param {string} fileInput
 * @param {string} fileOutput 
 * @param {Record<string,string>} vars 
 */
export function parse(fileInput, fileOutput, vars) {
	if (fileInput === fileOutput) throw new Error("Input cannot be the same as the output.");
	writeFileSync(fileOutput, includeFile(replaceLocaleKeyword(replaceInjectKeyword(read(fileInput), vars))));
}

/**
 * Automatically reads and returns output, using {@link replaceInjectKeyword()}, {@link replaceLocaleKeyword()}, and {@link includeFile()} functions, in that order.  
 * 
 * If you want to write to a file immediately, use {@link parse()} instead.
 * @param {string} fileInput 
 * @param {Record<string,string>} vars 
 * @returns {string}
 */
export function parseReturn(fileInput, vars) {
	return includeFile(replaceLocaleKeyword(replaceInjectKeyword(read(fileInput), vars)))
}