/*
	Add `#Include "dummy.ahk" ;!REMOVE()` at the top of your script to get typings.
	These are dummy functions, and do not hold any logic. They are replaced at build time.
	Make sure to prefix the keywords with a exclamation mark.
	These functions are here to prevent your IDE from complaining that they are undefined.
	They are replaced with the results of the specificed parameters at build time.
	Check inject.js for actual logic.
*/
/**
 * Inject variables into script at build time.  
 * Remember to update your build system and add any desired variables.
 * Remember to prefix the function with an exclamation mark.  
 * Example:
 * ```ahk
 * 	version := !INJECT("version")
 * ```
 * @param {string} name - The name of the variable.
 * @returns {string} The variable's value
 */
INJECT(name) {
	; Dummy function. Look into inject.js for actual logic.
}
/**
 * Removes the line of text this function is on at build time.
 * Remember to prefix the function with an exclamation mark.  
 */
REMOVE() {
	; Dummy function. Look into inject.js for actual logic.
}
/**
 * Inlines a file at build time. If you just need to import a file, use AutoHotkey's native #Include directive.  
 * Remember to prefix the function with an exclamation mark.  
 * Example:  
 * > `Foo.ahk`:
 * > ```ahk
 * > 	foo() {
 * > 		return "bar"
 * > 	}
 * > ```
 * > `Main.ahk`:
 * > ```ahk
 * > 	!INCLUDE("foo.ahk")
 * > 	foo()
 * > ```
 * > Result:
 * > ```ahk
 * > 	foo() {
 * > 		return "bar"
 * > 	}
 * > 	foo()
 * > ```
 * @param {string} filename - The name of the file you want to inline.
 * @returns {string} The file's contents.
 */
INCLUDE(filename) {
	; Dummy function. Look into inject.js for actual logic.
}
/**
 * Get localized text. Create a json5 file in ./locales  
 * Remember to prefix the function with an exclamation mark.  
 * @param {String} key
 */
LOCALE(key) {
	; Dummy function. Look into inject.js for actual logic.
}