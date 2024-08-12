

options := Map()
; DO NOT EDIT ANYTHING ABOVE



; Macros for every Stratagem in Helldivers 2, up to version 1.001.002.
; Script designed to be called from other AutoHotKey scripts or from a Stream Deck.

; Call this script with a string argument of the name of the stratagem you want, as seen in game, in English, surrounded in quotation marks.
; For example `Helldivers 2 Macro.ahk "Recoilless Rifle"`
; You can also adjust the timing of each keypress, with a number at the end.
; For example `Helldivers 2 Macro.ahk "Recoilless Rifle" 250`

; You can modify these to change the defaults.
options["timing"] := 150 ; This is the timing between different keystrokes.
options["secondaryTiming"] := 10 ; This is the timing between the key up and key down events of a single keystroke.
options["steamPath"] := "C:\Program Files (x86)\Steam"

; DO NOT EDIT ANYTHING BELOW

options["stratagem"] := "initial"

appname := "Helldivers 2 Macros"


MsgBoxEnums := Map()
MsgBoxEnums["OK"] := 0
MsgBoxEnums["OKCancel"] := 1
MsgBoxEnums["AbortRetryIgnore"] := 2
MsgBoxEnums["YesNoCancel"] := 3
MsgBoxEnums["YesNo"] := 4
MsgBoxEnums["RetryCancel"] := 5
MsgBoxEnums["CancelTryAgainContinue"] := 6
MsgBoxEnums["Stop"] := 16
MsgBoxEnums["Error"] := 16
MsgBoxEnums["Question"] := 32
MsgBoxEnums["Exclamation"] := 48
MsgBoxEnums["Info"] := 64


TrayEnums := Map()
TrayEnums["NoIcon"] := 0
TrayEnums["Info"] := 1
TrayEnums["Warning"] := 2
TrayEnums["Error"] := 3
TrayEnums["TrayIcon"] := 4
TrayEnums["Mute"] := 16
TrayEnums["LargeIcon"] := 32




if (A_Args.Length = 0) {
	goto help
}

Loop A_Args.Length {
	split := StrSplit(A_Args[A_Index], "=")
	if split.Length > 1 {
		; If argument has an = sign, it's a flag
		switch split[1] {
			case "timing":
				options["timing"] = split[2]
			case "secondarytiming":
				options["secondaryTiming"] = split[2]
			case "path":
				options["steamPath"] = split[2]
				if (options["steamPath"][options["steamPath"].Length] = "\") { ; Remove trailing backslash.
					options["steamPath"] = SubStr(options["steamPath"], 1 options["steamPath"].Length - 1)
				}
		}
	} else {
		; Otherwise, we can assume it's a Stragaem name or command.
		if (A_Args[A_Index] = "update macros") {
			goto update
		}
		options["stratagem"] := A_Args[A_Index]
	}
}

keys := Map()


SteamID := RegRead("HKCU\SOFTWARE\Valve\Steam\ActiveProcess", "ActiveUser")

; TODO WARNING! We must translate every possible key to AutoHotKey's key names.
; What are the key names that Helldivers 2 uses?

; Translates Helldivers 2's key names to AutoHotKey's key names.
Translate(key) {
	switch key {
		case "MouseButton1":
			return "LButton"
		case "MouseButton2":
			return "RButton"
		case "MouseButton3":
			return "MButton"
		case "MouseButton4":
			return "XButton1"
		case "MouseButton5":
			return "XButton2"
		default:
			return key
	}
}

state := "findstratagem"

inputfile := options["steamPath"] . "\userdata\" . SteamID . "\553850\remote\input_settings.config"

key_found_up := false
key_found_down := false
key_found_left := false
key_found_right := false
key_found_menu := false
key_menu_type := "unknown"

loopindex := 0
lastLine := ""

