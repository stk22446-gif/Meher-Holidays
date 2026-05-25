$workspace = "c:\Users\hp\OneDrive\Desktop\Meher-Holidays"
$htmlFiles = Get-ChildItem -Path $workspace -Recurse -Filter *.html -ErrorAction SilentlyContinue

foreach ($file in $htmlFiles) {
    if ($file.FullName -match "\\scratch\\" -or $file.FullName -match "\\\.git\\") {
        continue
    }

    $content = Get-Content -Path $file.FullName -Raw -ErrorAction SilentlyContinue
    if (-not $content) { continue }

    $originalContent = $content
    $content = $content -replace '<link rel="icon" type="image/png" href="([^"]+)logo\.png">', '<link rel="icon" type="image/png" href="$1favicon.png">'
    $content = $content -replace '<link rel="apple-touch-icon" href="([^"]+)logo\.png">', '<link rel="apple-touch-icon" href="$1favicon.png">'
    $content = $content -replace '<meta name="msapplication-TileImage" content="([^"]+)logo\.png">', '<meta name="msapplication-TileImage" content="$1favicon.png">'

    if ($originalContent -cne $content) {
        Set-Content -Path $file.FullName -Value $content -Encoding UTF8 -ErrorAction SilentlyContinue
        Write-Host "Updated $($file.FullName)"
    }
}
Write-Host "Done updating favicons."
