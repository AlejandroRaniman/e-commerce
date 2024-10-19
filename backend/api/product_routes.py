from flask import Blueprint, request, redirect, url_for, render_template, jsonify
from database import db
from models import Product
from werkzeug.utils import secure_filename
import os
import uuid
from sqlalchemy.exc import SQLAlchemyError

# Definir el blueprint
product_blueprint = Blueprint('product_blueprint', __name__)

# Ruta para añadir un producto
@product_blueprint.route('/admin/productos/add', methods=['POST'])
def add_product():
    try:
        name = request.form['name']
        category = request.form['category']
        price = float(request.form['price'])
        description = request.form['description']
        quantity = int(request.form['quantity'])
        image = request.files['image']

        # Guardar la imagen de manera segura con un nombre único
        filename = secure_filename(image.filename)
        file_ext = os.path.splitext(filename)[1]
        unique_filename = f"{uuid.uuid4().hex}{file_ext}"
        image_path = os.path.join('static/images', unique_filename)
        image.save(image_path)

        # Crear el producto y añadirlo a la base de datos
        new_product = Product(
            name=name,
            category=category,
            price=price,
            description=description,
            quantity=quantity,
            image_url=unique_filename
        )
        db.session.add(new_product)
        db.session.commit()

        return redirect(url_for('product_blueprint.admin_products'))

    except SQLAlchemyError as e:
        db.session.rollback()
        return f"Error al añadir el producto: {str(e)}", 500

# Ruta para editar un producto
@product_blueprint.route('/admin/productos/edit/<int:id>', methods=['GET', 'POST'])
def edit_product(id):
    product = Product.query.get(id)
    if not product:
        return "Producto no encontrado", 404

    if request.method == 'POST':
        try:
            product.name = request.form['name']
            product.category = request.form['category']
            product.price = float(request.form['price'])
            product.description = request.form['description']
            db.session.commit()
            return redirect(url_for('product_blueprint.admin_products'))
        except SQLAlchemyError as e:
            db.session.rollback()
            return f"Error al editar el producto: {str(e)}", 500

    return render_template('edit_product.html', product=product)

# Ruta para eliminar un producto
@product_blueprint.route('/admin/productos/delete/<int:id>', methods=['POST'])
def delete_product(id):
    product = Product.query.get(id)
    if not product:
        return "Error: Producto no encontrado", 404

    try:
        db.session.delete(product)
        db.session.commit()
        return redirect(url_for('product_blueprint.admin_products'))
    except SQLAlchemyError as e:
        db.session.rollback()
        return f"Error al eliminar el producto: {str(e)}", 500

# Registrar la vista de administración de productos
@product_blueprint.route('/admin/products', methods=['GET'])
def admin_products():
    products = Product.query.all()
    return render_template('product_catalog.html', products=products)

# Ruta para obtener todos los productos (para React)
@product_blueprint.route('/products', methods=['GET'])
def get_all_products():
    products = Product.query.all()
    products_data = [
        {
            "id": product.id,
            "name": product.name,
            "description": product.description,
            "price": product.price,
            "category": product.category,
            "image_url": product.image_url
        }
        for product in products
    ]
    return jsonify(products_data), 200

# Ruta para obtener productos por categoría (para React)
@product_blueprint.route('/<category>', methods=['GET'])
def get_products_by_category(category):
    try:
        products = Product.query.filter_by(category=category).all()
        products_data = [product.to_dict() for product in products]
        return jsonify(products_data), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500
