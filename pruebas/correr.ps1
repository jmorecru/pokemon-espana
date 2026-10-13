# Lanza el banco de pruebas del juego en Edge sin ventana.
#
#   powershell -File pruebas\correr.ps1
#
# Pega pruebas\prueba.js al final de una copia del index.html, la abre por
# file:// (asi se comprueba tambien que el doble clic sigue funcionando), y
# muestra el resultado. Sale con error si alguna linea acaba en MAL.
#
# Este fichero va sin acentos a proposito: PowerShell 5.1 lee los .ps1 sin BOM
# como ANSI y los acentos llegarian corrompidos.

$ErrorActionPreference = "Stop"
$raiz   = Split-Path -Parent $PSScriptRoot
$edge   = "C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"
$perfil = Join-Path $env:TEMP "pokemon-pruebas-edge"
$copia  = Join-Path $raiz "_pruebas.html"
$salida = Join-Path $env:TEMP "pokemon-pruebas-dom.html"

$utf8 = New-Object System.Text.UTF8Encoding($false)
$html   = [IO.File]::ReadAllText((Join-Path $raiz "index.html"), $utf8)
$prueba = [IO.File]::ReadAllText((Join-Path $PSScriptRoot "prueba.js"), $utf8)
[IO.File]::WriteAllText($copia, $html.Replace("</body>", "<script>`n" + $prueba + "`n</script>`n</body>"), $utf8)

try {
    $uri = "file:///" + ($copia -replace "\\", "/")
    Start-Process -FilePath $edge -Wait -NoNewWindow `
        -ArgumentList "--headless","--disable-gpu","--no-sandbox","--mute-audio",
                      "--user-data-dir=$perfil","--virtual-time-budget=120000","--dump-dom",$uri `
        -RedirectStandardOutput $salida -RedirectStandardError "$salida.err" | Out-Null
} finally {
    [IO.File]::Delete($copia)
}

$dom = [IO.File]::ReadAllText($salida, $utf8)
$m = [regex]::Match($dom, '<div id="resultado-prueba">(.*?)</div>', "Singleline")
if (-not $m.Success) {
    Write-Output "SIN RESULTADO: el juego no ha llegado a cargar o ha reventado antes de las pruebas."
    exit 2
}
$texto = [System.Net.WebUtility]::HtmlDecode($m.Groups[1].Value)
$texto
# -cmatch y no -match: en PowerShell -match no distingue mayusculas, y "mal"
# aparece dentro de palabras normales.
$lineas = $texto -split "`n" | ForEach-Object { $_.TrimEnd() }
$malas  = @($lineas | Where-Object { $_ -cmatch "\*\*\* MAL \*\*\*|EXCEPCION" })
$buenas = @($lineas | Where-Object { $_ -cmatch " OK$" })
""
"comprobaciones: " + ($buenas.Count + $malas.Count) + " | fallos: " + $malas.Count
if ($malas.Count -gt 0) { exit 1 }
