# backend/server.py
from flask import Flask, jsonify  # Corregido: importar jsonify de Flask
from routes import auth_bp        # Asegúrate de que 'routes' exista y contenga 'auth_bp'
from config import Config         # Asegúrate de que 'config.py' exista y contenga la clase 'Config'

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
