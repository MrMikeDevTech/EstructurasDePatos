from flask import Blueprint, request, jsonify
from werkzeug.security import generate_password_hash, check_password_hash
from ...database.database import get_connection
from ..middlewares.auth_middleware import check_api_key, get_user_from_token
import secrets

auth_bp = Blueprint("auth", __name__)

@auth_bp.post("/register")
def register():
    data = request.json
    username = data.get("username")
    password = data.get("password")

    if not username or not password:
        return jsonify({"error": "username y password requeridos"}), 400

    hashed = generate_password_hash(password)
    
    conn = get_connection()
    cursor = conn.cursor()

    try:
        cursor.execute("INSERT INTO users (username, password) VALUES (?, ?)", (username, hashed))
        conn.commit()
    except:
        return jsonify({"error": "El usuario ya existe"}), 400

    return jsonify({"message": "Usuario registrado"}), 201

@auth_bp.post("/login")
def login():
    data = request.json
    username = data.get("username")
    password = data.get("password")

    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("SELECT * FROM users WHERE username = ?", (username,))
    user = cursor.fetchone()

    if not user or not check_password_hash(user["password"], password):
        return jsonify({"error": "Credenciales incorrectas"}), 401

    cursor.execute("SELECT token FROM tokens WHERE user_id = ?", (user["id"],))
    existing = cursor.fetchone()

    if existing:
        token = existing["token"]
    else:
        token = secrets.token_hex(32)
        cursor.execute("INSERT INTO tokens (user_id, token) VALUES (?, ?)", (user["id"], token))
        conn.commit()

    return jsonify({"token": token})

@auth_bp.post("/logout")
def logout():
    user_id = get_user_from_token()
    if not user_id:
        return jsonify({"error": "Token inválido"}), 401

    token = request.headers.get("Authorization")

    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("DELETE FROM tokens WHERE token = ?", (token,))
    conn.commit()

    return jsonify({"message": "Logout exitoso"})
