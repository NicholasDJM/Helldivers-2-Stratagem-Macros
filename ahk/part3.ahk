
)"


try {
	FileDelete("./help.html")
	FileEncoding("UTF-8")
	FileAppend(html, "./help.html")
	; Run('Open "file:///' . StrReplace(A_ScriptDir, "\", "/") . '/help.html"')
	Run("help.html")
}

ExitApp