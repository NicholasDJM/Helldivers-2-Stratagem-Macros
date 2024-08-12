import Alpine from "alpinejs";
globalThis.Alpine = Alpine;
import Fuse from "fuse.js";
import "@picocss/pico/css/pico.amber.min.css";
import "./main.css";
import Prism from "prismjs";
globalThis.Prism = Prism
//@ts-expect-error
import light from "prismjs/themes/prism.min.css?raw";
//@ts-expect-error
import dark from "prismjs/themes/prism-twilight.min.css?raw";
import "prismjs/plugins/toolbar/prism-toolbar.js";
import "prismjs/plugins/download-button/prism-download-button.min.js"
import "prismjs/components/prism-autohotkey.min.js";
import "prismjs/plugins/copy-to-clipboard/prism-copy-to-clipboard.min.js";
//@ts-expect-error
import ahk from "../public/example.ahk?url"
const ahkEl = document.querySelector("#ahk-example") as HTMLPreElement
if (ahkEl) ahkEl.dataset.src = ahk

const darkStyleEl = document.createElement("style"),
	lightStyleEl = document.createElement("style");
darkStyleEl.textContent = dark;
lightStyleEl.textContent = light;
darkStyleEl.setAttribute("media", "(prefers-color-scheme: dark)");
lightStyleEl.setAttribute("media", "(prefers-color-scheme: light)");
document.head.append(darkStyleEl);
document.head.append(lightStyleEl);

let done = false
const buttonTimer = setInterval(()=>{
	// Can't style generated link from the Download Button plugin for PrismJS, so we must programatically style it.
	document.querySelectorAll(".toolbar-item a[download]").forEach(element=>{
		element.setAttribute("role", "button")
		element.setAttribute("download", "example.ahk") // NOTE: If we add more code examples, we should check for the proper filename somehow.
		done = true
	})
	if (done) clearInterval(buttonTimer)
})

