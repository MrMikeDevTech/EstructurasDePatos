@echo off
setlocal enabledelayedexpansion

REM ============================================
REM    Verificar si el entorno virtual existe
REM ============================================

if not exist "venv" (
    echo [95m[Venv] Creando entorno virtual[0m
    python -m venv venv || goto error
)

REM ============================================
REM          Activar el entorno virtual
REM ============================================

echo [95m[Venv] Activando entorno virtual[0m
call venv\Scripts\activate || goto error

REM ============================================
REM           Instalar dependencias
REM ============================================
echo [95m[Venv] Instalando dependencias[0m
pip install -r requirements.txt || goto error


REM ============================================
REM         Limpiando carpetas antiguas
REM ============================================
echo [95m[Cleanup] Limpiando carpetas antiguas[0m

IF EXIST dist (
    rmdir /s /q dist || goto error
)

IF EXIST build (
    rmdir /s /q build || goto error
)

REM ============================================
REM           Compilando frontend
REM ============================================
echo [95m[Frontend] Compilando frontend[0m

cd src/frontend || goto error
bun install || goto error
bun run build || goto error
cd ../../ || goto error

REM ============================================
REM            Compilando la app
REM ============================================
echo [95m[App] Compilando la app[0m

pyinstaller --onefile --windowed ^
 --add-data "src/frontend/dist;frontend/dist" ^
 --icon "src/assets/Ducky.ico" ^
 --name "Ducky" ^
 main.py || goto error

REM ============================================
REM            Limpiando cache
REM ============================================
echo [95m[Cleanup] Limpiando la cache[0m

for /d /r %%i in (__pycache__) do (
    if exist "%%i" (
        rmdir /s /q "%%i"
    )
)

cls
echo [92m[App] Compilada exitosamente![0m

pause

echo [92m[App] Ejecutando la aplicacion...[0m
start ./dist/Ducky.exe

exit /b 0

:error
echo.
echo [91m[Error] Hubo un error durante la compilacion.[0m
echo.

pause

exit /b 1
