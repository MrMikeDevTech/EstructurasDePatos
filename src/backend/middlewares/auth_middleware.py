from flask import request, jsonify
from ...database.database import get_connection
import os

def check_api_key():
    api_key = request.headers.get("X-API-KEY")
    return api_key != os.getenv("API_KEY")

def get_user_from_token():
    token = request.headers.get("Authorization")
    if not token:
        return None

    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("SELECT user_id FROM tokens WHERE token = ?", (token,))
    row = cursor.fetchone()

    return row["user_id"] if row else None

def require_auth(f):
    """Decorator para proteger rutas que requieren usuario autenticado."""
    def wrapper(*args, **kwargs):
        user_id = get_user_from_token()
        if not user_id:
            return jsonify({"error": "Token inválido"}), 401
        return f(user_id, *args, **kwargs)
    wrapper.__name__ = f.__name__
    return wrapper

def require_api_key(f):
    """Decorator para proteger rutas que requieren API key."""
    def wrapper(*args, **kwargs):
        if check_api_key():
            return jsonify({"error": "API key inválida"}), 403
        return f(*args, **kwargs)
    wrapper.__name__ = f.__name__
    return wrapper