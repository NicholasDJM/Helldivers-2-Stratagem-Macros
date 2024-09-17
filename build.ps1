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

function Invoke-Language {
	param (
		[string]$language
	)
	Process {
		$env:LANG = "$language.UTF-8"

		Invoke-Script -command "deno run -A prebuild.js" -message "Failed to run pre-build script." -location .\help

		Invoke-Script -command "pnpm build" -message "Failed to build HTML." -location .\help
		
		Invoke-Script -command "deno run -A postbuild.js" -message "Failed to run post-build script." -location .\help

		Invoke-Script -command "deno run -A .\build.js" -message "Failed to build AutoHotkey script." -location .\src
		# TODO: Merge md/build.mjs and src/build.js
		
		Invoke-Script -command "tar.exe -czf '.\dist\Helldivers 2 Macros.$language.ahk.tar.gz' '.\dist\Helldivers 2 Macros.language.ahk'" -message "Failed to compress script."
	}
}

# Contributers: Update this section to add more languages.
Invoke-Language -language "en-CA"

Write-Output "[32mBuild Complete[0m"

# While I could use the `e escape code for the escape character, it won't show up in CMD.exe. So I'm using the literal escape character in this script.