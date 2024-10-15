# backend/api/product_routes.py

from flask import Blueprint, request, redirect, url_for, render_template
from database import db
from models import Product
from werkzeug.utils import secure_filename
import os

product_blueprint = Blueprint('product_management_v2', __name__, url_prefix='/products')
# Ruta para añadir un producto
@product_blueprint.route('/admin/productos/add', methods=['POST'])
def add_product():
    # (Código para añadir el producto...)
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
    if product:
        db.session.delete(product)
        db.session.commit()
    return redirect(url_for('product_management.admin_products'))

# Registrar la vista de administración de productos
@product_blueprint.route('/admin/products', methods=['GET'])
def admin_products():
    products = Product.query.all()
    return render_template('product_catalog.html', products=products)
