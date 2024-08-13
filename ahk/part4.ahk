
)"


try {
	FileDelete("./help.html")
	FileEncoding("UTF-8")
	FileAppend(html, "./help.html")
	Run("help.html")
}

ExitApp