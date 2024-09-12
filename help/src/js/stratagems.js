/** 
 * @typedef {Object} Stratagem
 * @property {string} key
 * @property {string[]} type
 * @property {string} [icon]
 * @property {string[]} code
 * @property {string} [displayName]
*/

const wiki = "https://helldivers.wiki.gg/images";

/** Game version that the Stratagem list is aligned with. */
export const version = "01.001.005",
	/**
	 * Complete list of all Stratagems currently available in Helldivers 2.
	 * Each one has a `code` property, a series of directional inputs, which is used to generate Case statements in the AutoHotkey script.
	 * Some will have a display name, which should be used instead of the key.
	 * ```ts
	 * interface Stratagem {
	 * 	key: string,
	 * 	type: string[],
	 * 	icon?: string,
	 * 	code: string[],
	 * 	displayName?: string
	 * }
	 * ```
	 * @type {Stratagem[]}
	 */
	stratagems = [
		// Weapons
		{ key: "Machine Gun", type: ["weapon", "machine gun"], icon: wiki+"/e/e0/Machine_Gun_Stratagem_Icon.png", code: ["down","left","down","up","right"] },
		{ key: "Anti-Material Rifle", type: ["weapon"], icon: wiki+"/3/3c/Anti-Materiel_Rifle_Stratagem_Icon.png", code: ["down","left","right","up","down"] },
		{ key: "Stalwart", type: ["weapon","machine gun"], icon: wiki+"/4/46/Stalwart_Stratagem_Icon.png", code: ["down","left","down","up","up","left"] },
		{ key: "Expendable Anti-Tank", type: ["weapon"], icon: wiki+"/1/1c/Expendable_Anti-Tank_Stratagem_Icon.png", code: ["down","down","left","up","right"] },
		{ key: "Recoilless Rifle", type: ["weapon", "backpack", "team reload"], icon: wiki+"/7/70/Recoilless_Rifle_Stratagem_Icon.png", code: ["down","left","right","right","left"] },
		{ key: "Flamethrower", type: ["weapon"], icon: wiki+"/7/75/Flamethrower_Stratagem_Icon.png", code: ["down","left","up","down","up"] },
		{ key: "Autocannon", type: ["weapon", "backpack", "team reload"], icon: wiki+"/e/ef/Autocannon_Stratagem_Icon.png", code: ["down","left","down","up","up","right"] },
		{ key: "Heavy Machine Gun", type: ["weapon", "machine gun"], icon: wiki+"/d/d9/Heavy_Machine_Gun_Stratagem_Icon.png", code: ["down","left","up","down","down"] },
		{ key: "Airburst Rocket Launcher", type: ["weapon", "backpack", "team reload"], icon: wiki+"/a/ad/RL-77_Airburst_Rocket_Launcher_Stratagem_Icon.png", code: ["down","up","up","left","right"] },
		{ key: "Commando", type: ["weapon"], icon: wiki+"/7/78/Commando_Stratagem_Icon.png", code: ["down","left","up","down","right"] },
		{ key: "Railgun", type: ["weapon"], icon: wiki+"/3/35/Railgun_Stratagem_Icon.png", code: ["down","right","down","up","left","right"] },
		{ key: "Spear", type: ["weapon", "backpack", "team reload"], icon: wiki+"/5/54/Spear_Stratagem_Icon.png", code: ["down","down","up","down","down"] },
		{ key: "Grenade Launcher", type: ["weapon"], icon: wiki+"/c/cf/Grenade_Launcher_Stratagem_Icon.png", code: ["down","left","up","left","down"] },
		{ key: "Laser Cannon", type: ["weapon", "laser"], icon: wiki+"/c/c3/Laser_Cannon_Stratagem_Icon.png", code: ["down","left","down","up","left"] },
		{ key: "Arc Thrower", type: ["weapon"], icon: wiki+"/1/10/Arc_Thrower_Stratagem_Icon.png", code: ["down","left","down","up","left","left"] },
		{ key: "Quasar Cannon", type: ["weapon"], icon: wiki+"/8/87/Quasar_Cannon_Stratagem_Icon.png", code: ["down","down","up","left","right"] },
		/* Upcoming in the new Warbond: Chemical Agents!
		{ key: "Sterilizer", type: ["weapon"], code: ["down"]}
		*/
		// Orbitals
		{ key: "Orbital Gatling Barrage", type: ["orbital"], icon: wiki+"/f/f6/Orbital_Gatling_Barrage_Stratagem_Icon.png", code: ["right","down","left","up","up"] },
		{ key: "Orbital Airburst Strike", type: ["orbital"], icon: wiki+"/2/28/Orbital_Airburst_Strike_Stratagem_Icon.png", code: ["right","right","right"] },
		{ key: "Orbital 120mm HE Barrage", type: ["orbital"], icon: wiki+"/4/40/Orbital_120mm_HE_Barrage_Stratagem_Icon.png", code: ["right","right","down","left","right","down"] },
		{ key: "Orbital 380mm HE Barrage", type: ["orbital"], icon: wiki+"/1/12/Orbital_380mm_HE_Barrage_Stratagem_Icon.png", code: ["right","down","up","up","left","down","down"] },
		{ key: "Orbital Walking Barrage", type: ["orbital"], icon: wiki+"/5/53/Orbital_Walking_Barrage_Stratagem_Icon.png", code: ["right","down","right","down","right","down"] },
		{ key: "Orbital Laser", type: ["orbital", "laser"], icon: wiki+"/d/d8/Orbital_Laser_Stratagem_Icon.png", code: ["right","down","up","right","down"] },
		{ key: "Orbital Railcannon Strike", type: ["orbital"], icon: wiki+"/6/6f/Orbital_Railcannon_Strike_Stratagem_Icon.png", code: ["right","up","down","down","right"] },
		{ key: "Orbital Precision Strike", type: ["orbital"], icon: wiki+"/2/2a/Orbital_Precision_Strike_Stratagem_Icon.png", code: ["right","right","down"] },
		{ key: "Orbital Gas Strike", type: ["orbital"], icon: wiki+"/c/cd/Orbital_Gas_Strike_Stratagem_Icon.png", code: ["right","right","down","right"] },
		{ key: "Orbital Smoke Strike", type: ["orbital"], icon: wiki+"/b/bc/Orbital_Smoke_Strike_Stratagem_Icon.png", code: ["right","right","down","up"] },
		{ key: "Orbital EMS Strike", type: ["orbital"], icon: wiki+"/1/16/Orbital_EMS_Strike_Stratagem_Icon.png", code: ["right","right","left","down"] },
		{ key: "Orbital Napalm Barrage", type: ["orbital", "fire"], code: ["right","right","down","left","right","up"] },
		// Eagle Airstrikes
		{ key: "Eagle Strafing Run", type: ["eagle"], icon: wiki+"/f/f3/Eagle_Strafing_Run_Stratagem_Icon.png", code: ["up","right","right"] },
		{ key: "Eagle Airstrike", type: ["eagle"], icon: wiki+"/7/72/Eagle_Airstrike_Stratagem_Icon.png", code: ["up","right","down","right"] },
		{ key: "Eagle Cluster Bomb", type: ["eagle"], icon: wiki+"/4/4f/Eagle_Cluster_Bomb_Stratagem_Icon.png", code: ["up","right","down","down","right"] },
		{ key: "Eagle Napalm Strike", type: ["eagle", "fire"], icon: wiki+"/4/42/Eagle_Napalm_Airstrike_Stratagem_Icon.png", code: ["up","right","down","up"] },
		{ key: "Eagle Smoke Strike", type: ["eagle"], icon: wiki+"/0/05/Eagle_Smoke_Strike_Stratagem_Icon.png", code: ["up","right","up","down"] },
		{ key: "Eagle 110mm Rocket Pods", type: ["eagle"], icon: wiki+"/e/ef/Eagle_110mm_Rocket_Pods_Stratagem_Icon.png", code: ["up","right","up","left"] },
		{ key: "Eagle 500kg Bomb", type: ["eagle"], icon: wiki+"/e/e5/Eagle_500kg_Bomb_Stratagem_Icon.png", code: ["up","right","down","down","down"] },
		// Backpacks
		{ key: "Jump Pack", type: ["backpack"], icon: wiki+"/f/f5/Jump_Pack_Stratagem_Icon.png", code: ["down","up","up","down","up"] },
		{ key: "Supply Pack", type: ["backpack"], icon: wiki+"/6/61/Supply_Pack_Stratagem_Icon.png", code: ["down","left","down","up","up","down"] },
		{ key: "Guard Dog Rover", type: ["backpack","laser", "guard dog"], icon: wiki+"/6/6f/Guard_Dog_Rover_Stratagem_Icon.png", code: ["down","up","left","up","right","right"], displayName: `"Guard Dog" Rover` },
		{ key: "Guard Dog", type: ["backpack", "guard dog"], icon: wiki+"/7/73/Guard_Dog_Stratagem_Icon.png", code: ["down","up","left","up","right","down"], displayName: `"Guard Dog"` },
		/* Upcoming in the new Warbond: Chemical Agents!
		{ key: "Guard Dog Dog Breath", type: ["backpack", "guard dog"], code: ["down"], displayName: `"Guard Dog" Dog Breath`}
		*/
		{ key: "Ballistic Shield Backpack", type: ["backpack"], icon: wiki+"/3/37/Ballistic_Shield_Backpack_Stratagem_Icon.png", code: ["down","left","down","down","up","left"] },
		{ key: "Shield Generator Pack", type: ["backpack"], icon: wiki+"/9/99/Shield_Generator_Pack_Stratagem_Icon.png", code: ["down","up","left","right","left","right"] },
		// Defense
		{ key: "Shield Generator Relay", type: ["defense", "emplacement"], icon: wiki+"/e/e4/Shield_Generator_Relay_Stratagem_Icon.png", code: ["down","down","left","right","left","right"] },
		{ key: "Tesla Tower", type: ["defense", "emplacement"], icon: wiki+"/8/8f/Tesla_Tower_Stratagem_Icon.png", code: ["down","up","right","up","left","right"] },
		{ key: "Anti-Personnel Minefield", type: ["defense", "emplacement"], icon: wiki+"/b/bb/Anti-Personnel_Minefield_Stratagem_Icon.png", code: ["down","left","up","right"] },
		{ key: "Incendiary Mines", type: ["defense", "fire", "emplacement"], icon: wiki+"/a/a9/Incendiary_Minefield_Stratagem_Icon.png", code: ["down","left","left","down"] },
		{ key: "Anti-Tank Mines", type: ["defense", "emplacement"], icon: wiki+"/b/ba/MD-17_Anti-Tank_Mines_Stratagem_Icon.png", code: ["down","left","up","up"] },
		{ key: "HMG Emplacement", type: ["defense", "emplacement"], icon: wiki+"/0/03/HMG_Emplacement_Stratagem_Icon.png", code: ["down","up","left","right","right","left"] },
		{ key: "Machine Gun Sentry", type: ["defense", "sentry"], icon: wiki+"/5/5a/Machine_Gun_Sentry_Stratagem_Icon.png", code: ["down","up","right","right","up"] },
		{ key: "Gatling Sentry", type: ["defense", "sentry"], icon: wiki+"/2/28/Gatling_Sentry_Stratagem_Icon.png", code: ["down","up","right","left"] },
		{ key: "Mortar Sentry", type: ["defense", "sentry"], icon: wiki+"/a/ad/Mortar_Sentry_Stratagem_Icon.png", code: ["down","up","right","right","down"] },
		{ key: "Autocannon Sentry", type: ["defense", "sentry"], icon: wiki+"/a/a7/Autocannon_Sentry_Stratagem_Icon.png", code: ["down","up","right","up","left","up"] },
		{ key: "Rocket Sentry", type: ["defense", "sentry"], icon: wiki+"/6/62/Rocket_Sentry_Stratagem_Icon.png", code: ["down","up","right","right","left"] },
		{ key: "EMS Mortar Sentry", type: ["defense", "sentry"], icon: wiki+"/a/a8/AM-23_EMS_Mortar_Sentry_Stratagem_Icon.png", code: ["down","up","right","down","right"] },
		{ key: "Patriot Exosuit", type: ["vehicle", "mech"], icon: wiki+"/3/30/EXO-45_Patriot_Exosuit_Stratagem_Icon.png", code: ["left","down","right","up","left","down","down"] },
		{ key: "Emancipator Exosuit", type: ["vehicle","mech"], icon: wiki+"/8/82/EXO-49_Emancipator_Exosuit_Stratagem_Icon.png", code: ["left","down","right","up","left","down","up"] },
		// Mission
		{ key: "Reinforce", type: ["mission"], icon: wiki+"/5/5c/Reinforce_Stratagem_Icon.png", code: ["up","down","right","left","up"] },
		{ key: "SOS Beacon", type: ["mission"], icon: wiki+"/3/3d/SOS_Beacon_Stratagem_Icon.png", code: ["up","down","right","up"] },
		{ key: "Resupply", type: ["mission"], icon: wiki+"/6/64/Resupply_Stratagem_Icon.png", code: ["down","down","up","right"] },
		{ key: "Eagle Rearm", type: ["mission", "eagle"], icon: wiki+"/f/fa/Eagle_Rearm_Stratagem_Icon.svg", code: ["up","up","left","up","right"] },
		{ key: "SSSD Delivery", type: ["mission"], icon: wiki+"/5/53/Start_Upload_Stratagem_Icon.svg", code: ["down","down","down","up","up"] },
		{ key: "Prospecting Drill", type: ["mission"], icon: wiki+"/0/02/Prospecting_Drill_Stratagem_Icon.png", code: ["down","down","left","right","down","down"] },
		{ key: "Super Earth Flag", type: ["mission"], icon: wiki+"/3/3c/Super_Earth_Flag_Stratagem_Icon.png", code: ["down","up","down","up"] },
		{ key: "Hellbomb", type: ["mission"], icon: wiki+"/a/a0/Hellbomb_Stratagem_Icon.png", code: ["down","up","left","down","up","right","down","up"] },
		{ key: "Upload Data", type: ["mission"], icon: wiki+"/5/53/Start_Upload_Stratagem_Icon.svg", code: ["left","right","up","up","up"] },
		{ key: "Seismic Probe", type: ["mission"], icon: wiki+"/7/74/Seismic_Probe_Stratagem_Icon.png", code: ["up","up","left","right","down","down"] },
		{ key: "SEAF Artillery", type: ["mission"], icon: wiki+"/f/f7/SEAF_Artillery_Stratagem_Icon.png", code: ["right","up","up","down"] },
		{ key: "Orbital Illumination Flare", type: ["mission"], icon: wiki+"/f/f9/Orbital_Illumination_Flare_Stratagem_Icon.png", code: ["right","right","left","left"] },
		{ key: "Dark Fluid Vessel", type: ["mission"], code: ["up","left","right","down","up","up"] }, // Helldivers Wiki doesn't have these two icons, as of August 2024.
		{ key: "Tectonic Drill", type: ["mission"], code: ["up","down","up","down","up","down"] },
		{ key: "Hive Breaker Drill", type: ["mission"], icon: wiki+"/0/02/Prospecting_Drill_Stratagem_Icon.png", code: ["left","up","down","right","down","down"] }
	];