; We must only read a file once! It's very expensive time wise to read a file, and the player expects the action to be immediate.
Loop Read inputfile
{
	loopindex := loopindex + 1
	if (state = "findstratagem" && A_LoopReadLine = "Stratagem = {")
	{
		state := "stratagem"
	} else {
		if (!key_found_up && A_LoopReadLine = "`tUp = [")
		{
			state := "findup"
		}
		if (!key_found_down && A_LoopReadLine = "`tDown = [")
		{
			state := "finddown"
		}
		if (!key_found_left && A_LoopReadLine = "`tLeft = [")
		{
			state := "findleft"
		}
		if (!key_found_right && A_LoopReadLine = "`tRight = [")
		{
			state := "findright"
		}
		if (!key_found_menu && A_LoopReadLine = "`tStart = [")
		{
			state := "findmenu"
		}
	}


	if (!key_found_up && state = "findup" && (A_LoopReadLine = "`t`t`tdevice_type = `"Keyboard`"" || A_LoopReadLine = "`t`t`tdevice_type = `"Mouse`"") )
	{
		state := "up"
		key_found_up := true
	}
	else if (!key_found_down && state = "finddown" && (A_LoopReadLine = "`t`t`tdevice_type = `"Keyboard`"" || A_LoopReadLine = "`t`t`tdevice_type = `"Mouse`""))
	{
		state := "down"
		key_found_down := true
	}
	else if (!key_found_left && state = "findleft" && (A_LoopReadLine = "`t`t`tdevice_type = `"Keyboard`"" || A_LoopReadLine = "`t`t`tdevice_type = `"Mouse`""))
	{
		state := "left"
		key_found_left := true
	}
	else if (!key_found_right && state = "findright" && (A_LoopReadLine = "`t`t`tdevice_type = `"Keyboard`"" ||  A_LoopReadLine = "`t`t`tdevice_type = `"Mouse`""))
	{
		state := "right"
		key_found_right := true
	}
	else if (!key_found_menu && state = "findmenu" && (A_LoopReadLine = "`t`t`tdevice_type = `"Keyboard`"" ||  A_LoopReadLine = "`t`t`tdevice_type = `"Mouse`""))
	{
		state := "menu"
		key_found_menu := true
		Switch (lastLine)
		{
			Case "`t`t`ttrigger = `"Press`"":
				key_menu_type := "press"

			Case "`t`t`ttrigger = `"Tap`"":
				key_menu_type := "tap"

			Case "`t`t`ttrigger = `"DoubleTap`"":
				key_menu_type := "doubletap"

			Case "`t`t`ttrigger = `"LongPress`"":
				key_menu_type := "longpress"

			Case "`t`t`ttrigger = `"Hold`"":
				key_menu_type := "hold"
		}
	}
	if (state = "up" || state = "down" || state = "right" || state = "left" || state = "menu")
	{

		SplitA := StrSplit(A_LoopReadLine, "=")
		SplitB := StrSplit(A_LoopReadLine, "=", " `"")
		if (SplitA[1] = "`t`t`tinput ")
		{
			key := SplitB[2]
			keys[state] := Translate(key)
			state := "stratagem"
		}
	}
	lastLine := A_LoopReadLine
}

if (!keys.Has("up"))
{
	keys["up"] := "w"
}
if (!keys.Has("down"))
{
	keys["down"] := "s"
}
if (!keys.Has("left"))
{
	keys["left"] := "a"
}
if (!keys.Has("right"))
{
	keys["right"] := "d"
}
if (!keys.Has("menu"))
{
	keys["menu"] := "ctrl"
	key_menu_type := "hold"
}








