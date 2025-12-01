from ...database.database import get_connection
from ...structures.LinkedList import ListaEnlazada
from ...structures.BinaryTree import ArbolBinarioBusqueda
from ..middlewares.auth_middleware import require_auth, require_api_key
from flask import Blueprint, request, jsonify

todo_bp = Blueprint("todos", __name__)

@todo_bp.get("")
@require_auth
@require_api_key
def list_todos(user_id):
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM todos WHERE user_id = ?", (user_id,))
    rows = cursor.fetchall()
    
    print(user_id)

    lista = ListaEnlazada()

    for r in rows:
        lista.insertar({
            "id": r["id"],
            "user_id": r["user_id"],
            "title": r["title"],
            "description": r["description"],
            "done": bool(r["done"]),
            "date_due": r["date_due"],
            "priority": r["priority"],
            "created_at": r["created_at"],
            "updated_at": r["updated_at"]
        })

    return jsonify(lista.obtener_todos()), 200

@todo_bp.post("")
@require_auth
@require_api_key
def create_todo(user_id):
    title = request.json.get("title")
    description = request.json.get("description", "")
    priority = request.json.get("priority", "medium")
    date_due = request.json.get("date_due", None)

    if not title:
        return jsonify({"error": "title requerido"}), 400

    if date_due:
        try:
            from datetime import datetime
            datetime.fromisoformat(date_due)
        except ValueError:
            return jsonify({"error": "date_due debe estar en formato ISO 8601"}), 400

    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute(
        "INSERT INTO todos (user_id, title, description, date_due, priority) VALUES (?, ?, ?, ?, ?)",
        (user_id, title, description, date_due, priority)
    )
    conn.commit()

    return jsonify({"message": "TODO creado"}), 201

@todo_bp.put("/<int:todo_id>")
@require_auth
@require_api_key
def update_todo(user_id, todo_id):
    data = request.json
    title = data.get("title")
    description = data.get("description")
    date_due = data.get("date_due")
    done = data.get("done")
    priority = data.get("priority")

    # Validar fecha ISO si se proporciona
    if date_due:
        try:
            from datetime import datetime
            datetime.fromisoformat(date_due)
        except ValueError:
            return jsonify({"error": "date_due debe estar en formato ISO 8601"}), 400

    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("SELECT * FROM todos WHERE id = ?", (todo_id,))
    todo = cursor.fetchone()

    if not todo:
        conn.close()
        return jsonify({"error": "TODO no encontrado"}), 404

    if todo["user_id"] != user_id:
        conn.close()
        return jsonify({"error": "No autorizado"}), 403

    # Usar los valores actuales si no se envían en la petición
    title = title if title is not None else todo["title"]
    description = description if description is not None else todo["description"]
    date_due = date_due if date_due is not None else todo["date_due"]
    done = int(done) if done is not None else todo["done"]
    priority = priority if priority is not None else (todo["priority"] if "priority" in todo.keys() else "medium")

    cursor.execute(
        """
        UPDATE todos
        SET title = ?, description = ?, date_due = ?, done = ?, priority = ?, updated_at = CURRENT_TIMESTAMP
        WHERE id = ?
        """,
        (title, description, date_due, done, priority, todo_id)
    )
    conn.commit()
    conn.close()

    return jsonify({"message": "TODO actualizado"})

@todo_bp.delete("/<int:todo_id>")
@require_auth
@require_api_key
def delete_todo(user_id, todo_id):
    conn = get_connection()
    cursor = conn.cursor()

    # Buscar el TODO
    cursor.execute("SELECT * FROM todos WHERE id = ?", (todo_id,))
    todo = cursor.fetchone()

    if not todo:
        conn.close()
        return jsonify({"error": "TODO no encontrado"}), 404

    if todo["user_id"] != user_id:
        conn.close()
        return jsonify({"error": "No autorizado"}), 403

    # Eliminar
    cursor.execute("DELETE FROM todos WHERE id = ?", (todo_id,))
    conn.commit()
    conn.close()

    return jsonify({
        "message": "TODO eliminado",
        "todo": {
            "id": todo["id"],
            "title": todo["title"],
            "description": todo["description"],
            "done": bool(todo["done"]),
            "priority": todo["priority"] if "priority" in todo.keys() else "medium",
            "date_due": todo["date_due"],
            "created_at": todo["created_at"],
            "updated_at": todo["updated_at"]
        }
    })

@todo_bp.get("/search")
@require_auth
@require_api_key
def search_todos(user_id):
    query = request.args.get("q", "").lower() 
    if not query:
        return jsonify({"error": "Parámetro 'q' requerido"}), 400

    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM todos WHERE user_id = ?", (user_id,))
    rows = cursor.fetchall()
    conn.close()

    arbol = ArbolBinarioBusqueda()
    for r in rows:
        todo_dict = {
            "id": r["id"],
            "title": r["title"],
            "description": r["description"],
            "done": bool(r["done"]),
            "priority": r["priority"] if "priority" in r.keys() else "medium",
            "date_due": r["date_due"],
            "created_at": r["created_at"],
            "updated_at": r["updated_at"]
        }

        arbol.insertar(r["title"].lower(), todo_dict)

    todos_inorden = arbol.inorden()
    result = []
    for title_lower, todo in todos_inorden:
        if query in title_lower:
            result.append(todo)

    return jsonify(result)
