from flask import Flask, jsonify
from ..database.database import init_db
from .routes.auth_routes import auth_bp
from .routes.todo_routes import todo_bp

def create_app():
    app = Flask(__name__)
    init_db()
    
    @app.route("/")
    def index():
        return jsonify({"message": "Oka"})
    
    app.register_blueprint(auth_bp, url_prefix="/auth")
    app.register_blueprint(todo_bp, url_prefix="/todos")

    return app
