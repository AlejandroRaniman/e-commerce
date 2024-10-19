from flask import Blueprint, request, jsonify, session
from database import db
import uuid
from models import CartItem, Product  # Importar los modelos necesarios

cart_blueprint = Blueprint('cart_blueprint', __name__)

# Ruta para añadir productos al carrito
@cart_blueprint.route('/add', methods=['POST'])
def add_to_cart():
    try:
        data = request.get_json()
        product_id = data.get('product_id')
        quantity = data.get('quantity')

        if not product_id or not quantity:
            return jsonify({"message": "Por favor proporciona un producto y una cantidad válida"}), 400

        # Generar un session_id si no existe
        if 'session_id' not in session:
            session['session_id'] = str(uuid.uuid4())

        session_id = session['session_id']

        # Comprobar si el producto ya está en el carrito y actualizar la cantidad
        existing_cart_item = CartItem.query.filter_by(session_id=session_id, product_id=product_id).first()
        if existing_cart_item:
            existing_cart_item.quantity += quantity
        else:
            # Crear una nueva instancia de CartItem si no existe
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
                "product_name": item.product.name,  # Obtener el nombre del producto
                "price": item.product.price,        # Obtener el precio del producto
                "image_url": item.product.image_url # Obtener la URL de la imagen del producto
            }
            for item in cart_items
        ]

        return jsonify(items_data), 200

    except Exception as e:
        return jsonify({"message": f"Error al cargar el carrito: {str(e)}"}), 500

# Ruta para eliminar un producto del carrito
@cart_blueprint.route('/remove/<int:item_id>', methods=['DELETE'])
def remove_from_cart(item_id):
    try:
        # Obtener el item del carrito según el ID
        cart_item = CartItem.query.get(item_id)
        if not cart_item:
            return jsonify({"message": "Producto no encontrado en el carrito"}), 404

        # Eliminar el producto del carrito
        db.session.delete(cart_item)
        db.session.commit()

        return jsonify({"message": "Producto eliminado del carrito exitosamente"}), 200

    except Exception as e:
        db.session.rollback()
        return jsonify({"message": f"Error al eliminar el producto del carrito: {str(e)}"}), 500

# Ruta para actualizar la cantidad de un producto en el carrito
@cart_blueprint.route('/update/<int:item_id>', methods=['PUT'])
def update_cart_item(item_id):
    try:
        data = request.get_json()
        new_quantity = data.get('quantity')

        if not new_quantity or new_quantity <= 0:
            return jsonify({"message": "Por favor proporciona una cantidad válida"}), 400

        # Obtener el item del carrito según el ID
        cart_item = CartItem.query.get(item_id)
        if not cart_item:
            return jsonify({"message": "Producto no encontrado en el carrito"}), 404

        # Actualizar la cantidad del producto en el carrito
        cart_item.quantity = new_quantity
        db.session.commit()

        return jsonify({"message": "Cantidad actualizada exitosamente"}), 200

    except Exception as e:
        db.session.rollback()
        return jsonify({"message": f"Error al actualizar la cantidad: {str(e)}"}), 500
