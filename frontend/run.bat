@echo off
cd /d %~dp0
echo Starting Next.js frontend on http://localhost:3000 ...
call npm run dev
