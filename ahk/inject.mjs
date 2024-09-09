/**
 * Finds and replaces special `!INJECT()` keywords in the given text.  
 * Example:
 * ```ts
 * 	findInjectAndReplace("!INJECT(test) World", {test: "Hello"}) // Returns "Hello World"
 * ```
 * **DO NOT EXECUTE WITH USER DATA** This function makes no attempts to sanitize inputs.  
 * This functions makes use of `variable[userinput]` syntax, which can escape expected scope.
 * @param {string} text - The input text containing !INJECT() keyword.
 * @param {Object<string, *>} vars - The variables to inject.
 * @returns {string} The modified text with inject keywords replaced.
 */
export function replaceInjectKeyword(text, vars) {
	const injectText = "!INJECT(";
	let limit = text.split(injectText).length - 1;
	let result = text;
	
	while (limit > 0) {
		let start = result.indexOf(injectText);
		if (start === -1) break;
		
		let end = result.indexOf(")", start);
		if (end === -1) break;
		
		let key = result.slice(start + injectText.length, end);
		let value = vars[key] !== undefined ? vars[key] : "";
		
		result = result.slice(0, start) + value + result.slice(end + 1);

		limit--;
	}
	
	return result;
}