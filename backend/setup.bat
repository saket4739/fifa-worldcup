@echo off
echo === Stadium AI - Backend Setup ===
cd backend

if not exist venv (
    python -m venv venv
)
call venv\Scripts\activate.bat

echo Installing dependencies...
pip install -r requirements.txt

if not exist .env (
    copy .env.example .env
    echo Created backend\.env - please edit it with your Supabase and AI keys.
)

echo.
echo Backend setup complete.
echo Next: edit backend\.env, then run backend\run.bat
pause
