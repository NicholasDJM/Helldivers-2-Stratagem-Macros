// This file is used to generate config options. (CLI flags, config file)
// Types: "number", "boolean", "path", or "string"

/**
 * @typedef {Object} Data
 * @property {string} name - The name of the data.
 * @property {"number"|"path"|"string"|"boolean"} type - The type of the data.
 * @property {string|number|boolean} defaultData - The default data value.
 * @property {string} description - A description of the data.
 */
/**
 * @type {Data[]}
 */
export const optionsData = [
	{
		name: "delay",
		type: "number",
		defaultData: 150,
		description: "Delay between keys"
	},
	{
		name: "holdDelay",
		type: "number",
		defaultData: 10,
		description: "How long to hold a key"
	},
	{
		name: "steamPath",
		type: "path",
		defaultData: "C:\\Program Files (x86)\\Steam",
		description: "Path to your Steam installation (NOT your Steam library)"
	},
	{
		name: "updates",
		type: "boolean",
		defaultData: true,
		description: "Check for updates"
	},
	{
		name: "wait",
		type: "number",
		defaultData: 0,
		description: "Delay before sending the keystrokes"
	},
	{
		name: "language",
		type: "string",
		defaultData: "en-CA",
		description: "Preferred language"
	}
]
