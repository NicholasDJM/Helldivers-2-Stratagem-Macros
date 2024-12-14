import Alpine from "alpinejs";
globalThis.Alpine = Alpine;
import Fuse from "fuse.js";

document.addEventListener("alpine:init", () => {
	const stratagems: Stratagem[] = [];
	document
		.querySelectorAll<HTMLLIElement>("li[data-selector='stratagem']")
		.forEach((element, i) => {
			/*
				Initially, I used the data from stratagems.js directly, but that required to end-user to have JavaScript enabled for the data to be rendered.
				Now, we generate the HTML in pre-build, and then collect the data here from the generated HTML when the page loads.
				Basically, the full list of Stratagems is always available, and then we add search functionality. Progressive enhancement!
			*/
			let image: undefined | string = undefined;
			const imageEl = element.querySelector("img");
			if (imageEl) {
				image = imageEl.getAttribute("src") || "";
			}
			if (
				element.dataset.key &&
				element.dataset.types &&
				element.dataset.code
			) {
				stratagems[i] = {
					key: element.dataset.key,
					type: JSON.parse(element.dataset.types),
					code: JSON.parse(element.dataset.code),
					displayName: element.dataset.display,
					icon: image,
				};
			}
		});
	const fuse = new Fuse(stratagems, {
		keys: ["key", "type"],
		threshold: 0.4,
	});
	Alpine.data("tools", () => ({
		search() {
			// TODO: Rebuild this to reconstruct data. This no longer works with the new list.
			// It was fine when we were using Alpine to construct the list, but now we need to construct it here.
			if (this.$data.input) return fuse.search(this.$data.input);
			return stratagems.map((item, refIndex) => ({ item, refIndex }));
		},
		bubbleCopy(event: Event) {
			const t = event.target as Element,
				button = t?.closest("button");
			console.log(button);
			if (button) {
				const span = button.querySelector(".stratagemName"),
					arrows = button.querySelector(".stratagemArrows > .arrows");
				if (arrows) {
					arrows.classList.add("countdown");
					t.addEventListener(
						"animationend",
						() => {
							if (arrows) {
								arrows.classList.remove("countdown");
							}
						},
						{ once: true },
					);
				}
				navigator.clipboard
					.writeText(span?.textContent || "")
					.catch((reason) => console.error(reason));
			}
		},
		buttonWrap() {
			// TODO: Undo PicoCSS' styles for buttons.
			const list = this.$el;
			list.querySelectorAll("li").forEach((element) => {
				const button = document.createElement("button");
				while (element.firstChild) {
					button.append(element.firstChild);
				}
				element.append(button);
			});
		},
	}));
});

Alpine.start();

// If you add a period to a `class` HTML attribute, and can't figure out why your styles aren't applying, this will fix that.
// Example: `<div class=".red">` to `<div class="red">`
document.querySelectorAll("*").forEach((element) => {
	element.classList.forEach((className) => {
		if (className[0] === ".")
			element.classList.replace(className, className.slice(1));
	});
});
// TODO: This should be moved to the build step, maybe using PostHTML?
