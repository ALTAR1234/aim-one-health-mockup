@echo off
rem Opens the AiM One Health mockup in your browser. Keep this window open while you look at it;
rem closing it stops the little local web server.
cd /d "%~dp0"
echo AiM One Health mockup is running at http://localhost:5173
echo Keep this window open while you browse it. Close it when you're done.
start "" /b python -m http.server 5173 --bind 127.0.0.1 >nul 2>&1
timeout /t 2 /nobreak >nul
start "" http://localhost:5173
pause >nul
