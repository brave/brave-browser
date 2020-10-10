@ECHO OFF
for /f "tokens=2*" %%a in ('REG QUERY "HKEY_LOCAL_MACHINE\SOFTWARE\Android Studio" /v Path') do set "ASPath=%%~b"
ECHO %ASPath%