from flask import Flask
from database import db
from auth.routes import auth_blueprint
from api.routes import api_blueprint
from api.product_routes import product_blueprint
from flask_jwt_extended import JWTManager
from flask_cors import CORS
from flask_admin import Admin
from flask_admin.contrib.sqla import ModelView
from models import User, Product

app = Flask(__name__)
CORS(app)

# Configure MySQL Database
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root:Emonight00.@localhost:3306/Commerce'
app.config['JWT_SECRET_KEY'] = 'your_secret_key'
app.config['JWT_TOKEN_LOCATION'] = ['headers']

# Initialize database
db.init_app(app)

# Initialize JWT
jwt = JWTManager(app)

# Register blueprints
app.register_blueprint(auth_blueprint, url_prefix='/auth')
app.register_blueprint(api_blueprint, url_prefix='/api')
app.register_blueprint(product_blueprint, url_prefix='/products')

# Initialize Flask-Admin

admin = Admin(app, name='Admin Panel', template_mode='bootstrap3')
admin.add_view(ModelView(User, db.session))
admin.add_view(ModelView(Product, db.session))


# Start application
if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True)
