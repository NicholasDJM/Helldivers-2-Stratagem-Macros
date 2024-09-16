import Alpine from "alpinejs";
globalThis.Alpine = Alpine;
import Fuse from "fuse.js";
import { stratagems } from "./stratagems.js";

const fuse = new Fuse(stratagems, {
	keys: ["key", "type"],
	threshold: 0.4,
});
Alpine.data("tools", () => ({
	search() {
		this.$el.scrollIntoView(true);
		if (this.$data.input) return fuse.search(this.$data.input);
		return stratagems.map((item, refIndex) => ({ item, refIndex }));
		// TODO: Remove stratagems import, and collect stratagems from HTML instead (data is generated at build step)
	},
	copyStratagem() {
		// TODO: I should rewrite this to use bubbling.
		const timing = 7000; // Minimum 2000
		navigator.clipboard
			.writeText('"' + this.$el.dataset.key + '"')
			.then(() => {
				this.$el.classList.add("copy", "fadein");
				let current = timing - 2000;
				const element = this.$el.querySelector("code"),
					time = (milliseconds: number) => {
						const seconds = Math.floor(milliseconds / 1000),
							minutes = Math.floor(seconds / 60);
						return (
							"Inbound T-" +
							(minutes < 10 ? "0" : "") +
							minutes +
							":" +
							(seconds < 10 ? "0" : "") +
							seconds
						);
					};
				element.textContent = time(current);
				this.$el.style.setProperty("--time", timing - 1000 + "ms");
				const timer = setInterval(() => {
					// This section emulates how stratagems are called in in-game. So when you copy the text, it's like you're calling in the stratagem.
					if (element) {
						// MUST check if element exists. Users can search, and Alpine will delete/add elements.
						current = current - 1000;
						element.textContent = time(current);
						if (current < 0) {
							element.textContent = "Impact";
						}
					}
				}, 1000);
				setTimeout(() => {
					if (this.$el) {
						// MUST check if element exists. Users can search, and Alpine will delete/add elements.
						this.$el.classList.remove("fadein");
						this.$el.classList.add("fadeout");
						setTimeout(() => {
							if (this.$el) {
								// MUST check if element exists. Users can search, and Alpine will delete/add elements.
								this.$el.classList.remove("fadeout", "copy");
								element.textContent = this.$el.dataset.key;
							}
							clearInterval(timer);
						}, 250);
					}
				}, timing - 250);
			})
			.catch((error) => {
				// If we can't copy to clipboard, we should make the text selected, so the user can CTRL + C
				console.error(error);
				this.$el.classList.add("failed", "copy", "fadein");
				this.$el.setAttribute("contenteditable", "true");
				const range = document.createRange();
				range.selectNodeContents(this.$el.querySelector("code"));
				const selection = window.getSelection();
				selection?.removeAllRanges();
				selection?.addRange(range);
				setTimeout(() => {
					if (this.$el) {
						this.$el.classList.remove("failed", "copy", "fadein");
					}
				}, 5000);
			});
	},
	border(type: string[]) {
		// TODO Move colours to CSS, and apply classes instead of using CSS variables.
		// biome-ignore format: No, stop that. Code is already pretty.
		for (const t of type) switch (t) {
			case "weapon":
			case "backpack":
			case "vehicle":
				return "#2288a7";
			case "mission":
				// We want mission before eagle, as "eagle rearm" has both, but is mission coloured.
				return "#c9b269";
			case "orbital":
			case "eagle":
				return "#ba2f23";
			case "defense":
				return "#326021";
		}
	},
}));

Alpine.start();

// If you add a period to a `class` HTML attribute, and can't figure out why your styles aren't applying, this will fix that.
// Example: `<div class=".red">` to `<div class="red">`
document.querySelectorAll("*").forEach((element) => {
	element.classList.forEach((className) => {
		if (className[0] === ".")
			element.classList.replace(className, className.slice(1));
	});
});
