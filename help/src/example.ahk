#Requires AutoHotkey >=2.0
SendMode "Event"
SetWorkingDir A_ScriptDir
macro(stratagem) {
	if (WinActive("HELLDIVERS™ 2")) {
		try {
			Run('"Helldivers 2 Macros.ahk" "' . stratagem . '"')
			/*
				You could add options to the end of the string.
				For example, you could set the delay between keys to 200 milliseconds:
				Run('"Helldivers 2 Macros.ahk" "' . stratagem . '" "delay=200"')
				Run "Helldivers 2 Macros.ahk" without any arguments to access the instruction manual.
			*/
		} catch {
			TrayTip("Could not run Helldivers 2 Macros script.")
		}
	}
}
XButton1:: { ; Mouse Browser Back button
	macro("recoilless rifle")
}
XButton2:: { ; Mouse Browser Forward button
	macro("patriot exosuit")
}
H:: { ; H key
	macro("hellbomb")
}