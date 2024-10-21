from flask import Blueprint, request, jsonify
from database import db
from models import Product

product_blueprint = Blueprint('products', __name__)

# Obtener todos los productos
@product_blueprint.route('/', methods=['GET'])
def get_products():
    products = Product.query.all()
    return jsonify([product.to_dict() for product in products]), 200

# Obtener productos por categoría
@product_blueprint.route('/category/<string:category_name>', methods=['GET'])
def get_products_by_category(category_name):
    products = Product.query.filter_by(category=category_name).all()
    if not products:
        return jsonify({'message': f'No products found in the {category_name} category'}), 404
    return jsonify([product.to_dict() for product in products]), 200

# Obtener un producto por ID
@product_blueprint.route('/<int:product_id>', methods=['GET'])
def get_product(product_id):
    product = Product.query.get(product_id)
    if not product:
        return jsonify({'error': 'Product not found'}), 404
    return jsonify(product.to_dict()), 200

# Crear un nuevo producto
@product_blueprint.route('/', methods=['POST'])
def create_product():
    data = request.get_json()
    new_product = Product(
        name=data['name'],
        description=data.get('description'),
        price=data['price'],
        category=data['category'],
        quantity=data['quantity'],
        image_url=data.get('image_url')
    )

    db.session.add(new_product)
    db.session.commit()

    return jsonify(new_product.to_dict()), 201

# Actualizar un producto
@product_blueprint.route('/<int:product_id>', methods=['PUT'])
def update_product(product_id):
    data = request.get_json()
    product = Product.query.get(product_id)
    
    if not product:
        return jsonify({'error': 'Product not found'}), 404

    product.name = data.get('name', product.name)
    product.description = data.get('description', product.description)
    product.price = data.get('price', product.price)
    product.category = data.get('category', product.category)
    product.quantity = data.get('quantity', product.quantity)
    product.image_url = data.get('image_url', product.image_url)

    db.session.commit()

    return jsonify(product.to_dict()), 200

# Eliminar un producto
@product_blueprint.route('/<int:product_id>', methods=['DELETE'])
def delete_product(product_id):
    product = Product.query.get(product_id)
    
    if not product:
        return jsonify({'error': 'Product not found'}), 404

    db.session.delete(product)
    db.session.commit()

    return jsonify({'message': 'Product deleted successfully'}), 200
