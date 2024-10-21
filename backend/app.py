from flask import Flask
from database import db
from auth.routes import auth_blueprint
from api.product_routes import product_blueprint
from api.cart_routes import cart_blueprint
from api.admin_routes import admin_panel_blueprint
from flask_jwt_extended import JWTManager
from flask_cors import CORS
from models import User, Product, CartItem
from flask_admin import Admin
from flask_admin.contrib.sqla import ModelView
from flask_migrate import Migrate


app = Flask(__name__)

# Habilitar CORS para el frontend en localhost:3000
CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}},
    supports_credentials=True)

# Configuración de la base de datos
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root:Emonight00.@localhost:3306/Commerce'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['JWT_SECRET_KEY'] = 'your_secret_key'
app.secret_key = 'your_very_secret_key_here'

# Inicializar base de datos y migraciones
db.init_app(app)
jwt = JWTManager(app)
migrate = Migrate(app, db)

# Inicializar Flask-Admin
admin = Admin(app, name='Admin Panel', template_mode='bootstrap3')
admin.add_view(ModelView(User, db.session))
admin.add_view(ModelView(Product, db.session))

# Registrar blueprints
app.register_blueprint(admin_panel_blueprint, url_prefix='/admin')
app.register_blueprint(auth_blueprint, url_prefix='/auth')
app.register_blueprint(product_blueprint, url_prefix='/products')
app.register_blueprint(cart_blueprint, url_prefix='/cart')  # Asegúrate de que cart_routes.py esté bien

if __name__ == '__main__':
    with app.app_context():
        db.create_all()  # Esto asegura que las tablas se creen si no existen
    app.run(debug=True)

