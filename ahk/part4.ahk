
)"

try {
	FileDelete("./help.html")
}
try {
	FileEncoding("UTF-8")
	FileAppend(html, "./help.html")
	Run("help.html")
}

ExitApp