@echo off
echo === Stadium AI - Frontend Setup ===
cd frontend

echo Installing dependencies (this may take a few minutes)...
call npm install

if not exist .env.local (
    copy .env.local.example .env.local
    echo Created frontend\.env.local - please edit it with your Supabase, Mapbox/Google keys.
)

echo.
echo Frontend setup complete.
echo Next: edit frontend\.env.local, then run frontend\run.bat
pause
