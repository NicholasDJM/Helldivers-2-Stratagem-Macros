const w = "https://helldivers.wiki.gg/images";

/** @typedef {import ("./types.d.ts").Stratagem} Stratagem */
/** @typedef {import ("./types.d.ts").Version} Version */

/**
 * Game version that the Stratagem list is aligned with.
 * Format as `channel/version/build`
 * This can be out of date. When updating the list of Stratagems, also update this variable to the latest game version.
 * @type {Version}
 */
export const version = "release/01.002.001/13887",
	/**
	 * Complete list of all Stratagems currently available in Helldivers 2 (Last updated December 2024).
	 * Each one has a `code` property, a series of directional inputs, which is used to generate Case statements in the AutoHotkey script.
	 * Some will have a display name, which should be used instead of the key. The display name is always used in other languages.
	 * The Model Name is usable in all langages as a replacement for the key.
	 * ```ts
	 * interface Stratagem {
	 * 	key: string,
	 * 	type: string[],
	 * 	icon?: string,
	 * 	code: string[],
	 * 	displayName?: string,
	 * 	modelName: string
	 * }
	 * ```
	 * @type {Stratagem[]}
	 */
	stratagems = [
		// -------------------------------------------------------------------
		// Weapons
		// -------------------------------------------------------------------
		{
			key: "Machine Gun",
			type: ["weapon", "machine gun"],
			icon: w + "/e/e0/Machine_Gun_Stratagem_Icon.png",
			modelName: "MG-43",
			code: ["down", "left", "down", "up", "right"],
		},
		{
			key: "Anti-Material Rifle",
			type: ["weapon"],
			icon: w + "/3/3c/Anti-Materiel_Rifle_Stratagem_Icon.png",
			modelName: "APW-1",
			code: ["down", "left", "right", "up", "down"],
		},
		{
			key: "Stalwart",
			type: ["weapon", "machine gun"],
			icon: w + "/4/46/Stalwart_Stratagem_Icon.png",
			modelName: "M-105",
			code: ["down", "left", "down", "up", "up", "left"],
		},
		{
			key: "Expendable Anti-Tank",
			type: ["weapon"],
			icon: w + "/1/1c/Expendable_Anti-Tank_Stratagem_Icon.png",
			modelName: "EAT-17",
			code: ["down", "down", "left", "up", "right"],
		},
		{
			key: "Recoilless Rifle",
			type: ["weapon", "backpack", "team reload"],
			icon: w + "/7/70/Recoilless_Rifle_Stratagem_Icon.png",
			modelName: "GR-8",
			code: ["down", "left", "right", "right", "left"],
			buildConfig: {
				note: 'Recoilless Rifle can sometimes be misspelled as "Recoiless Rifle", so instead of failing, it will be accepted.',
				specialAction: "extra", // Extra enables additional matches to be made.
				actionData: ["recoiless rifle"], // SIC, yes, that's the correct spelling.
			},
		},
		{
			key: "Flamethrower",
			type: ["weapon"],
			icon: w + "/7/75/Flamethrower_Stratagem_Icon.png",
			modelName: "FLAM-40",
			code: ["down", "left", "up", "down", "up"],
		},
		{
			key: "Autocannon",
			type: ["weapon", "backpack", "team reload"],
			icon: w + "/e/ef/Autocannon_Stratagem_Icon.png",
			modelName: "AC-8",
			code: ["down", "left", "down", "up", "up", "right"],
		},
		{
			key: "Heavy Machine Gun",
			type: ["weapon", "machine gun"],
			icon: w + "/d/d9/Heavy_Machine_Gun_Stratagem_Icon.png",
			modelName: "MG-206",
			code: ["down", "left", "up", "down", "down"],
		},
		{
			key: "Airburst Rocket Launcher",
			type: ["weapon", "backpack", "team reload"],
			icon: w + "/a/ad/RL-77_Airburst_Rocket_Launcher_Stratagem_Icon.png",
			modelName: "RL-77",
			code: ["down", "up", "up", "left", "right"],
		},
		{
			key: "Commando",
			type: ["weapon"],
			icon: w + "/7/78/Commando_Stratagem_Icon.png",
			modelName: "MLS-4X",
			code: ["down", "left", "up", "down", "right"],
		},
		{
			key: "Railgun",
			type: ["weapon"],
			icon: w + "/3/35/Railgun_Stratagem_Icon.png",
			modelName: "RS-422",
			code: ["down", "right", "down", "up", "left", "right"],
		},
		{
			key: "Spear",
			type: ["weapon", "backpack", "team reload"],
			icon: w + "/5/54/Spear_Stratagem_Icon.png",
			modelName: "FAF-14",
			code: ["down", "down", "up", "down", "down"],
		},
		{
			key: "Grenade Launcher",
			type: ["weapon"],
			icon: w + "/c/cf/Grenade_Launcher_Stratagem_Icon.png",
			modelName: "GL-22",
			code: ["down", "left", "up", "left", "down"],
		},
		{
			key: "Laser Cannon",
			type: ["weapon", "laser"],
			icon: w + "/c/c3/Laser_Cannon_Stratagem_Icon.png",
			modelName: "LAS-98",
			code: ["down", "left", "down", "up", "left"],
		},
		{
			key: "Arc Thrower",
			type: ["weapon"],
			icon: w + "/1/10/Arc_Thrower_Stratagem_Icon.png",
			modelName: "ARC-3",
			code: ["down", "left", "down", "up", "left", "left"],
		},
		{
			key: "Quasar Cannon",
			type: ["weapon"],
			icon: w + "/8/87/Quasar_Cannon_Stratagem_Icon.png",
			modelName: "LAS-99",
			code: ["down", "down", "up", "left", "right"],
		},
		{
			key: "Sterilizer",
			type: ["weapon"],
			icon: w + "/2/29/Sterilizer_Stratagem_Icon.png",
			modelName: "TX-41",
			code: ["down", "left", "up", "down", "left"],
		},
		{
			// Killzone crossover weapon!
			key: "WASP Launcher",
			type: ["weapon", "crossover"],
			modelName: "StA-X3",
			icon: w + "/a/af/StA-X3_W.A.S.P._Launcher_Stratagem_Icon.png",
			code: ["down", "down", "up", "down", "right"],
			displayName: "W.A.S.P Launcher",
		},
		// -------------------------------------------------------------------
		// Orbitals
		// -------------------------------------------------------------------
		{
			key: "Orbital Gatling Barrage",
			type: ["orbital"],
			icon: w + "/f/f6/Orbital_Gatling_Barrage_Stratagem_Icon.png",
			code: ["right", "down", "left", "up", "up"],
		},
		{
			key: "Orbital Airburst Strike",
			type: ["orbital"],
			icon: w + "/2/28/Orbital_Airburst_Strike_Stratagem_Icon.png",
			code: ["right", "right", "right"],
		},
		{
			key: "Orbital 120mm HE Barrage",
			type: ["orbital"],
			icon: w + "/4/40/Orbital_120mm_HE_Barrage_Stratagem_Icon.png",
			code: ["right", "right", "down", "left", "right", "down"],
		},
		{
			key: "Orbital 380mm HE Barrage",
			type: ["orbital"],
			icon: w + "/1/12/Orbital_380mm_HE_Barrage_Stratagem_Icon.png",
			code: ["right", "down", "up", "up", "left", "down", "down"],
		},
		{
			key: "Orbital Walking Barrage",
			type: ["orbital"],
			icon: w + "/5/53/Orbital_Walking_Barrage_Stratagem_Icon.png",
			code: ["right", "down", "right", "down", "right", "down"],
		},
		{
			key: "Orbital Laser",
			type: ["orbital", "laser"],
			icon: w + "/d/d8/Orbital_Laser_Stratagem_Icon.png",
			code: ["right", "down", "up", "right", "down"],
		},
		{
			key: "Orbital Railcannon Strike",
			type: ["orbital"],
			icon: w + "/6/6f/Orbital_Railcannon_Strike_Stratagem_Icon.png",
			code: ["right", "up", "down", "down", "right"],
		},
		{
			key: "Orbital Precision Strike",
			type: ["orbital"],
			icon: w + "/2/2a/Orbital_Precision_Strike_Stratagem_Icon.png",
			code: ["right", "right", "down"],
		},
		{
			key: "Orbital Gas Strike",
			type: ["orbital", "toxic"],
			icon: w + "/c/cd/Orbital_Gas_Strike_Stratagem_Icon.png",
			code: ["right", "right", "down", "right"],
		},
		{
			key: "Orbital Smoke Strike",
			type: ["orbital"],
			icon: w + "/b/bc/Orbital_Smoke_Strike_Stratagem_Icon.png",
			code: ["right", "right", "down", "up"],
		},
		{
			key: "Orbital EMS Strike",
			type: ["orbital"],
			icon: w + "/1/16/Orbital_EMS_Strike_Stratagem_Icon.png",
			code: ["right", "right", "left", "down"],
		},
		{
			key: "Orbital Napalm Barrage",
			type: ["orbital", "fire"],
			icon: w + "/9/97/Orbital_Napalm_Barrage_Stratagem_Icon.png",
			code: ["right", "right", "down", "left", "right", "up"],
		},
		// -------------------------------------------------------------------
		// Eagle Airstrikes
		// -------------------------------------------------------------------
		{
			key: "Eagle Strafing Run",
			type: ["eagle"],
			icon: w + "/f/f3/Eagle_Strafing_Run_Stratagem_Icon.png",
			code: ["up", "right", "right"],
		},
		{
			key: "Eagle Airstrike",
			type: ["eagle"],
			icon: w + "/7/72/Eagle_Airstrike_Stratagem_Icon.png",
			code: ["up", "right", "down", "right"],
		},
		{
			key: "Eagle Cluster Bomb",
			type: ["eagle"],
			icon: w + "/4/4f/Eagle_Cluster_Bomb_Stratagem_Icon.png",
			code: ["up", "right", "down", "down", "right"],
		},
		{
			key: "Eagle Napalm Strike",
			type: ["eagle", "fire"],
			icon: w + "/4/42/Eagle_Napalm_Airstrike_Stratagem_Icon.png",
			code: ["up", "right", "down", "up"],
		},
		{
			key: "Eagle Smoke Strike",
			type: ["eagle"],
			icon: w + "/0/05/Eagle_Smoke_Strike_Stratagem_Icon.png",
			code: ["up", "right", "up", "down"],
		},
		{
			key: "Eagle 110mm Rocket Pods",
			type: ["eagle"],
			icon: w + "/e/ef/Eagle_110mm_Rocket_Pods_Stratagem_Icon.png",
			code: ["up", "right", "up", "left"],
		},
		{
			key: "Eagle 500kg Bomb",
			type: ["eagle"],
			icon: w + "/e/e5/Eagle_500kg_Bomb_Stratagem_Icon.png",
			code: ["up", "right", "down", "down", "down"],
		},
		// -------------------------------------------------------------------
		// Backpacks
		// -------------------------------------------------------------------
		{
			key: "Jump Pack",
			type: ["backpack"],
			icon: w + "/f/f5/Jump_Pack_Stratagem_Icon.png",
			modelName: "LIFT-850",
			code: ["down", "up", "up", "down", "up"],
		},
		{
			key: "Supply Pack",
			type: ["backpack"],
			icon: w + "/6/61/Supply_Pack_Stratagem_Icon.png",
			modelName: "B-1",
			code: ["down", "left", "down", "up", "up", "down"],
		},
		{
			key: "Guard Dog Rover",
			type: ["backpack", "laser", "guard dog"],
			icon: w + "/6/6f/Guard_Dog_Rover_Stratagem_Icon.png",
			modelName: "AX/LAS-5",
			code: ["down", "up", "left", "up", "right", "right"],
			displayName: `&quot;Guard Dog&quot; Rover`,
		},
		{
			key: "Guard Dog",
			type: ["backpack", "guard dog"],
			icon: w + "/7/73/Guard_Dog_Stratagem_Icon.png",
			modelName: "AX/AR-23",
			code: ["down", "up", "left", "up", "right", "down"],
			displayName: `&quot;Guard Dog&quot;`,
		},
		{
			key: "Guard Dog Dog Breath",
			type: ["backpack", "guard dog", "toxic"],
			icon: w + "/2/20/Guard_Dog_Dog_Breath_Stratagem_Icon.png",
			modelName: "AX/TX-13",
			code: ["down", "up", "left", "up", "right", "up"],
			displayName: `&quot;Guard Dog&quot; Dog Breath`,
		},
		{
			key: "Ballistic Shield Backpack",
			type: ["backpack"],
			icon: w + "/3/37/Ballistic_Shield_Backpack_Stratagem_Icon.png",
			modelName: "SH-20",
			code: ["down", "left", "down", "down", "up", "left"],
		},
		{
			key: "Shield Generator Pack",
			type: ["backpack"],
			icon: w + "/9/99/Shield_Generator_Pack_Stratagem_Icon.png",
			modelName: "SH-32",
			code: ["down", "up", "left", "right", "left", "right"],
		},
		{
			key: "Directional Shield",
			type: ["backpack"],
			modelName: "SH-51",
			icon: w + "/b/b7/SH-51_Directional_Shield_Stratagem_Icon.png",
			code: ["down", "up", "left", "right", "up", "up"],
		},
		// -------------------------------------------------------------------
		// Fortifications
		// -------------------------------------------------------------------
		{
			key: "Shield Generator Relay",
			type: ["defense", "emplacement"],
			icon: w + "/e/e4/Shield_Generator_Relay_Stratagem_Icon.png",
			modelName: "FX-12",
			code: ["down", "down", "left", "right", "left", "right"],
		},
		{
			key: "Tesla Tower",
			type: ["defense", "emplacement"],
			icon: w + "/8/8f/Tesla_Tower_Stratagem_Icon.png",
			modelName: "A/ARC-3",
			code: ["down", "up", "right", "up", "left", "right"],
		},
		{
			key: "Anti-Personnel Minefield",
			type: ["defense", "emplacement", "mines"],
			icon: w + "/b/bb/Anti-Personnel_Minefield_Stratagem_Icon.png",
			modelName: "MD-6",
			code: ["down", "left", "up", "right"],
			buildConfig: {
				note: 'Anti-Personnel Minefield can sometimes be misspelled as "anti-personal minefield", so instead of failing, it will be accepted.',
				specialAction: "extra", // Extra enables additional matches to be made.
				actionData: ["anti-personal minefield"], // SIC, yes, that's the correct spelling.
			},
		},
		{
			key: "Incendiary Mines",
			type: ["defense", "fire", "emplacement", "mines"],
			icon: w + "/a/a9/Incendiary_Minefield_Stratagem_Icon.png",
			modelName: "MD-14",
			code: ["down", "left", "left", "down"],
		},
		{
			key: "Anti-Tank Mines",
			type: ["defense", "emplacement", "mines"],
			icon: w + "/b/ba/MD-17_Anti-Tank_Mines_Stratagem_Icon.png",
			modelName: "MD-17",
			code: ["down", "left", "up", "up"],
		},
		{
			key: "Gas Mines",
			type: ["defense", "emplacement", "mines"],
			modelName: "MD-8",
			icon: w + "/c/c0/Gas_Minefield_Stratagem_Icon.png.png",
			code: ["down", "left", "left", "right"],
		},
		{
			key: "HMG Emplacement",
			type: ["defense", "emplacement"],
			icon: w + "/0/03/HMG_Emplacement_Stratagem_Icon.png",
			modelName: "E/MG-101",
			code: ["down", "up", "left", "right", "right", "left"],
		},
		{
			key: "Anti-Tank Emplacement",
			type: ["defense", "emplacement"],
			modelName: "E/AT-12",
			icon: w + "/6/62/E_AT-12_Anti-Tank_Emplacement_Stratagem_Icon.png",
			code: ["down", "up", "left", "right", "right", "right"],
		},
		{
			key: "Machine Gun Sentry",
			type: ["defense", "sentry"],
			icon: w + "/5/5a/Machine_Gun_Sentry_Stratagem_Icon.png",
			modelName: "A/MG-43",
			code: ["down", "up", "right", "right", "up"],
		},
		{
			key: "Gatling Sentry",
			type: ["defense", "sentry"],
			icon: w + "/2/28/Gatling_Sentry_Stratagem_Icon.png",
			modelName: "A/G-16",
			code: ["down", "up", "right", "left"],
		},
		{
			key: "Mortar Sentry",
			type: ["defense", "sentry"],
			icon: w + "/a/ad/Mortar_Sentry_Stratagem_Icon.png",
			modelName: "A/M-12",
			code: ["down", "up", "right", "right", "down"],
		},
		{
			key: "Autocannon Sentry",
			type: ["defense", "sentry"],
			icon: w + "/a/a7/Autocannon_Sentry_Stratagem_Icon.png",
			modelName: "A/AC-8",
			code: ["down", "up", "right", "up", "left", "up"],
		},
		{
			key: "Rocket Sentry",
			type: ["defense", "sentry"],
			icon: w + "/6/62/Rocket_Sentry_Stratagem_Icon.png",
			modelName: "A/MLS-4X",
			code: ["down", "up", "right", "right", "left"],
		},
		{
			key: "EMS Mortar Sentry",
			type: ["defense", "sentry"],
			icon: w + "/a/a8/AM-23_EMS_Mortar_Sentry_Stratagem_Icon.png",
			modelName: "A/M-23",
			code: ["down", "up", "right", "down", "right"],
		},
		{
			key: "Flame Sentry",
			type: ["defense", "sentry"],
			icon: w + "/0/0e/A_FLAM-40_Flame_Sentry_Stratagem_Icon.png",
			modelName: "A/FLAM-40",
			code: ["down", "up", "right", "down", "up", "up"],
		},
		// -------------------------------------------------------------------
		// Vehicles
		// -------------------------------------------------------------------
		{
			key: "Patriot Exosuit",
			type: ["vehicle", "mech"],
			icon: w + "/3/30/EXO-45_Patriot_Exosuit_Stratagem_Icon.png",
			modelName: "EXO-45",
			code: ["left", "down", "right", "up", "left", "down", "down"],
		},
		{
			key: "Emancipator Exosuit",
			type: ["vehicle", "mech"],
			icon: w + "/8/82/EXO-49_Emancipator_Exosuit_Stratagem_Icon.png",
			modelName: "EXO-49",
			code: ["left", "down", "right", "up", "left", "down", "up"],
		},
		{
			key: "Fast Reconnaissance Vehicle",
			type: ["vehicle"],
			modelName: "M-102",
			icon: w + "/0/00/M-102_Fast_Recon_Vehicle_Stratagem_Icon.png",
			code: ["left", "down", "right", "down", "right", "down", "up"],
			buildConfig: {
				note: "FRV has additional names.",
				specialAction: "extra",
				actionData: ["Fast Recon Vehicle", "FRV"],
			},
		},
		// -------------------------------------------------------------------
		// Mission
		// -------------------------------------------------------------------
		{
			key: "Reinforce",
			type: ["mission"],
			icon: w + "/5/5c/Reinforce_Stratagem_Icon.png",
			code: ["up", "down", "right", "left", "up"],
		},
		{
			key: "SOS Beacon",
			type: ["mission"],
			icon: w + "/3/3d/SOS_Beacon_Stratagem_Icon.png",
			code: ["up", "down", "right", "up"],
		},
		{
			key: "Resupply",
			type: ["mission"],
			icon: w + "/6/64/Resupply_Stratagem_Icon.png",
			code: ["down", "down", "up", "right"],
		},
		{
			key: "Eagle Rearm",
			type: ["mission", "eagle"],
			icon: w + "/0/08/Eagle_Rearm_Stratagem_Icon.png",
			code: ["up", "up", "left", "up", "right"],
		},
		{
			// NOTE: There's a variant of this stratagem exclusive to the "Destroy Air Bases" mission type. Both stratagems are called SSSD Delivery, but we need to differentiate them somehow.
			key: "SSSD Delivery",
			type: ["mission"],
			icon: w + "/5/53/Start_Upload_Stratagem_Icon.svg",
			code: ["down", "down", "down", "up", "up"],
		},
		{
			key: "SSSD Delivery 2", // "Destroy Air Bases" variant.
			type: ["mission"],
			icon: w + "/5/53/Start_Upload_Stratagem_Icon.svg",
			code: ["down", "down", "down", "down", "down", "up", "up"],
		},
		{
			key: "Prospecting Drill",
			type: ["mission"],
			icon: w + "/0/02/Prospecting_Drill_Stratagem_Icon.png",
			code: ["down", "down", "left", "right", "down", "down"],
		},
		{
			key: "Super Earth Flag",
			type: ["mission"],
			icon: w + "/3/3c/Super_Earth_Flag_Stratagem_Icon.png",
			code: ["down", "up", "down", "up"],
		},
		{
			key: "Hellbomb",
			type: ["mission"],
			icon: w + "/a/a0/Hellbomb_Stratagem_Icon.png",
			code: ["down", "up", "left", "down", "up", "right", "down", "up"],
		},
		{
			key: "Upload Data",
			type: ["mission"],
			icon: w + "/5/53/Start_Upload_Stratagem_Icon.svg",
			code: ["left", "right", "up", "up", "up"],
		},
		{
			key: "Seismic Probe",
			type: ["mission"],
			icon: w + "/7/74/Seismic_Probe_Stratagem_Icon.png",
			code: ["up", "up", "left", "right", "down", "down"],
		},
		{
			key: "SEAF Artillery",
			type: ["mission"],
			icon: w + "/f/f7/SEAF_Artillery_Stratagem_Icon.png",
			code: ["right", "up", "up", "down"],
		},
		{
			key: "Orbital Illumination Flare",
			type: ["mission"],
			icon: w + "/f/f9/Orbital_Illumination_Flare_Stratagem_Icon.png",
			code: ["right", "right", "left", "left"],
		},
		{
			key: "Dark Fluid Vessel",
			type: ["mission", "backpack"],
			icon: w + "/7/7b/Dark_Fluid_Vessel_Stratagem_Icon.png",
			code: ["up", "left", "right", "down", "up", "up"],
		},
		{
			key: "Tectonic Drill",
			type: ["mission"],
			icon: w + "/0/02/Prospecting_Drill_Stratagem_Icon.png",
			code: ["up", "down", "up", "down", "up", "down"],
		},
		{
			key: "Hive Breaker Drill",
			type: ["mission"],
			icon: w + "/0/02/Prospecting_Drill_Stratagem_Icon.png",
			code: ["left", "up", "down", "right", "down", "down"],
		},
	];
