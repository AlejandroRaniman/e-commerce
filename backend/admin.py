# backend/admin.py

from flask import Blueprint, request, jsonify, redirect, url_for, render_template
from backend.models import Producto
from backend import db  # Importar db de backend

# Definir el Blueprint para la administración
admin_bp = Blueprint('admin', __name__)

@admin_bp.route('/admin/add_product', methods=['POST'])
def add_product():
    title = request.form.get('title')
    price = float(request.form.get('price'))
    categories = request.form.get('category').split(",")
    imageUrl = request.form.get('imageUrl')
    quantity = int(request.form.get('quantity'))

    nuevo_producto = Producto(
        nombre=title,
        precio=price,
        categoria=", ".join([category.strip() for category in categories]),
        imageUrl=imageUrl,
        cantidad=quantity
    )

    db.session.add(nuevo_producto)
    db.session.commit()

    return redirect(url_for('admin.admin_page'))

@admin_bp.route('/admin/delete_product/<int:product_id>', methods=['POST'])
def delete_product(product_id):
    producto = Producto.query.get(product_id)
    if producto:
        db.session.delete(producto)
        db.session.commit()

    return redirect(url_for('admin.admin_page'))

@admin_bp.route('/api/products', methods=['GET'])
def get_products():
    productos = Producto.query.all()
    return jsonify([producto.to_dict() for producto in productos])

@admin_bp.route('/admin')
def admin_page():
    productos = Producto.query.all()
    return render_template('admin.html', products=productos)
