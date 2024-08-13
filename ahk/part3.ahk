
Default:
	TrayTip("Cannot find `"" . options["stratagem"] . "`" macro. Run the script without any arguments for instructions.",appname,TrayEnums["Error"]+TrayEnums["LargeIcon"])
	Sleep(5000)
}



try {
	Download("https://raw.githubusercontent.com/NicholasDJM/Helldivers-2-Stratagem-Macros/main/version.txt", "./version.txt")
	try {
		new:=FileRead("./version.txt")
		if (Number(new) > version) {
			TrayTip("Version " . new . " is availave.`n`nRun this script with the `"update macros`" argument to auto update.",appname, TrayEnums["Info"]+TrayEnums["LargeIcon"])
			Sleep(5000)
		}
	} catch {
		TrayTip("Could not read version file.",appname, TrayEnums["Error"]+TrayEnums["LargeIcon"])
		Sleep(5000)
	}
} catch {
	TrayTip("Could not retrieve latest version.",appname, TrayEnums["Error"]+TrayEnums["LargeIcon"])
	Sleep(5000)
}
ExitApp

update:
try {
	Download("https://raw.githubusercontent.com/NicholasDJM/Helldivers-2-Stratagem-Macros/main/version.txt", "./version.txt")
	try {
		new := FileRead("./version.txt")
		if (Number(new) > version) {
			try {
				Download("https://raw.githubusercontent.com/NicholasDJM/Helldivers-2-Stratagem-Macros/main/Helldivers 2 Macros.ahk", A_ScriptName)
			} catch error {
				MsgBox("Could not download update.",appname,MsgBoxEnums["Error"])
			}
		} else {
			MsgBox("You already have the latest version.",appname,MsgBoxEnums["Info"])
		}
	} catch {
		MsgBox("Could not read version file.",appname,MsgBoxEnums["Error"])
	}
} catch {
	MsgBox("Could not retrieve latest version.",appname,MsgBoxEnums["Error"])
}
ExitApp


help:

html := "
(