const stratagems = [
	{ key: "machine gun", type: ["weapon"], icon: "https://helldivers.wiki.gg/images/e/e0/Machine_Gun_Stratagem_Icon.png" },
	{ key: "anti material rifle", type: ["weapon"], icon: "https://helldivers.wiki.gg/images/3/3c/Anti-Materiel_Rifle_Stratagem_Icon.png" },
	{ key: "stalwart", type: ["weapon","machine gun"], icon: "https://helldivers.wiki.gg/images/4/46/Stalwart_Stratagem_Icon.png" },
	{ key: "expendable anti tank", type: ["weapon"], icon: "https://helldivers.wiki.gg/images/1/1c/Expendable_Anti-Tank_Stratagem_Icon.png" },
	{ key: "recoiless rifle", type: ["weapon", "backpack"], icon: "https://helldivers.wiki.gg/images/7/70/Recoilless_Rifle_Stratagem_Icon.png" },
	{ key: "flamethrower", type: ["weapon"], icon: "https://helldivers.wiki.gg/images/7/75/Flamethrower_Stratagem_Icon.png" },
	{ key: "autocannon", type: ["weapon", "backpack"], icon: "https://helldivers.wiki.gg/images/e/ef/Autocannon_Stratagem_Icon.png" },
	{ key: "heavy machine gun", type: ["weapon"], icon: "https://helldivers.wiki.gg/images/d/d9/Heavy_Machine_Gun_Stratagem_Icon.png" },
	{ key: "airburst rocket launcher", type: ["weapon", "backpack"], icon: "https://helldivers.wiki.gg/images/a/ad/RL-77_Airburst_Rocket_Launcher_Stratagem_Icon.png" },
	{ key: "commando", type: ["weapon"], icon: "https://helldivers.wiki.gg/images/7/78/Commando_Stratagem_Icon.png" },
	{ key: "railgun", type: ["weapon"], icon: "https://helldivers.wiki.gg/images/3/35/Railgun_Stratagem_Icon.png" },
	{ key: "spear", type: ["weapon", "backpack"], icon: "https://helldivers.wiki.gg/images/5/54/Spear_Stratagem_Icon.png" },
	{ key: "grenade launcher", type: ["weapon"], icon: "https://helldivers.wiki.gg/images/c/cf/Grenade_Launcher_Stratagem_Icon.png" },
	{ key: "laser cannon", type: ["weapon", "laser"], icon: "https://helldivers.wiki.gg/images/c/c3/Laser_Cannon_Stratagem_Icon.png" },
	{ key: "arc thrower", type: ["weapon"], icon: "https://helldivers.wiki.gg/images/1/10/Arc_Thrower_Stratagem_Icon.png" },
	{ key: "quasar cannon", type: ["weapon"], icon: "https://helldivers.wiki.gg/images/8/87/Quasar_Cannon_Stratagem_Icon.png" },
	{ key: "orbital gatling barrage", type: ["orbital"], icon: "https://helldivers.wiki.gg/images/f/f6/Orbital_Gatling_Barrage_Stratagem_Icon.png" },
	{ key: "orbital airburst strike", type: ["orbital"], icon: "https://helldivers.wiki.gg/images/2/28/Orbital_Airburst_Strike_Stratagem_Icon.png" },
	{ key: "orbital 120mm he barrage", type: ["orbital"], icon: "https://helldivers.wiki.gg/images/4/40/Orbital_120mm_HE_Barrage_Stratagem_Icon.png" },
	{ key: "orbital 380mm he barrage", type: ["orbital"], icon: "https://helldivers.wiki.gg/images/1/12/Orbital_380mm_HE_Barrage_Stratagem_Icon.png" },
	{ key: "orbital walking barrage", type: ["orbital"], icon: "https://helldivers.wiki.gg/images/5/53/Orbital_Walking_Barrage_Stratagem_Icon.png" },
	{ key: "orbital laser", type: ["orbital", "laser"], icon: "https://helldivers.wiki.gg/images/d/d8/Orbital_Laser_Stratagem_Icon.png" },
	{ key: "orbital railcannon strike", type: ["orbital"], icon: "https://helldivers.wiki.gg/images/6/6f/Orbital_Railcannon_Strike_Stratagem_Icon.png" },
	{ key: "orbital precision strike", type: ["orbital"], icon: "https://helldivers.wiki.gg/images/2/2a/Orbital_Precision_Strike_Stratagem_Icon.png" },
	{ key: "orbital gas strike", type: ["orbital"], icon: "https://helldivers.wiki.gg/images/c/cd/Orbital_Gas_Strike_Stratagem_Icon.png" },
	{ key: "orbital smoke strike", type: ["orbital"], icon: "https://helldivers.wiki.gg/images/b/bc/Orbital_Smoke_Strike_Stratagem_Icon.png"},
	{ key: "orbital ems strike", type: ["orbital"], icon: "https://helldivers.wiki.gg/images/1/16/Orbital_EMS_Strike_Stratagem_Icon.png" },
	{ key: "eagle strafing run", type: ["eagle"], icon: "https://helldivers.wiki.gg/images/f/f3/Eagle_Strafing_Run_Stratagem_Icon.png" },
	{ key: "eagle airstrike", type: ["eagle"], icon: "https://helldivers.wiki.gg/images/7/72/Eagle_Airstrike_Stratagem_Icon.png" },
	{ key: "eagle cluster bomb", type: ["eagle"], icon: "https://helldivers.wiki.gg/images/4/4f/Eagle_Cluster_Bomb_Stratagem_Icon.png" },
	{ key: "eagle napalm strike", type: ["eagle"], icon: "https://helldivers.wiki.gg/images/4/42/Eagle_Napalm_Airstrike_Stratagem_Icon.png" },
	{ key: "eagle smoke strike", type: ["eagle"], icon: "https://helldivers.wiki.gg/images/0/05/Eagle_Smoke_Strike_Stratagem_Icon.png" },
	{ key: "eagle 110mm rocket pods", type: ["eagle"], icon: "https://helldivers.wiki.gg/images/e/ef/Eagle_110mm_Rocket_Pods_Stratagem_Icon.png" },
	{ key: "eagle 500kg bomb", type: ["eagle"], icon: "https://helldivers.wiki.gg/images/e/e5/Eagle_500kg_Bomb_Stratagem_Icon.png" },
	{ key: "jump pack", type: ["backpack"], icon: "https://helldivers.wiki.gg/images/f/f5/Jump_Pack_Stratagem_Icon.png" },
	{ key: "supply pack", type: ["backpack"], icon: "https://helldivers.wiki.gg/images/6/61/Supply_Pack_Stratagem_Icon.png" },
	{ key: "guard dog rover", type: ["backpack","laser"], icon: "https://helldivers.wiki.gg/images/6/6f/Guard_Dog_Rover_Stratagem_Icon.png" },
	{ key: "guard dog", type: ["backpack"], icon: "https://helldivers.wiki.gg/images/7/73/Guard_Dog_Stratagem_Icon.png" },
	{ key: "ballistic shield backpack", type: ["backpack"], icon: "https://helldivers.wiki.gg/images/3/37/Ballistic_Shield_Backpack_Stratagem_Icon.png" },
	{ key: "shield generator pack", type: ["backpack"], icon: "https://helldivers.wiki.gg/images/9/99/Shield_Generator_Pack_Stratagem_Icon.png" },
	{ key: "shield generator relay", type: ["defense"], icon: "https://helldivers.wiki.gg/images/e/e4/Shield_Generator_Relay_Stratagem_Icon.png" },
	{ key: "tesla tower", type: ["defense"], icon: "https://helldivers.wiki.gg/images/8/8f/Tesla_Tower_Stratagem_Icon.png" },
	{ key: "anti personnel minefield", type: ["defense"], icon: "https://helldivers.wiki.gg/images/b/bb/Anti-Personnel_Minefield_Stratagem_Icon.png" },
	{ key: "incendiary mines", type: ["defense"], icon: "https://helldivers.wiki.gg/images/a/a9/Incendiary_Minefield_Stratagem_Icon.png" },
	{ key: "anti tank mines", type: ["defense"], icon: "https://helldivers.wiki.gg/images/b/ba/MD-17_Anti-Tank_Mines_Stratagem_Icon.png" },
	{ key: "hmg emplacement", type: ["defense"], icon: "https://helldivers.wiki.gg/images/0/03/HMG_Emplacement_Stratagem_Icon.png" },
	{ key: "machine gun sentry", type: ["defense"], icon: "https://helldivers.wiki.gg/images/5/5a/Machine_Gun_Sentry_Stratagem_Icon.png" },
	{ key: "gatling sentry", type: ["defense"], icon: "https://helldivers.wiki.gg/images/2/28/Gatling_Sentry_Stratagem_Icon.png" },
	{ key: "mortar sentry", type: ["defense"], icon: "https://helldivers.wiki.gg/images/a/ad/Mortar_Sentry_Stratagem_Icon.png" },
	{ key: "autocannon sentry", type: ["defense"], icon: "https://helldivers.wiki.gg/images/a/a7/Autocannon_Sentry_Stratagem_Icon.png" },
	{ key: "rocket sentry", type: ["defense"], icon: "https://helldivers.wiki.gg/images/6/62/Rocket_Sentry_Stratagem_Icon.png" },
	{ key: "ems mortar sentry", type: ["defense"], icon: "https://helldivers.wiki.gg/images/a/a8/AM-23_EMS_Mortar_Sentry_Stratagem_Icon.png" },
	{ key: "patriot exosuit", type: ["vehicle", "mech"], icon: "https://helldivers.wiki.gg/images/3/30/EXO-45_Patriot_Exosuit_Stratagem_Icon.png" },
	{ key: "emancipator exosuit", type: ["vehicle","mech"], icon: "https://helldivers.wiki.gg/images/8/82/EXO-49_Emancipator_Exosuit_Stratagem_Icon.png" },
	{ key: "reinforce", type: ["mission"], icon: "https://helldivers.wiki.gg/images/5/5c/Reinforce_Stratagem_Icon.png" },
	{ key: "sos beacon", type: ["mission"], icon: "https://helldivers.wiki.gg/images/3/3d/SOS_Beacon_Stratagem_Icon.png" },
	{ key: "resupply", type: ["mission"], icon: "https://helldivers.wiki.gg/images/6/64/Resupply_Stratagem_Icon.png" },
	{ key: "eagle rearm", type: ["mission", "eagle"], icon: "https://helldivers.wiki.gg/images/f/fa/Eagle_Rearm_Stratagem_Icon.svg" },
	{ key: "sssd delivery", type: ["mission"], icon: "https://helldivers.wiki.gg/images/5/53/Start_Upload_Stratagem_Icon.svg" },
	{ key: "prospecting drill", type: ["mission"], icon: "https://helldivers.wiki.gg/images/0/02/Prospecting_Drill_Stratagem_Icon.png" },
	{ key: "super earth flag", type: ["mission"], icon: "https://helldivers.wiki.gg/images/3/3c/Super_Earth_Flag_Stratagem_Icon.png" },
	{ key: "hellbomb", type: ["mission"], icon: "https://helldivers.wiki.gg/images/a/a0/Hellbomb_Stratagem_Icon.png" },
	{ key: "upload data", type: ["mission"], icon: "https://helldivers.wiki.gg/images/5/53/Start_Upload_Stratagem_Icon.svg" },
	{ key: "seismic probe", type: ["mission"], icon: "https://helldivers.wiki.gg/images/7/74/Seismic_Probe_Stratagem_Icon.png" },
	{ key: "seaf artillery", type: ["mission"], icon: "https://helldivers.wiki.gg/images/f/f7/SEAF_Artillery_Stratagem_Icon.png"},
	{ key: "orbital illumination flare", type: ["mission"], icon: "https://helldivers.wiki.gg/images/f/f9/Orbital_Illumination_Flare_Stratagem_Icon.png"},
	{ key: "dark fluid vessel", type: ["mission"] }, // Helldivers Wiki doesn't have these two icons, as of August 2024.
	{ key: "tectonic drill", type: ["mission"] },
	{ key: "hive breaker drill", type: ["mission"], icon: "https://helldivers.wiki.gg/images/0/02/Prospecting_Drill_Stratagem_Icon.png" }
]
let fuse = new Fuse(stratagems, {
	keys: ["key", "type"],
	threshold: 0.4
})
Alpine.data("tools", ()=>{
	return {
		search() {
			if (this.$data.input) {
				return fuse.search(this.$data.input)
			}
			return stratagems.map((item, refIndex)=>({
				item,
				refIndex
			}));
		},
		copy() {
			// TODO: I should rewrite this to use bubbling.
			const timing = 7000; // Minimum 2000
			navigator.clipboard.writeText(this.$el.textContent).then(()=>{
				this.$el.classList.add("copy", "fadein");
				let current = timing - 2000;
				const element = this.$el.querySelector("code"),
				time = (milliseconds: number) => {
					const seconds = Math.floor(milliseconds / 1000),
						minutes = Math.floor(seconds / 60);
					return "Inbound T-" + (minutes < 10 ? "0" : "") + minutes +":" + (seconds < 10 ? "0" : "") + seconds
				}
				element.textContent = time(current)
				this.$el.style.setProperty("--time", timing-1000+"ms");
				const timer = setInterval(()=>{
					// This section emulates how stratagems are called in in-game. So when you copy the text, it's like you're calling in the stratagem.
					if (element) { // MUST check if element exists. Users can search, and Alpine will delete/add elements.
						current = current - 1000;
						element.textContent = time(current);
						if (current < 0) {
							element.textContent = "Impact";
						}
					}
				},1000)
				setTimeout(() => {
					if (this.$el) { // MUST check if element exists. Users can search, and Alpine will delete/add elements.
						this.$el.classList.remove("fadein")
						this.$el.classList.add("fadeout")
						setTimeout(()=>{
							if (this.$el) { // MUST check if element exists. Users can search, and Alpine will delete/add elements.
								this.$el.classList.remove("fadeout", "copy")
								element.textContent = element.dataset.original
							}
							clearInterval(timer);
						},250)
					}
				}, timing - 250);
			}).catch(error=>{
				this.$el.classList.add("failed","copy","fadein")
				console.error(error)
				// If we can't copy to clipboard, we should make the text selected, so the user can CTRL + C
				this.$el.setAttribute("contenteditable", "true")
				const range = document.createRange();
				range.selectNodeContents(this.$el.querySelector("code"));
				const selection = window.getSelection();
				selection?.removeAllRanges();
				selection?.addRange(range);
				setTimeout(()=>{
					if (this.$el) {
						this.$el.classList.remove("failed", "copy","fadein")
					}
				},5000)
			})
		},
		border(type: string[]) {
			if (type.includes("weapon") || type.includes("backpack") || type.includes("vehicle")) return "#2288a7"
			if (type.includes("mission")) return "#c9b269" // We want mission before eagle, as "eagle rearm" has both, but is mission coloured.
			if (type.includes("orbital") || type.includes("eagle")) return "#ba2f23"
			if (type.includes("defense")) return "#326021"
		}
	}
})
Alpine.start()

// If you add a period to a `class` HTML attribute, and can't figure out why your styles aren't applying, this will fix that.
document.querySelectorAll("*").forEach(element=>{
	element.classList.forEach(className => {
		if (className[0] == ".") element.classList.replace(className, className.slice(1))
	})
})
