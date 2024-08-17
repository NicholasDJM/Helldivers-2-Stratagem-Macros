/** 
 * @typedef {Object} Stratagem
 * @property {string} key
 * @property {string[]} type
 * @property {string} [icon]
 * @property {string[]} code
 * @property {string} [displayName]
*/

/**
 *  Game version that the Stratagem list is aligned with.
 */
export const version = "100.001.002",
	/**
	 * @type {Stratagem[]}
	 * @property {string} key
	 * @property {string[]} type
	 * @property {string} [icon]
	 * @property {string[]} code
	 * @property {string} [displayName]
	 */
	stratagems = [
		// Weapons
		{ key: "machine gun", type: ["weapon"], icon: "https://helldivers.wiki.gg/images/e/e0/Machine_Gun_Stratagem_Icon.png", code: ["down","left","down","up","right"] },
		{ key: "anti material rifle", type: ["weapon"], icon: "https://helldivers.wiki.gg/images/3/3c/Anti-Materiel_Rifle_Stratagem_Icon.png", code: ["down","left","right","up","down"] },
		{ key: "stalwart", type: ["weapon","machine gun"], icon: "https://helldivers.wiki.gg/images/4/46/Stalwart_Stratagem_Icon.png", code: ["down","left","down","up","up","left"] },
		{ key: "expendable anti tank", type: ["weapon"], icon: "https://helldivers.wiki.gg/images/1/1c/Expendable_Anti-Tank_Stratagem_Icon.png", code: ["down","down","left","up","right"] },
		{ key: "recoilless rifle", type: ["weapon", "backpack"], icon: "https://helldivers.wiki.gg/images/7/70/Recoilless_Rifle_Stratagem_Icon.png", code: ["down","left","right","right","left"] },
		{ key: "flamethrower", type: ["weapon"], icon: "https://helldivers.wiki.gg/images/7/75/Flamethrower_Stratagem_Icon.png", code: ["down","left","up","down","up"] },
		{ key: "autocannon", type: ["weapon", "backpack"], icon: "https://helldivers.wiki.gg/images/e/ef/Autocannon_Stratagem_Icon.png", code: ["down","left","down","up","up","right"] },
		{ key: "heavy machine gun", type: ["weapon"], icon: "https://helldivers.wiki.gg/images/d/d9/Heavy_Machine_Gun_Stratagem_Icon.png", code: ["down","left","up","down","down"] },
		{ key: "airburst rocket launcher", type: ["weapon", "backpack"], icon: "https://helldivers.wiki.gg/images/a/ad/RL-77_Airburst_Rocket_Launcher_Stratagem_Icon.png", code: ["down","up","up","left","right"] },
		{ key: "commando", type: ["weapon"], icon: "https://helldivers.wiki.gg/images/7/78/Commando_Stratagem_Icon.png", code: ["down","left","up","down","right"] },
		{ key: "railgun", type: ["weapon"], icon: "https://helldivers.wiki.gg/images/3/35/Railgun_Stratagem_Icon.png", code: ["down","right","down","up","left","right"] },
		{ key: "spear", type: ["weapon", "backpack"], icon: "https://helldivers.wiki.gg/images/5/54/Spear_Stratagem_Icon.png", code: ["down","down","up","down","down"] },
		{ key: "grenade launcher", type: ["weapon"], icon: "https://helldivers.wiki.gg/images/c/cf/Grenade_Launcher_Stratagem_Icon.png", code: ["down","left","up","left","down"] },
		{ key: "laser cannon", type: ["weapon", "laser"], icon: "https://helldivers.wiki.gg/images/c/c3/Laser_Cannon_Stratagem_Icon.png", code: ["down","left","down","up","left"] },
		{ key: "arc thrower", type: ["weapon"], icon: "https://helldivers.wiki.gg/images/1/10/Arc_Thrower_Stratagem_Icon.png", code: ["down","left","down","up","left","left"] },
		{ key: "quasar cannon", type: ["weapon"], icon: "https://helldivers.wiki.gg/images/8/87/Quasar_Cannon_Stratagem_Icon.png", code: ["down","down","up","left","right"] },
		// Orbitals
		{ key: "orbital gatling barrage", type: ["orbital"], icon: "https://helldivers.wiki.gg/images/f/f6/Orbital_Gatling_Barrage_Stratagem_Icon.png", code: ["right","down","left","up","up"] },
		{ key: "orbital airburst strike", type: ["orbital"], icon: "https://helldivers.wiki.gg/images/2/28/Orbital_Airburst_Strike_Stratagem_Icon.png", code: ["right","right","right"] },
		{ key: "orbital 120mm he barrage", type: ["orbital"], icon: "https://helldivers.wiki.gg/images/4/40/Orbital_120mm_HE_Barrage_Stratagem_Icon.png", code: ["right","right","down","left","right","down"] },
		{ key: "orbital 380mm he barrage", type: ["orbital"], icon: "https://helldivers.wiki.gg/images/1/12/Orbital_380mm_HE_Barrage_Stratagem_Icon.png", code: ["right","down","up","up","left","down","down"] },
		{ key: "orbital walking barrage", type: ["orbital"], icon: "https://helldivers.wiki.gg/images/5/53/Orbital_Walking_Barrage_Stratagem_Icon.png", code: ["right","down","right","down","right","down"] },
		{ key: "orbital laser", type: ["orbital", "laser"], icon: "https://helldivers.wiki.gg/images/d/d8/Orbital_Laser_Stratagem_Icon.png", code: ["right","down","up","right","down"] },
		{ key: "orbital railcannon strike", type: ["orbital"], icon: "https://helldivers.wiki.gg/images/6/6f/Orbital_Railcannon_Strike_Stratagem_Icon.png", code: ["right","up","down","down","right"] },
		{ key: "orbital precision strike", type: ["orbital"], icon: "https://helldivers.wiki.gg/images/2/2a/Orbital_Precision_Strike_Stratagem_Icon.png", code: ["right","right","down"] },
		{ key: "orbital gas strike", type: ["orbital"], icon: "https://helldivers.wiki.gg/images/c/cd/Orbital_Gas_Strike_Stratagem_Icon.png", code: ["right","right","down","right"] },
		{ key: "orbital smoke strike", type: ["orbital"], icon: "https://helldivers.wiki.gg/images/b/bc/Orbital_Smoke_Strike_Stratagem_Icon.png", code: ["right","right","down","up"] },
		{ key: "orbital ems strike", type: ["orbital"], icon: "https://helldivers.wiki.gg/images/1/16/Orbital_EMS_Strike_Stratagem_Icon.png", code: ["right","right","left","down"], displayName: "Orbital EMS Strike" },
		// Eagle Airstrikes
		{ key: "eagle strafing run", type: ["eagle"], icon: "https://helldivers.wiki.gg/images/f/f3/Eagle_Strafing_Run_Stratagem_Icon.png", code: ["up","right","right"] },
		{ key: "eagle airstrike", type: ["eagle"], icon: "https://helldivers.wiki.gg/images/7/72/Eagle_Airstrike_Stratagem_Icon.png", code: ["up","right","down","right"] },
		{ key: "eagle cluster bomb", type: ["eagle"], icon: "https://helldivers.wiki.gg/images/4/4f/Eagle_Cluster_Bomb_Stratagem_Icon.png", code: ["up","right","down","down","right"] },
		{ key: "eagle napalm strike", type: ["eagle"], icon: "https://helldivers.wiki.gg/images/4/42/Eagle_Napalm_Airstrike_Stratagem_Icon.png", code: ["up","right","down","up"] },
		{ key: "eagle smoke strike", type: ["eagle"], icon: "https://helldivers.wiki.gg/images/0/05/Eagle_Smoke_Strike_Stratagem_Icon.png", code: ["up","right","up","down"] },
		{ key: "eagle 110mm rocket pods", type: ["eagle"], icon: "https://helldivers.wiki.gg/images/e/ef/Eagle_110mm_Rocket_Pods_Stratagem_Icon.png", code: ["up","right","up","left"] },
		{ key: "eagle 500kg bomb", type: ["eagle"], icon: "https://helldivers.wiki.gg/images/e/e5/Eagle_500kg_Bomb_Stratagem_Icon.png", code: ["up","right","down","down","down"] },
		// Backpacks
		{ key: "jump pack", type: ["backpack"], icon: "https://helldivers.wiki.gg/images/f/f5/Jump_Pack_Stratagem_Icon.png", code: ["down","up","up","down","up"] },
		{ key: "supply pack", type: ["backpack"], icon: "https://helldivers.wiki.gg/images/6/61/Supply_Pack_Stratagem_Icon.png", code: ["down","left","down","up","up","down"] },
		{ key: "guard dog rover", type: ["backpack","laser"], icon: "https://helldivers.wiki.gg/images/6/6f/Guard_Dog_Rover_Stratagem_Icon.png", code: ["down","up","left","up","right","right"] },
		{ key: "guard dog", type: ["backpack"], icon: "https://helldivers.wiki.gg/images/7/73/Guard_Dog_Stratagem_Icon.png", code: ["down","up","left","up","right","down"] },
		{ key: "ballistic shield backpack", type: ["backpack"], icon: "https://helldivers.wiki.gg/images/3/37/Ballistic_Shield_Backpack_Stratagem_Icon.png", code: ["down","left","down","down","up","left"] },
		{ key: "shield generator pack", type: ["backpack"], icon: "https://helldivers.wiki.gg/images/9/99/Shield_Generator_Pack_Stratagem_Icon.png", code: ["down","up","left","right","left","right"] },
		// Defense
		{ key: "shield generator relay", type: ["defense"], icon: "https://helldivers.wiki.gg/images/e/e4/Shield_Generator_Relay_Stratagem_Icon.png", code: ["down","down","left","right","left","right"] },
		{ key: "tesla tower", type: ["defense"], icon: "https://helldivers.wiki.gg/images/8/8f/Tesla_Tower_Stratagem_Icon.png", code: ["down","up","right","up","left","right"] },
		{ key: "anti personnel minefield", type: ["defense"], icon: "https://helldivers.wiki.gg/images/b/bb/Anti-Personnel_Minefield_Stratagem_Icon.png", code: ["down","left","up","right"] },
		{ key: "incendiary mines", type: ["defense"], icon: "https://helldivers.wiki.gg/images/a/a9/Incendiary_Minefield_Stratagem_Icon.png", code: ["down","left","left","down"] },
		{ key: "anti tank mines", type: ["defense"], icon: "https://helldivers.wiki.gg/images/b/ba/MD-17_Anti-Tank_Mines_Stratagem_Icon.png", code: ["down","left","up","up"] },
		{ key: "hmg emplacement", type: ["defense"], icon: "https://helldivers.wiki.gg/images/0/03/HMG_Emplacement_Stratagem_Icon.png", code: ["down","up","left","right","right","left"], displayName: "HMG Emplacement" },
		{ key: "machine gun sentry", type: ["defense"], icon: "https://helldivers.wiki.gg/images/5/5a/Machine_Gun_Sentry_Stratagem_Icon.png", code: ["down","up","right","right","up"] },
		{ key: "gatling sentry", type: ["defense"], icon: "https://helldivers.wiki.gg/images/2/28/Gatling_Sentry_Stratagem_Icon.png", code: ["down","up","right","left"] },
		{ key: "mortar sentry", type: ["defense"], icon: "https://helldivers.wiki.gg/images/a/ad/Mortar_Sentry_Stratagem_Icon.png", code: ["down","up","right","right","down"] },
		{ key: "autocannon sentry", type: ["defense"], icon: "https://helldivers.wiki.gg/images/a/a7/Autocannon_Sentry_Stratagem_Icon.png", code: ["down","up","right","up","left","up"] },
		{ key: "rocket sentry", type: ["defense"], icon: "https://helldivers.wiki.gg/images/6/62/Rocket_Sentry_Stratagem_Icon.png", code: ["down","up","right","right","left"] },
		{ key: "ems mortar sentry", type: ["defense"], icon: "https://helldivers.wiki.gg/images/a/a8/AM-23_EMS_Mortar_Sentry_Stratagem_Icon.png", code: ["down","up","right","down","right"], displayName: "EMS Mortar Sentry" },
		{ key: "patriot exosuit", type: ["vehicle", "mech"], icon: "https://helldivers.wiki.gg/images/3/30/EXO-45_Patriot_Exosuit_Stratagem_Icon.png", code: ["left","down","right","up","left","down","down"] },
		{ key: "emancipator exosuit", type: ["vehicle","mech"], icon: "https://helldivers.wiki.gg/images/8/82/EXO-49_Emancipator_Exosuit_Stratagem_Icon.png", code: ["left","down","right","up","left","down","up"] },
		// Mission
		{ key: "reinforce", type: ["mission"], icon: "https://helldivers.wiki.gg/images/5/5c/Reinforce_Stratagem_Icon.png", code: ["up","down","right","left","up"] },
		{ key: "sos beacon", type: ["mission"], icon: "https://helldivers.wiki.gg/images/3/3d/SOS_Beacon_Stratagem_Icon.png", code: ["up","down","right","up"], displayName: "SOS Beacon" },
		{ key: "resupply", type: ["mission"], icon: "https://helldivers.wiki.gg/images/6/64/Resupply_Stratagem_Icon.png", code: ["down","down","up","right"] },
		{ key: "eagle rearm", type: ["mission", "eagle"], icon: "https://helldivers.wiki.gg/images/f/fa/Eagle_Rearm_Stratagem_Icon.svg", code: ["up","up","left","up","right"] },
		{ key: "sssd delivery", type: ["mission"], icon: "https://helldivers.wiki.gg/images/5/53/Start_Upload_Stratagem_Icon.svg", code: ["down","down","down","up","up"], displayName: "SSSD Delivery" },
		{ key: "prospecting drill", type: ["mission"], icon: "https://helldivers.wiki.gg/images/0/02/Prospecting_Drill_Stratagem_Icon.png", code: ["down","down","left","right","down","down"] },
		{ key: "super earth flag", type: ["mission"], icon: "https://helldivers.wiki.gg/images/3/3c/Super_Earth_Flag_Stratagem_Icon.png", code: ["up","down","up","down"] },
		{ key: "hellbomb", type: ["mission"], icon: "https://helldivers.wiki.gg/images/a/a0/Hellbomb_Stratagem_Icon.png", code: ["down","up","left","down","up","right","down","up"] },
		{ key: "upload data", type: ["mission"], icon: "https://helldivers.wiki.gg/images/5/53/Start_Upload_Stratagem_Icon.svg", code: ["left","right","up","up","up"] },
		{ key: "seismic probe", type: ["mission"], icon: "https://helldivers.wiki.gg/images/7/74/Seismic_Probe_Stratagem_Icon.png", code: ["up","up","left","right","down","down"] },
		{ key: "seaf artillery", type: ["mission"], icon: "https://helldivers.wiki.gg/images/f/f7/SEAF_Artillery_Stratagem_Icon.png", code: ["right","up","up","down"], displayName: "SEAF Artillery" },
		{ key: "orbital illumination flare", type: ["mission"], icon: "https://helldivers.wiki.gg/images/f/f9/Orbital_Illumination_Flare_Stratagem_Icon.png", code: ["right","right","left","left"] },
		{ key: "dark fluid vessel", type: ["mission"], code: ["up","left","right","down","up","up"] }, // Helldivers Wiki doesn't have these two icons, as of August 2024.
		{ key: "tectonic drill", type: ["mission"], code: ["up","down","up","down","up","down"] },
		{ key: "hive breaker drill", type: ["mission"], icon: "https://helldivers.wiki.gg/images/0/02/Prospecting_Drill_Stratagem_Icon.png", code: ["left","up","down","right","down","down"] }
	]
