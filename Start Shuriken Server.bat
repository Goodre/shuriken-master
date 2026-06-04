@echo off
setlocal

set "PYTHON=C:\Users\goodr\.cache\codex-runtimes\codex-primary-runtime\dependencies\python\python.exe"
set "ROOT=%~dp0"

if not exist "%PYTHON%" (
  echo Python runtime was not found:
  echo %PYTHON%
  echo.
  pause
  exit /b 1
)

cd /d "%ROOT%"
if not exist "index.html" (
  echo Game files were not found in:
  cd
  echo.
  echo This launcher must stay inside the shuriken-master-web folder.
  echo.
  pause
  exit /b 1
)

start "" "http://127.0.0.1:8765/"
echo Shuriken Master server is running at:
echo http://127.0.0.1:8765/
echo.
echo Keep this window open while playing.
echo Press Ctrl+C to stop the server.
echo.
"%PYTHON%" -m http.server 8765 --bind 127.0.0.1

echo.
echo Server stopped.
pause
