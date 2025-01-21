// This is the typings for a single Stratagem, plus the game version.
// Used in stratagems.js, which is used to generate switch case statements in the AutoHotkey macro script.

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
	| "mines"
	| "light armour penetration"
	| "medium armour penetration"
	| "heavy armour penetration"
	| "anti-tank penetration"
	| "crossover";
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
	key: string; // Primary name, in English, alphanumeric, dashes, and spaces only.
	type: StratagemType[]; // Stratagem types, loosely based on in-game stratagem traits.
	code: CodeSequence; // List of directional inputs.
	icon?: string; // URL path or Base64 image
	displayName?: string; // Correct name to display, in any format and language. However, use HTML code whenever possible, like &quot; instead of "
	modelName?: string; // Example: A/MLS-4X is the model name of the Rocket Sentry. Applies only to Stratagems that have model names (Mostly support weapons and sentries.)
	buildConfig?: {
		// Internal build config only.
		note?: string; // Note to display during build
		action?: "do not generate" | "warn" | "fail"; // What to do during build.
		specialAction?: string; // Execute function during build
		actionData?: unknown;
		/*
			Look at build.ts for functions that can be executed by specialAction, or create your own and add it.
		*/
	};
}
export type Version = // This is the version number type, which should match Helldivers 2's version number, as seen in game.
	`${"release" | "beta" | "alpha"}/${number}.${number}.${number}/${number}`;
// Not entirely sure what the release channel names are other than "release", as there's no public access to any betas.
