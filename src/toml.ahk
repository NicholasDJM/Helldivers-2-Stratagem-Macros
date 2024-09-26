/*
    Parses and extracts data from a TOML (Tom's Obvious, Minimal Language) file. Written entirely in AutoHotkey v2.
    Copyright (C) 2024  Nicholas Miller

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU Affero General Public License as published
    by the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Affero General Public License for more details.

    You should have received a copy of the GNU Affero General Public License
    along with this program.  If not, see <https://www.gnu.org/licenses/>.
*/


/**
 * Extract a number value from a TOML file.
 * Use only if you need to directly read a value. You should use tomlParse().
 * @param {String} line Line of text to search in.
 * @param {String} key Key to search for.
 * @returns {Number}
*/
tomlReadNumber(line, key) {
	if (RegExMatch(line, "^\s*" . key . "\s*=\s*\d+\s*(#.*)?$")) {
		return RegExReplace(RegExReplace(line, "^\s*" . key . "\s*=\s*", ""), "\s*(#.*)?$")
	}
}
/**
 * Extract a string value from a TOML file.
 * Use only if you need to directly read a value. You should use tomlParse().
 * @param {String} line Line of text to search in.
 * @param {String} key Key to search for.
 * @returns {String}
*/
tomlReadString(line, key) {
	if (RegExMatch(line, "^\s*" . key . "\s*=\s*(`".*`"|'.*')\s*(#.*)?$")) {
		return RegExReplace(
				RegExReplace(
					RegExReplace(
						line,
						"\s*" . key . "\s*=\s*"
					),
					"^[`"']"
				),
				"[`"']\s*(#.*)?$"
			)
	}
}
/**
 * Extract a Windows path value from a TOML file.
 * Use only if you need to directly read a value. You should use tomlParse().
 * @param {String} line Line of text to search in.
 * @param {String} key Key to search for.
 * @returns {String}
*/
tomlReadPath(line, key) {
	if (RegExMatch(line, "^\s*" . key . "\s*=\s*(`"[a-zA-Z]:\\.+`"|'[a-zA-Z]:\\.+')\s*(#.*)?$")) {
		return RegExReplace(
				RegExReplace(
					RegExReplace(
						line,
						"\s*" . key . "\s*=\s*"
					),
					"^[`"']"
				),
				"[`"']\s*(#.*)?$"
			)
	}
}
/**
 * Extract a boolean value from a TOML file.
 * Use only if you need to directly read a value. You should use tomlParse().
 * @param {String} line Line of text to search in.
 * @param {String} key Key to search for.
 * @returns {Number}
*/
tomlReadBoolean(line, key) {
	if (RegExMatch(line, "^\s*" . key . "\s*=\s*\d+\s*(#.*)?$")) {
		return RegExReplace(RegExReplace(line, "^\s*" . key . "\s*=\s*", ""), "\s*#.*$") = "true" ? true : false
	}
}
; REMOVE_START()

; These regexes should match the majority of content in TOML files.
; These only capture the key-values, etc. It does not discern the syntax, which needs to be parsed to correctly get the data.
tomlCommentRegex := "\s*(?:#.*)?" ; TOML Comment regex
tomlKeyValueRegex := "^\s*(\w+)\s*=\s*(.+)\s*" . tomlCommentRegex . "$" ; TOML Key/Value regex
tomlObjectHeaderRegex := "^\s*\[(.+)\]\s*" . tomlCommentRegex . "$" ; TOML Name of object entry regex
tomlArrayHeaderRegex := "^\s*\[\[(.+)\]\]\s*" . tomlCommentRegex . "$" ; TOML Name of array entry regex
tomlArrayRegex := "\[\s*(.*)(?:\s*,\s*(.*))*\s*\]"
tomlObjectRegex := "\{\s*(?:(\w+)\s*=\s*(.*))(?:\s*,\s*(\w+)\s*=\s*(.*))*\s*\}"
tomlMultiLineStringRegex := 's)^\s*(\w+)\s*=\s*(?:"""|`'`'`')([^\S\s])(?:"""|`'`'`')' . tomlCommentRegex . '$' ; TOML Multiline string

/**
 * 
 * @param {String} file 
 * @returns {Map}
 */
tomlParse(file) {
	data := Map()
	if (FileExist(file)) {
		state := "root"
		Loop Read file {
			match := []
			if (RegExMatch(A_LoopReadLine, tomlObjectHeaderRegex, &match)) {
				; TODO: Move logic to function
				state := "object"
				construct := Map()
				Loop Parse match[1], "." {
					construct[A_LoopField]
				}
			}
		}
	}
	return data
}

/**
 * Turns an AutoHotkey object into a valid TOML file string, ready to be written to disk.
 * @param {Map | VarRef<Map> | Object | VarRef<Object>} data 
 * @returns {String}
 */
tomlStringify(data) {

}

/**
 * Merge two objects together. Top layer overwrites bottom layer.  
 * If passing a string, it must be valid TOML file contents.  
 * @function tomlMerge
 * @param {String | Map | VarRef<Object> | Object | VarRef<Map>} topLayer 
 * @param {String | Map | VarRef<Object> | Object | VarRef<Map>} bottomLayer 
 * @returns {Map}
 */
tomlMerge(topLayer, bottomLayer) {
	; TODO
}
;REMOVE_END()