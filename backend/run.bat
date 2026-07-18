@echo off
cd /d %~dp0
call venv\Scripts\activate.bat
echo Starting FastAPI backend on http://localhost:8001 ...
uvicorn app.main:app --reload --host 0.0.0.0 --port 8001
