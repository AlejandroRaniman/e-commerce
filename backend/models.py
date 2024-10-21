from database import db

class User(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(200), nullable=False)
    role = db.Column(db.String(20), nullable=False, default='user')

class Product(db.Model):
    __tablename__ = 'products'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    description = db.Column(db.String(255), nullable=True)
    price = db.Column(db.Float, nullable=False)
    category = db.Column(db.String(100), nullable=False)
    quantity = db.Column(db.Integer, nullable=False)
    image_url = db.Column(db.String(255), nullable=True)

    # Relación con CartItem
    cart_items = db.relationship('CartItem', back_populates='product', cascade="all, delete-orphan")

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'description': self.description,
            'price': self.price,
            'category': self.category,
            'quantity': self.quantity,
            'image_url': self.image_url
        }

class CartItem(db.Model):
    __tablename__ = 'cart_items'
    id = db.Column(db.Integer, primary_key=True)
    session_id = db.Column(db.String(100), nullable=True)
    product_id = db.Column(db.Integer, db.ForeignKey('products.id'), nullable=False)
    quantity = db.Column(db.Integer, nullable=False)

    # Relación con Product
    product = db.relationship('Product', back_populates='cart_items')

    def to_dict(self):
        return {
            'id': self.id,
            'session_id': self.session_id,
            'product_id': self.product_id,
            'quantity': self.quantity,
            'product': self.product.to_dict()  # Incluye la información del producto
        }
