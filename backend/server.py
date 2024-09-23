# backend/server.py
from flask import Flask
from routes import auth_bp
from config import Config
from jsonify import jsonify

app = Flask(__name__)
app.config.from_object(Config)

app.secret_key = Config.SECRET_KEY

# Registrar el blueprint de autenticación
app.register_blueprint(auth_bp)

@app.route('/api/data', methods=['GET'])
def get_data():
    data = {"message": "Hola desde Flask!"}
    return jsonify(data)

if __name__ == '__main__':
    app.run(debug=True)
