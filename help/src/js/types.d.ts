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
	| "sentry";
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
	key: string;
	type: StratagemType[];
	code: CodeSequence;
	icon?: string;
	displayName?: string;
}
export type Version = // This is the version number type, which should match Helldivers 2's version number, as seen in game.
	`${"release" | "beta" | "alpha"}/${number}.${number}.${number}/${number}`;
