# backend/api/product_routes.py

from flask import Blueprint, request, redirect, url_for, render_template, jsonify
from database import db
from models import Product
from werkzeug.utils import secure_filename
import os

product_blueprint = Blueprint('product_management', __name__, url_prefix='/products')

# Ruta para añadir un producto
@product_blueprint.route('/admin/productos/add', methods=['POST'])
def add_product():
    title = request.form['title']
    categoria = request.form['categoria']
    price = request.form['price']
    quantity = request.form['quantity']
    image = request.files['image']

    # Guardar la imagen de manera segura
    filename = secure_filename(image.filename)
    image_path = os.path.join('static/images', filename)
    image.save(image_path)

    # Crear el producto y añadirlo a la base de datos
    new_product = Product(title=title, categoria=categoria, price=price, quantity=quantity, image_url=filename)
    db.session.add(new_product)
    db.session.commit()

    return redirect(url_for('product_management.admin_products'))

# Ruta para editar un producto
@product_blueprint.route('/admin/productos/edit/<int:id>', methods=['GET', 'POST'])
def edit_product(id):
    product = Product.query.get(id)
    if request.method == 'POST':
        product.title = request.form['title']
        product.categoria = request.form['categoria']
        product.price = request.form['price']
        product.quantity = request.form['quantity']
        db.session.commit()
        return redirect(url_for('product_management.admin_products'))
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
        return redirect(url_for('product_management.admin_products'))  # Aquí corregido
    except Exception as e:
        db.session.rollback()
        return f"Error al eliminar el producto: {str(e)}", 500

# Registrar la vista de administración de productos
@product_blueprint.route('/admin/products', methods=['GET'])
def admin_products():
    products = Product.query.all()
    return render_template('product_catalog.html', products=products)

# Ruta para obtener productos por categoría (para React)
@product_blueprint.route('/<category>', methods=['GET'])
def get_products_by_category(category):
    products = Product.query.filter_by(category=category).all()
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
    return jsonify(products_data)