Stratagem(code) {
	title := "HELLDIVERS™ 2"
	
	if (WinActive(title)) {
		switch (key_menu_type) {
			case "hold":
				Send("{" . keys["menu"] . " DOWN}")
				
			case "doubletap":
				Send("{" . keys["menu"] . " DOWN}")
				Sleep(options["secondarytiming"])
				Send("{" . keys["menu"] . " UP}")
				Sleep(options["secondarytiming"])
				Send("{" . keys["menu"] . " DOWN}")
				Sleep(options["secondarytiming"])
				Send("{" . keys["menu"] . " UP}")
				
			case "longpress":
				Send("{" . keys["menu"] . " DOWN}")
				Sleep(500)
				Send("{" . keys["menu"] . " UP}")
				Sleep(options("timing"))
				
			default:
				Send("{" . keys["menu"] . " DOWN}")
				Sleep(10)
				Send("{" . keys["menu"] . " UP}")
		}
		Sleep(options["timing"])

		for index, value in code {
				if (value = "up") {
					Send("{" . keys["up"] . " Down}")
					Sleep(options["secondarytiming"])
					Send("{" . keys["up"] . " Up}")
				}
				else if (value = "left") {
					Send("{" . keys["left"] . " Down}")
					Sleep(options["secondarytiming"])
					Send("{" . keys["left"] . " Up}")
				}
				else if (value = "right") {
					Send("{" . keys["right"] . " Down}")
					Sleep(options["secondarytiming"])
					Send("{" . keys["right"] . " Up}")
				}
				else if (value = "down") {
					Send("{" . keys["down"] . " Down}")
					Sleep(options["secondarytiming"])
					Send("{" . keys["down"] . " Up}")
				} else {
					TrayTip("Incorrect direction for Stratagem.`nPlayers: Contact support at github.com/NicholasDJM/Helldivers-2-Stratagem-Macros.`nDevs: Check your code.",appname, TrayEnums["Error"]+TrayEnums["LargeIcon"])
					Sleep(5000) ; Notifications will immediately go away as soon as we display them if we don't sleep (if the script exits immediately).
					ExitApp
				}
			Sleep(options["timing"])
		}
	} else {
		TrayTip("Helldivers 2 is not in focus.",appname, TrayEnums["Error"]+TrayEnums["LargeIcon"])
		Sleep(5000)
		ExitApp
	}
	if (key_menu_type = "hold" && WinActive(title)) {
		Send("{" . keys["menu"] . " UP}")
	}
}

userinput := StrLower(options["stratagem"]) ; Change all characters to lower case.
userinput := StrReplace(userinput, "-", A_Space) ; Replace dashes with spaces. Things like Anti-Material Rifle have dashes in their names, but we want just letters and spaces.
userinput := StrReplace(userinput, "recoiless rifle", "recoilless rifle") ; Recoilless Rifle has two Ls. I mix this up all the time, so rather than telling the user "too bad!", we just fix it.

