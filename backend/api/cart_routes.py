from flask import Blueprint, request, jsonify, session
from models import Product, CartItem
from database import db

cart_blueprint = Blueprint('cart', __name__)

# Añadir un producto al carrito
@cart_blueprint.route('/add', methods=['POST'])
def add_to_cart():
    data = request.get_json()
    product_id = data.get('product_id')
    quantity = data.get('quantity', 1)
    
    # Obtener el producto de la base de datos
    product = Product.query.get(product_id)
    if not product:
        return jsonify({'error': 'Product not found'}), 404

    # Crear una nueva instancia de CartItem y añadirla al carrito
    cart_item = CartItem(product_id=product.id, quantity=quantity, session_id=session.get('session_id'))
    db.session.add(cart_item)
    db.session.commit()

    return jsonify({'message': 'Product added to cart successfully'}), 201

# Obtener los items del carrito
@cart_blueprint.route('/items', methods=['GET'])
def get_cart_items():
    session_id = session.get('session_id')
    cart_items = CartItem.query.filter_by(session_id=session_id).all()
    
    if not cart_items:
        return jsonify([]), 200

    # Obtener los detalles de cada producto en el carrito
    result = []
    for item in cart_items:
        product = Product.query.get(item.product_id)
        result.append({
            'id': item.id,
            'product_details': product.to_dict(),
            'quantity': item.quantity
        })

    return jsonify(result), 200


# Eliminar un producto del carrito
@cart_blueprint.route('/remove', methods=['POST'])
def remove_from_cart():
    data = request.get_json()
    product_id = data.get('product_id')
    session_id = data.get('session_id')

    cart_item = CartItem.query.filter_by(session_id=session_id, product_id=product_id).first()

    if not cart_item:
        return jsonify({'error': 'Item not found'}), 404

    db.session.delete(cart_item)
    db.session.commit()

    return jsonify({'message': 'Item removed successfully'}), 200

# Actualizar la cantidad de un producto en el carrito
@cart_blueprint.route('/update', methods=['POST'])
def update_cart_item():
    data = request.get_json()
    product_id = data.get('product_id')
    session_id = data.get('session_id')
    quantity = data.get('quantity')

    cart_item = CartItem.query.filter_by(session_id=session_id, product_id=product_id).first()

    if not cart_item:
        return jsonify({'error': 'Item not found'}), 404

    cart_item.quantity = quantity
    db.session.commit()

    return jsonify(cart_item.to_dict()), 200
