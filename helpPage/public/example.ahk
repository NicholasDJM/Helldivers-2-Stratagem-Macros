#Requires AutoHotkey >=2.0
SendMode "Event"
SetWorkingDir A_ScriptDir
title := "HELLDIVERS™ 2"
XButton1:: { ; Mouse Browser Back button
	if (winActive(title)) {
		try {
			Run('"Helldivers 2 Macros.ahk" "Recoilless Rifle"')
		} catch {
			TrayTip("Could not run Helldivers 2 Macros script.")
		}
	}
}
XButton2:: { ; Mouse Browser Forward button
	if (winActive(title)) {
		try {
			Run('"Helldivers 2 Macros.ahk" "Patriot Exosuit"')
		} catch {
			TrayTip("Could not run Helldivers 2 Macros script.")
		}
	}
}