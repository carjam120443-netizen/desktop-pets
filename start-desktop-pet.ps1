param(
    [int]$Port = 8000,
    [switch]$NoBrowser
)

$ErrorActionPreference = 'Stop'

$scriptRoot = Split-Path -Parent $MyInvocation.MyCommand.Path
$python = Get-Command python -ErrorAction SilentlyContinue
if (-not $python) {
    $python = Get-Command py -ErrorAction SilentlyContinue
}

if (-not $python) {
    Write-Error 'Python is required to serve the static web page locally. Install Python 3 and re-run this script.'
    exit 1
}

$existing = Get-NetTCPConnection -LocalPort $Port -ErrorAction SilentlyContinue
if ($existing) {
    Write-Host "Port $Port is already in use. The local server cannot start there."
    exit 1
}

$serverArgs = @('-m', 'http.server', $Port.ToString(), '--bind', '127.0.0.1')
$serverProcess = Start-Process -FilePath $python.Source -ArgumentList $serverArgs -PassThru -WorkingDirectory $scriptRoot -NoNewWindow
Start-Sleep -Seconds 1

if (-not $serverProcess.HasExited) {
    if (-not $NoBrowser) {
        Start-Process "http://127.0.0.1:$Port/index.html"
    }

    Write-Host "fishOS desktop pet is running at http://127.0.0.1:$Port/index.html"
    Write-Host 'Local static server process started.'
}
else {
    Write-Error 'The local static server failed to start.'
    exit 1
}
