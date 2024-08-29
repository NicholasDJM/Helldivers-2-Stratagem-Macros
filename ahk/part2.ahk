

options := Map()
options["timing"] := 150
options["secondaryTiming"] := 10
options["steamPath"] := "C:\Program Files (x86)\Steam"
options["updates"] := true
options["audio"] := 5000


try Loop Read "./options.toml" {
	if (RegExMatch(A_LoopReadLine, "^delay\s*=\s*\d+\s*(#.*)?$")) {
		options["timing"] := RegExReplace(RegExReplace(A_LoopReadLine, "^delay\s*=\s*", ""), "\s*#.*$")
	}
	if (RegExMatch(A_LoopReadLine, "^holdDelay\s*=\s*\d+\s*(#.*)?$")) {
		options["secondaryTiming"] := RegExReplace(RegExReplace(A_LoopReadLine, "^holdDelay\s*=\s*", ""), "\s*#.*$")
	}
	if (RegExMatch(A_LoopReadLine, "^steamPath\s*=\s*(`"[a-zA-Z]:\\.+`"|'[a-zA-Z]:\\.+')\s*(#.*)?$")) {
		; Remember, in AutoHotkey, quotation marks must be escaped with a backtick.
		options["steamPath"] := RegExReplace(
				RegExReplace(
					RegExReplace(A_LoopReadLine, "steamPath\s*=\s*"),
				"^[`"']"),
			"[`"']\s*(#.*)?$")
	}
	if (RegExMatch(A_LoopReadLine, "^updates\s*=\s*false\s*(#.*)?$")) {
		options["updates"] := false
	}
	if (RegExMatch(A_LoopReadLine, "^audio\s*=\s*\d+\s*(#.*)?$")) {
		options["audio"] := RegExReplace(RegExReplace(A_LoopReadLine, "^audio\s*=\s*", ""), "\s*#.*$")
	}
}



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
			case "delay":
				options["timing"] := split[2]
			case "holdDelay":
				options["secondaryTiming"] := split[2]
			case "path":
				options["steamPath"] := RegExReplace(RegExReplace(split[2], "^[`"']"), "[`"']$")
				; This doesn't work. Strings don't have a length property.
				;if (options["steamPath"][options["steamPath"].Length] = "\") { ; Remove trailing backslash.
					;options["steamPath"] := SubStr(options["steamPath"], 1 options["steamPath"].Length - 1)
				;}
			case "updates":
				options["updates"] := split[2] = "true" ? true : false
			case "audio":
				options["audio"] := split[2]
			default:
				TrayTip("`"" . split[1] . "`" is not a valid flag.", appname, TrayEnums["Error"] + TrayEnums["LargeIcon"])
		}
	} else {
		; Otherwise, we can assume it's a Stragaem name or command.
		if (A_Args[A_Index] = "update macros") {
			goto update
		}
		if (A_Args[A_Index] = "generate options.toml") {
			goto genOptions
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

try {
; We must only read a file once! It's very expensive time wise to read a file, and the player expects the action to be immediate.
Loop Read inputfile{
	loopindex := loopindex + 1
	if (state = "findstratagem" && A_LoopReadLine = "Stratagem = {"){
		state := "stratagem"
	} else {
		if (!key_found_up && A_LoopReadLine = "`tUp = ["){
			state := "findup"
		}
		if (!key_found_down && A_LoopReadLine = "`tDown = ["){
			state := "finddown"
		}
		if (!key_found_left && A_LoopReadLine = "`tLeft = ["){
			state := "findleft"
		}
		if (!key_found_right && A_LoopReadLine = "`tRight = ["){
			state := "findright"
		}
		if (!key_found_menu && A_LoopReadLine = "`tStart = ["){
			state := "findmenu"
		}
	}


	if (!key_found_up && state = "findup" && (A_LoopReadLine = "`t`t`tdevice_type = `"Keyboard`"" || A_LoopReadLine = "`t`t`tdevice_type = `"Mouse`"") ){
		state := "up"
		key_found_up := true
	} else if (!key_found_down && state = "finddown" && (A_LoopReadLine = "`t`t`tdevice_type = `"Keyboard`"" || A_LoopReadLine = "`t`t`tdevice_type = `"Mouse`"")){
		state := "down"
		key_found_down := true
	} else if (!key_found_left && state = "findleft" && (A_LoopReadLine = "`t`t`tdevice_type = `"Keyboard`"" || A_LoopReadLine = "`t`t`tdevice_type = `"Mouse`"")){
		state := "left"
		key_found_left := true
	}else if (!key_found_right && state = "findright" && (A_LoopReadLine = "`t`t`tdevice_type = `"Keyboard`"" ||  A_LoopReadLine = "`t`t`tdevice_type = `"Mouse`"")){
		state := "right"
		key_found_right := true
	}else if (!key_found_menu && state = "findmenu" && (A_LoopReadLine = "`t`t`tdevice_type = `"Keyboard`"" ||  A_LoopReadLine = "`t`t`tdevice_type = `"Mouse`"")){
		state := "menu"
		key_found_menu := true
		Switch (lastLine){
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
	if (state = "up" || state = "down" || state = "right" || state = "left" || state = "menu"){

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
} catch {
	MsgBox("Steam path is incorrect. Are you sure Steam is installed at " . options["steamPath"] . "? " . appname . " will now quit.", appname, MsgBoxEnums["Error"] + MsgBoxEnums["OK"])
	ExitApp(1)
}

if (!keys.Has("up")){
	keys["up"] := "w"
}
if (!keys.Has("down")){
	keys["down"] := "s"
}
if (!keys.Has("left")){
	keys["left"] := "a"
}
if (!keys.Has("right")){
	keys["right"] := "d"
}
if (!keys.Has("menu")){
	keys["menu"] := "ctrl"
	key_menu_type := "hold"
}




KeyDownUp(key, timing) {
	Send("{" . key . " Down}")
	Sleep(timing)
	Send("{" . key . " Up}")
}



Stratagem(code) {
	if (WinActive("HELLDIVERS™ 2")) {
		playing := false
		if (FileExist(options["stratagem"] . ".wav")) {
			playing := true
			try SoundPlay(options["stratagem"] . ".wav")
		} else if (FileExist(options["stratagem"] . ".mp3")) {
			playing := true
			try SoundPlay(options["stratagem"] . ".mp3")
		}
		switch (key_menu_type) {
			case "hold":
				Send("{" . keys["menu"] . " DOWN}")
			case "doubletap":
				KeyDownUp(keys["menu"], options["secondaryTiming"])
				Sleep(options["secondaryTiming"])
				KeyDownUp(keys["menu"], options["secondaryTiming"])
			case "longpress":
				KeyDownUp(keys["menu"], 500)
			default:
				KeyDownUp(keys["menu"], 10)
		}
		Sleep(options["timing"])
		for index, value in code {
			if (keys.Has(value)) {
				KeyDownUp(keys[value], options["secondaryTiming"])
			} else {
				TrayTip("Incorrect direction for Stratagem.`nPlayers: Contact support at github.com/NicholasDJM/Helldivers-2-Stratagem-Macros.`nDevs: Check your code.",appname, TrayEnums["Error"]+TrayEnums["LargeIcon"])
				Sleep(5000)
				; Notifications will immediately go away as soon as we display them if we don't sleep (if the script exits immediately).
				ExitApp
			}
			Sleep(options["timing"])
		}
		Send("{" . keys["menu"] . " UP}")
		if (playing) {
			Sleep(options["audio"])
			; If we're playing audio, we need delay the script exiting so the audio can finish playing. By default, it's 5000 milliseconds.
		}
	} else {
		TrayTip("Helldivers 2 is not in focus.",appname, TrayEnums["Error"]+TrayEnums["LargeIcon"])
		Sleep(5000)
		ExitApp
	}
}

userinput := StrLower(options["stratagem"])
; Change all characters to lower case.
userinput := StrReplace(userinput, "-", A_Space)
; Replace dashes with spaces. Things like Anti-Material Rifle have dashes in their names, but we want just letters and spaces.
userinput := StrReplace(userinput, "recoiless rifle", "recoilless rifle")
; Recoilless Rifle has two Ls. I mix this up all the time, so rather than telling the user "too bad!", we just fix it.
userinput := StrReplace(userinput, "anti personal minefield", "anti personnel minefield")
; Ditto

Switch userinput {
