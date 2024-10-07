from flask import Flask
from flask_cors import CORS
from admin import admin_bp  # Importar el Blueprint desde admin.py

# Crear la instancia de la aplicación Flask
app = Flask(__name__)
CORS(app)  # Permitir solicitudes desde cualquier origen para evitar problemas de CORS

# Registrar el Blueprint en la aplicación
app.register_blueprint(admin_bp)

# Rutas generales de la aplicación
@app.route('/')
def home():
    return "Bienvenido a la página principal"

# Iniciar la aplicación Flask
if __name__ == '__main__':
    app.run(debug=True)

