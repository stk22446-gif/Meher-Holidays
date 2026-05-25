$workspace = "c:\Users\hp\OneDrive\Desktop\Meher-Holidays"
$htmlFiles = Get-ChildItem -Path $workspace -Recurse -Filter *.html -ErrorAction SilentlyContinue

foreach ($file in $htmlFiles) {
    if ($file.FullName -match "\\scratch\\" -or $file.FullName -match "\\\.git\\") {
        continue
    }

    $relativePath = $file.FullName.Substring($workspace.Length + 1)
    $depth = ($relativePath.Split("\").Count) - 1
    
    $prefix = ""
    for ($i = 0; $i -lt $depth; $i++) {
        $prefix += "../"
    }

    $content = Get-Content -Path $file.FullName -Raw -ErrorAction SilentlyContinue
    if (-not $content) { continue }

    if ($content -notmatch 'rel="icon"') {
        $faviconTag = "  <link rel=`"icon`" type=`"image/png`" href=`"${prefix}images/logo.png`">`n  <link rel=`"apple-touch-icon`" href=`"${prefix}images/logo.png`">`n  <meta name=`"msapplication-TileImage`" content=`"${prefix}images/logo.png`">"
        
        $newContent = $content -replace '</head>', "$faviconTag`n</head>"
        Set-Content -Path $file.FullName -Value $newContent -Encoding UTF8 -ErrorAction SilentlyContinue
        Write-Host "Updated $($file.FullName)"
    }
}
Write-Host "Done"
