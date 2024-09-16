#Requires AutoHotkey >=2.0
SendMode "Event"
SetWorkingDir A_ScriptDir
macro(stratagem) {
	if (WinActive("HELLDIVERS™ 2")) {
		try {
			Run('"Helldivers 2 Macros.ahk" "' . stratagem . '"')
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
H:: {
	macro("hellbomb")
}