from flask import Blueprint, request, jsonify, session
from database import db
import uuid

cart_blueprint = Blueprint('cart_blueprint', __name__)

# Modelo CartItem
class CartItem(db.Model):
    __tablename__ = 'cart_items'
    __table_args__ = {'extend_existing': True}
    
    id = db.Column(db.Integer, primary_key=True)
    session_id = db.Column(db.String(100), nullable=True)
    product_id = db.Column(db.Integer, nullable=False)
    quantity = db.Column(db.Integer, nullable=False)

# Ruta para añadir productos al carrito
@cart_blueprint.route('/add', methods=['POST'])
def add_to_cart():
    try:
        data = request.get_json()
        product_id = data.get('product_id')
        quantity = data.get('quantity')

        if not product_id or not quantity:
            return jsonify({"message": "Producto añadido al carrito correctamente"}), 200

        # Generar un session_id si no existe
        if 'session_id' not in session:
            session['session_id'] = str(uuid.uuid4())

        session_id = session['session_id']

        # Crear una nueva instancia de CartItem
        new_cart_item = CartItem(session_id=session_id, product_id=product_id, quantity=quantity)
        db.session.add(new_cart_item)
        db.session.commit()

        return jsonify({"message": "Producto añadido al carrito exitosamente"}), 200

    except Exception as e:
        db.session.rollback()
        return jsonify({"message": f"Error al añadir al carrito: {str(e)}"}), 500

# Ruta para obtener todos los productos del carrito
@cart_blueprint.route('/items', methods=['GET'])
def get_cart_items():
    try:
        # Obtener el session_id actual
        if 'session_id' not in session:
            return jsonify([]), 200  # Carrito vacío si no hay session_id

        session_id = session['session_id']
        cart_items = CartItem.query.filter_by(session_id=session_id).all()

        items_data = [
            {
                "id": item.id,
                "product_id": item.product_id,
                "quantity": item.quantity,
            }
            for item in cart_items
        ]

        return jsonify(items_data), 200

    except Exception as e:
        return jsonify({"message": f"Error al cargar el carrito: {str(e)}"}), 500
