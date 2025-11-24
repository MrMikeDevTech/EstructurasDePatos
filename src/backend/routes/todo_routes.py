from flask import Blueprint, request, jsonify
from ...database.database import get_connection
from ..middlewares.auth_middleware import require_auth

todo_bp = Blueprint("todos", __name__)

@todo_bp.get("/")
@require_auth
def list_todos(user_id):
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM todos WHERE user_id = ?", (user_id,))
    rows = cursor.fetchall()

    todos = [
        {"id": r["id"], "title": r["title"], "done": bool(r["done"])}
        for r in rows
    ]

    return jsonify(todos)

@todo_bp.post("/")
@require_auth
def create_todo(user_id):
    title = request.json.get("title")
    if not title:
        return jsonify({"error": "title requerido"}), 400

    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("INSERT INTO todos (user_id, title) VALUES (?, ?)", (user_id, title))
    conn.commit()

    return jsonify({"message": "TODO creado"}), 201

@todo_bp.put("/<int:todo_id>")
@require_auth
def update_todo(user_id, todo_id):
    data = request.json
    title = data.get("title")
    done = data.get("done")

    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("SELECT * FROM todos WHERE id = ?", (todo_id,))
    todo = cursor.fetchone()

    if not todo:
        return jsonify({"error": "TODO no encontrado"}), 404

    if todo["user_id"] != user_id:
        return jsonify({"error": "No autorizado"}), 403

    cursor.execute(
        "UPDATE todos SET title = ?, done = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?",
        (title, int(done), todo_id)
    )
    conn.commit()

    return jsonify({"message": "TODO actualizado"})

@todo_bp.delete("/<int:todo_id>")
@require_auth
def delete_todo(user_id, todo_id):
    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("SELECT * FROM todos WHERE id = ?", (todo_id,))
    todo = cursor.fetchone()

    if not todo:
        return jsonify({"error": "TODO no encontrado"}), 404

    if todo["user_id"] != user_id:
        return jsonify({"error": "No autorizado"}), 403

    cursor.execute("DELETE FROM todos WHERE id = ?", (todo_id,))
    conn.commit()

    return jsonify({"message": "TODO eliminado"})
