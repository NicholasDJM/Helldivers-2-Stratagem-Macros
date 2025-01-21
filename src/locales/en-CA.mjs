export default {
	appname: "HELLDIVERS™ 2 Stratagem Macros",
	invalidOptions: '"Invalid `"options.toml`" file. Cannot parse file."',
	invalidFlag: '{{flag}} is not a valid flag.',
	invalidSteamPath: 'Steam path is incorrect. Are you sure Steam is installed at "{{steamPath}}"?',
	/*
		TODO: Revisit localization strategy. Should I continue with separate builds for each language? Or should I package all languages into one?
		- If packaging into one, the download size will balloon.
			CON: Current size of script as of writing is already ~300kb, and gzipped is ~100kb.
			PRO: More user-friendly. User only has to download a single file.
		- If continue with multi-package, build system is really complex.
			CON: I'm still working on the localization update, even after a week of work.
				Plus I need to keep up with the updates to Helldivers 2, thus maintaining separate branches,
				one on the old update, one on the new.
			PRO: Smaller download sizes, not wasting disk space on user's system.
		
		This whole macro script thing is gotten a lot of feature creep. So much for a tiny little niche program...
	*/
	/*
		I think I have an idea: The main .ahk script will become a language selector, which will automatically download the correct language.
		And all the other scripts will be just the old main script, but in different languages.
	*/
	
	// HTML Section: The keys below are used in ./help files.
	"helldivers-2-logo-alt": "HELLDIVERS™ 2",
	"audio-screenshot-alt-description": "Screenshot of Windows Explorer, showing five files, &quot;Helldivers 2 Macros.ahk&quot;, &quot;help.html&quot;, &quot;options.toml&quot;, &quot;recoilless rifle.mp3&quot;, and &quot;version.txt&quot;.",
	"deck-screenshot-alt-description": "Screenshot of Elgato Stream Deck software, showing BarRaider's Advanced Launcher action configured to launch &quot;Helldivers 2 Macros.ahk&quot; with an argument of &quot;recoilless rifle&quot;."
}