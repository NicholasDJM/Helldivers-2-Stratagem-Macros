
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

if (options["updates"] = false) {
	ExitApp
}

releaseType := RegExMatch(A_ScriptName, "\.exe$") > 0 ? "exe" : "ahk" ; Which release should we target? The script, or the executable?
fileLocation := releaseType = "exe" ? 
	"https://raw.githubusercontent.com/NicholasDJM/Helldivers-2-Stratagem-Macros/main/Helldivers 2 Macros.ahk.tar.gz"
  : "https://github.com/NicholasDJM/Helldivers-2-Stratagem-Macros/releases/download/v" . version . "/Helldivers 2 Macros.exe"

try {
	Download("https://raw.githubusercontent.com/NicholasDJM/Helldivers-2-Stratagem-Macros/main/version.txt", "./version.txt")
	try {
		new := FileRead("./version.txt")
		if (Number(new) > version) {
			try {
				Download(fileLocation, A_ScriptName . ".tar.gz")
				RunWait("tar.exe -xzf 'Helldivers 2 Macros.ahk.tar.gz'")
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


genOptions:

if (!FileExist("./optionas.toml")) {
	FileAppend("
(
delay = 150 # Default 150
holdDelay = 10 # Default 10
steamPath = "C:\Program Files (x86)\Steam" # Default "C:\Program Files (x86)\Steam"
updates = true # Default is true
)", "options.toml")
} else {
	MsgBox("Cannot generate options file, file already exists.", appname, MsgBoxEnums["Error"])
}

ExitApp


help:

html := "
(
