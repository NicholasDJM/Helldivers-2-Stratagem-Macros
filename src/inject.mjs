import { existsSync } from "node:fs";
import { join } from "node:path";
import { cwd } from "node:process";
import { read } from "./read.mjs";
import { langShort, langLong } from "./lang.mjs";
import { writeFileSync } from "node:fs";
import { globbySync } from "npm:globby";
import { mkdirSync } from "node:fs";


// Some of the code below was generated with Bito AI and/or Bing Copilot and/or Claude 3.5 sonnet via Cursor IDE.
// It would have taken me a few hours to rewrite this code to my liking, so thanks!

/** @type {Record<string, string>} */
let locales = {};

const initLocales = () => {
	if (existsSync(join(cwd(), "locales", `${langLong}.mjs`))) {
		return import(`./locales/${langLong}.mjs`).then(module => {
			locales = module.default;
			console.log(locales);
		}).catch(error => {
			console.error(`Failed to load locales for ${langLong}:`, error);
			throw error;
		});
	} else if (existsSync(join(cwd(), "locales", `${langShort}.mjs`))) {
		return import(`./locales/${langShort}.mjs`).then(module => {
			locales = module.default;
			console.log(locales);
		}).catch(error => {
			console.error(`Failed to load locales for ${langShort}:`, error);
			throw error;
		});
	} else {
		const e = `Cannot find language file for current language. [${langLong}]`;
		throw new Error(e);
	}
};

// Initialize locales and export a promise that resolves when ready
export const localesReady = initLocales();

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
	if (!locales || Object.keys(locales).length === 0) {
		throw new Error('Locales not yet loaded. Please wait for localesReady promise to resolve.');
	}

	const injectTextSingle = "!LOCALE('";
	const injectTextDouble = '!LOCALE("';
	let result = text;

    // Define language-specific concatenation patterns
    const langPatterns = {
        'ahk': {
            before: ' . ',
            after: ' . '
        },
        'js': {
            before: ' + ',
            after: ' + '
        }
        // Add more languages as needed
    };

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

            const end = result.indexOf(quoteChar + ")", start + injectText.length);
            if (end === -1) break;

            // Parse the arguments: key, language, and substitutions object
            const argsString = result.slice(start + injectText.length, end);
            const args = argsString.split(',').map(arg => arg.trim());
            const key = args[0].replace(/["']/g, '');
            const lang = args[1]?.replace(/["']/g, '') || 'js'; // Default to JavaScript
            const substitutions = args[2] ? JSON5.parse(args[2]) : {};

            // Get the locale string and pattern for the specified language
            let localeString = locales[key];
            const pattern = langPatterns[lang] || langPatterns.js;

            // Replace placeholders with variables using language-specific concatenation
            if (substitutions) {
                for (const [placeholder, value] of Object.entries(substitutions)) {
                    const regex = new RegExp(`{{${placeholder}}}`, 'g');
                    localeString = localeString.replace(regex, `${pattern.before}${value}${pattern.after}`);
                }
            }

            // Remove leading/trailing concatenation operators and wrap in quotes
            const operatorPattern = new RegExp(`^[\\s${pattern.before}${pattern.after}]*|[\\s${pattern.before}${pattern.after}]*$`, 'g');
            localeString = `${quoteChar}${localeString.replace(operatorPattern, '')}${quoteChar}`;

            result = result.slice(0, start) + localeString + result.slice(end + 2);
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

/**
 * Automatically reads a directory of template files and writes the output to a new directory, using {@link parse()}. 
 * Ensure files are named with the "_template" suffix.
 * @param {string} directory 
 * @param {Record<string,string>} vars 
 * @param {string?} newDirectory 
 */
export function autoParse(directory, vars, newDirectory = "") {
	if (newDirectory !== "" && !existsSync(newDirectory)) {
		mkdirSync(newDirectory, { recursive: true });
	}
	const files = globbySync(join(directory, "**/*.*"), {
		absolute: true
	});
	for (const file of files) {
		if (file.endsWith("_template.ahk")) {
			parse(file, newDirectory + file.replace("_template", ""), vars);
		}
	}
}

/**
 * Automatically reads a directory of template files and returns an object of the output, using {@link parseReturn()}. 
 * Ensure files are named with the "_template" suffix.
 * @param {string} directory 
 * @param {Record<string,string>} vars 
 * @param {string?} newDirectory 
 * @returns {Record<string,string>}
 */
export function autoParseReturn(directory, vars, newDirectory = "") {
	if (newDirectory !== "" && !existsSync(newDirectory)) {
		mkdirSync(newDirectory, { recursive: true });
	}
	const files = globbySync(join(directory, "**/*.*"), {
		absolute: true
	});
	let result = {};
	for (const file of files) {
		if (file.endsWith("_template.ahk")) {
			result[file] = parseReturn(file, newDirectory + file.replace("_template", ""), vars);
		}
	}
	return result;
}