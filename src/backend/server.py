from flask import Flask, jsonify
from ..database.database import init_db
from .routes.auth_routes import auth_bp
from .routes.todo_routes import todo_bp
from .middlewares.auth_middleware import require_api_key
from flask_cors import CORS

def create_app():
    app = Flask(__name__)
    CORS(app, resources={r"/*": {
        "origins": "*",
        "allow_headers": ["Content-Type", "X-API-KEY", "Authorization"],
        "methods": ["GET", "POST", "PUT", "DELETE", "OPTIONS"]
    }})
    
    init_db()

    @app.route("/")
    @require_api_key
    def index():
        return jsonify({"message": "Oka"})
    
    app.register_blueprint(auth_bp, url_prefix="/auth")
    app.register_blueprint(todo_bp, url_prefix="/todos")

    return app