Switch userinput {

Case "machine gun":
	Stratagem(["down","left","down","up","right"])

Case "anti material rifle":
	Stratagem(["down","left","right","up","down"])

Case "stalwart":
	Stratagem(["down","left","down","up","up","left"])

Case "expendable anti tank":
	Stratagem(["down","down","left","up","right"])

Case "recoilless rifle":
	Stratagem(["down","left","right","right","left"])

Case "flamethrower":
	Stratagem(["down","left","up","down","up"])

Case "autocannon":
	Stratagem(["down","left","down","up","up","right"])

Case "heavy machine gun":
	Stratagem(["down","left","up","down","down"])

Case "airburst rocket launcher":
	Stratagem(["down","up","up","left","right"])

Case "commando":
	Stratagem(["down","left","up","down","right"])

Case "railgun":
	Stratagem(["down","right","down","up","left","right"])

Case "spear":
	Stratagem(["down","down","up","down","down"])

Case "grenade launcher":
	Stratagem(["down","left","up","left","down"])

Case "laser cannon":
	Stratagem(["down","left","down","up","left"])

Case "arc thrower":
	Stratagem(["down","left","down","up","left","left"])

Case "quasar cannon":
	Stratagem(["down","down","up","left","right"])

Case "orbital gatling barrage":
	Stratagem(["right","down","left","up","up"])

Case "orbital airburst strike":
	Stratagem(["right","right","right"])

Case "orbital 120mm he barrage":
	Stratagem(["right","right","down","left","right","down"])

Case "orbital 380mm he barrage":
	Stratagem(["right","down","up","up","left","down","down"])

Case "orbital walking barrage":
	Stratagem(["right","down","right","down","right","down"])

Case "orbital laser":
	Stratagem(["right","down","up","right","down"])

Case "orbital railcannon strike":
	Stratagem(["right","up","down","down","right"])

Case "orbital precision strike":
	Stratagem(["right","right","down"])

Case "orbital gas strike":
	Stratagem(["right","right","down","right"])

Case "orbital ems strike":
	Stratagem(["right","right","left","down"])

Case "orbital smoke strike":
	Stratagem(["right","right","down","up"])

Case "eagle strafing run":
	Stratagem(["up","right","right"])

Case "eagle airstrike":
	Stratagem(["up","right","down","right"])

Case "eagle cluster bomb":
	Stratagem(["up","right","down","down","right"])

Case "eagle napalm strike":
	Stratagem(["up","right","down","up"])

Case "eagle smoke strike":
	Stratagem(["up","right","up","down"])

Case "eagle 110mm rocket pods":
	Stratagem(["up","right","up","left"])

Case "eagle 500kg bomb":
	Stratagem(["up","right","down","down","down"])

Case "jump pack":
	Stratagem(["down","up","up","down","up"])

Case "supply pack":
	Stratagem(["down","left","down","up","up","down"])

Case "guard dog rover":
	Stratagem(["down","up","left","up","right","right"])

Case "guard dog":
	Stratagem(["down","up","left","up","right","down"])

Case "ballistic shield backpack":
	Stratagem(["down","left","down","down","up","left"])

Case "shield generator pack":
	Stratagem(["down","up","left","right","left","right"])

Case "hmg emplacement":
	Stratagem(["down","up","left","right","right","left"])

Case "shield generator relay":
	Stratagem(["down","down","left","right","left","right"])

Case "tesla tower":
	Stratagem(["down","up","right","up","left","right"])

Case "anti personal minefield":
	Stratagem(["down","left","up","right"])

Case "incendiary mines":
	Stratagem(["down","left","left","down"])

Case "machine gun sentry":
	Stratagem(["down","up","right","right","up"])

Case "gatling sentry":
	Stratagem(["down","up","right","left"])

Case "mortar sentry":
	Stratagem(["down","up","right","right","down"])

Case "autocannon sentry":
	Stratagem(["down","up","right","up","left","up"])

Case "rocket sentry":
	Stratagem(["down","up","right","right","left"])

Case "ems mortar sentry":
	Stratagem(["down","up","right","down","right"])

Case "patriot exosuit":
	Stratagem(["left","down","right","up","left","down","down"])

Case "emancipator exosuit":
	Stratagem(["left","down","right","up","left","down","up"])

Case "reinforce":
	Stratagem(["up","down","right","left","up"])

Case "sos beacon":
	Stratagem(["up","down","right","up"])

Case "resupply":
	Stratagem(["down","down","up","right"])

Case "eagle rearm":
	Stratagem(["up","up","left","up","right"])

Case "SSSD delivery":
	Stratagem(["down","down","down","up","up"])

Case "prospecting drill":
	Stratagem(["down","down","left","right","down","down"])

Case "super earth flag":
	Stratagem(["up","down","up","down"])

Case "hellbomb":
	Stratagem(["down","up","left","down","up","right","down","up"])

Case "upload data":
	Stratagem(["left","right","up","up","up"])

Case "seismic probe":
	Stratagem(["up","up","left","right","down","down"])

Case "orbital illumination flare":
	Stratagem(["right","right","left","left"])

Case "SEAF Artillery":
	Stratagem(["right","up","up","down"])

Case "dark fluid vessel":
	Stratagem(["up","left","right","down","up","up"])

Case "tectonic drill":
	Stratagem(["up","down","up","down","up","down"])

Case "hive breaker drill":
	Stratagem(["left","up","down","right","down","down"])

Case "anti tank mines":
	Stratagem(["down","left","up","up"])

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
