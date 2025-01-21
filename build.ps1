Set-Location $PSScriptRoot

function Invoke-Script {
	param (
		[string]$command,
		[string]$message,
		[string]$location,
		[int]$line
	)
	Process {
		$line2 = $line - 1
		Write-Host "[....] Running [33m$command[0m" -NoNewLine
		if ($location -ne "") {
			Push-Location $location
			Write-Host ", in $location" -NoNewLine
		} else {
			Write-Host ", in current directory." -NoNewline
		}
		Invoke-Expression "$command" >$null 2>&1 # Hide the output so we can apply fancy linux startup-esque done or fail status messages.	
		if ($LASTEXITCODE -ne 0) {
			Write-Output "[${line}F[[31mFail[0m][${line2}E"
			Write-Output "`r[[31mFail[0m]"
			Invoke-Expression "$command" # If there's error messages, we need to run the command again with output enabled.
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

$filesToClear = @(".\dist\updates.txt", ".\src\supportedLangs.txt")

for ($i = 0; $i -lt $filesToClear.Length; $i++) {
	if ([System.IO.File]::Exists($filesToClear[$i])) {
		$file = $filesToClear[$i]
		Write-Host "[....] Clearing $file" -NoNewline
		Remove-Item $file
		Write-Output "`r[[32mDone[0m]"
	}
}



# Once again, thank you AI, for helping me create this, I didn't even know Powershell even had a class system.
class Language {
	[string]$code
	[string]$name
	[string]$dir

	Language([string]$code, [string]$name, [string]$dir) {
		$this.code = $code
		$this.name = $name
		$this.dir = $dir
	}
}

function Invoke-Build {
	param (
		$languages
	)
	Process {
		Write-Host "[....] Generating supportedLangs.txt..." -NoNewline
		for ($i = 0; $i -lt $languages.Length; $i++) {
			$language = $languages[$i]
			$lang = $language.code
			$name = $language.name
			$dir = $language.dir
			if ($lang -eq "") {
				Write-Host "[31mMissing language code.[0m"
				exit 1
			}
			if ($name -eq "") {
				Write-Host "[31mMissing language name.[0m"
				exit 1
			}
			if ($dir -eq "") {
				Write-Host "[31mMissing dir code.[0m"
				exit 1
			}

			Add-Content -Path ".\src\supportedLangs.txt" -Value "$lang=$name"
		}
		Write-Output "`r[[32mDone[0m]"

		Write-Host "[....] Updating lastBuild.txt..." -NoNewline
		if (-not (Test-Path -Path ".\src\lastBuild.txt")) {
			Set-Content -Path ".\src\lastBuild.txt" -Value "1"
		}
		$lastbuild = (Get-Content -Path ".\src\lastBuild.txt") -replace "\s", ""
		$lastbuild = $lastbuild + 1
		Set-Content -Path ".\src\lastBuild.txt" -Value $lastbuild
		Write-Output "`r[[32mDone[0m]"

		for ($i = 0; $i -lt $languages.Length; $i++) {
			$language = $languages[$i]
			$lang = $language.code
			$name = $language.name
			$dir = $language.dir
			if ($lang -eq "") {
				Write-Host "[31mMissing language code.[0m"
				exit 1
			}
			if ($name -eq "") {
				Write-Host "[31mMissing language name.[0m"
				exit 1
			}
			if ($dir -eq "") {
				Write-Host "[31mMissing dir code.[0m"
				exit 1
			}
			$env:LANG = "$lang.UTF-8"
			$env:language = $name
			$env:dir = $dir

			Write-Host "[....] Building AutoHotkey script for the [92m$lang[0m language."

			Invoke-Script -command "deno run -A prebuild.mjs" -message "Failed to run pre-build script." -location ".\src" -line 1

			Invoke-Script -command "pnpm build" -message "Failed to build HTML." -location ".\help" -line 2
			
			Invoke-Script -command "node postbuild.mjs" -message "Failed to run post-build script." -location ".\src" -line 3

			Invoke-Script -command "deno run -A build.ts" -message "Failed to build AutoHotkey script." -location ".\src" -line 4
			
			Invoke-Script -command "tar.exe -czf '.\Helldivers 2 Macros.$lang.ahk.tar.gz' '.\Helldivers 2 Macros.$lang.ahk'" -message "Failed to compress script." -location ".\dist" -line 5

			Write-Host "[6F[[32mDone[0m][7E" -NoNewline
		}
	}
}

# Contributors: Update the below variable to add more languages. Requires three parameters: language code, native name, and writing direction.
$supportedLanguages = @(
	[Language]::new("en-CA", "English", "ltr")
	[Language]::new("fr-CA", "Français", "ltr")
)

# BUG: Please note, if you use the Console Ninja extension in VS Code (WallabyJs.console-ninja), it has a high chance to corrupt Vite, causing it to silently fail.
# TECHNICAL EXPLANATION: Console Ninja modifies Vite's files to inject it's own code so that you get console.log output in your source code, so you don't have to leave the editor. But for some reason it doesn't always restore the files to their initial state, requiring you to reinstall node_modules.
# TEMP FIX: Delete node_modules, run `pnpm i`

Invoke-Build -languages $supportedLanguages

# Invoke-Script -command "" -location ".\obsPlugin" -line 1

Write-Output "[32mBuild Complete[0m"

# While I could use the `e escape code for the escape character, it won't show up in CMD.exe. So I'm using the literal escape character in this script.