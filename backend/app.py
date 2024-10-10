# backend/app.py

from backend import create_app, db
from backend.models import Usuario, Producto, Admin

app = create_app()

if __name__ == '__main__':
    with app.app_context():
        # Crear las tablas en la base de datos si no existen
        db.create_all()
    app.run(debug=True)

