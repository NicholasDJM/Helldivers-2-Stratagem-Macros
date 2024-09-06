
)"

try {
	FileDelete("./help.html")
}
try {
	FileEncoding("UTF-8")
	try FileAppend(html, "./help.html")
	try Run("help.html")
}

ExitApp