Set-Location $PSScriptRoot

function Invoke-Script {
	param (
		[string]$command,
		[string]$message,
		[string]$location
	)
	Process {
		Write-Host "[....] Running [33m$command[0m" -NoNewLine
		if ($location -ne "") {
			Push-Location $location
			Write-Host ", in $location" -NoNewLine
		} else {
			Write-Host ", in current directory." -NoNewline
		}
		Invoke-Expression "$command" >$null 2>&1 # Hide the output so we can apply fancy linux startup-esque done or fail status messages.	
		if ($LASTEXITCODE -ne 0) {
			Write-Output "`r[[31mFail[0m]"
			Invoke-Expression "$command" # If there's error messages, we need to run the command again, with output enabled.
			Write-Output "[41m ERROR [0m [31m$message[0m"
			if ($location -ne "") {
				Pop-Location
			}
			Exit 1
		}
		Write-Output "`r[[32mDone[0m]"
		if ($location -ne "") {
			Pop-Location
		}
	}
}

if ([System.IO.File]::Exists(".\dist\updates.txt")) {
	Write-Host "Clearing updates.txt..."
	Remove-Item ".\dist\updates.txt"
}

function Invoke-Language {
	param (
		[string]$language
	)
	Process {
		$env:LANG = "$language.UTF-8"

		Invoke-Script -command "deno run -A prebuild.mjs" -message "Failed to run pre-build script." -location .\src

		Invoke-Script -command "pnpm build" -message "Failed to build HTML." -location .\help
		
		Invoke-Script -command "node postbuild.mjs" -message "Failed to run post-build script." -location .\src

		Invoke-Script -command "deno run -A .\build.mjs" -message "Failed to build AutoHotkey script." -location .\src
		
		Invoke-Script -command "tar.exe -czf '.\Helldivers 2 Macros.$language.ahk.tar.gz' '.\Helldivers 2 Macros.$language.ahk'" -message "Failed to compress script." -location ".\dist"
	}
}

# Contributers: Update this section to add more languages.
Invoke-Language -language "en-CA"
Invoke-Language -language "fr-CA"

Write-Output "[32mBuild Complete[0m"

# While I could use the `e escape code for the escape character, it won't show up in CMD.exe. So I'm using the literal escape character in this script.