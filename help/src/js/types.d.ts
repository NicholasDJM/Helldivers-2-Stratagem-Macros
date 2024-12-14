// This is the typings for a single Stratagem, plus the game version.

// biome-ignore format:
type StratagemType =
	  "weapon"
	| "machine gun"
	| "backpack"
	| "team reload"
	| "laser"
	| "guard dog"
	| "orbital"
	| "eagle"
	| "mission"
	| "emplacement"
	| "defense"
	| "fire"
	| "mech"
	| "vehicle"
	| "sentry"
	| "toxic"
	| "mines";
type Code = "up" | "left" | "right" | "down";
// biome-ignore format:
type CodeSequence = // Stratagem Codes are (currently) only 3 to 8 inputs long.
	  [Code, Code, Code] // 3
	| [Code, Code, Code, Code] // 4
	| [Code, Code, Code, Code, Code] // 5
	| [Code, Code, Code, Code, Code, Code] // 6
	| [Code, Code, Code, Code, Code, Code, Code] // 7
	| [Code, Code, Code, Code, Code, Code, Code, Code] // 8
export interface Stratagem {
	key: string; // Primary name, in English, a-z, 0-9, and dashes only.
	type: StratagemType[]; // Stratagem types, loosely based on in game stratagem traits.
	code: CodeSequence; // List of directional inputs.
	icon?: string; // URL path or Base64 image
	displayName?: string; // Correct name to display, in any format and language. However, use HTML code whenever possible, like &quot; instead of "
	modelName?: string; // Example: A/MLS-4X is the model name of the Rocket Sentry. Applies only to Stratagems that have model names (Mostly support weapons and sentries.)
	special?: {
		// Internal build config only.
		note?: string, // Note to display during build
		action?: "do not generate" | "warn" | "fail", // What to do during build.
		specialAction?: string // Execute function during build
	}
}
export type Version = // This is the version number type, which should match Helldivers 2's version number, as seen in game.
	`${"release" | "beta" | "alpha"}/${number}.${number}.${number}/${number}`;
