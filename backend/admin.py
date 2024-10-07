from flask import Blueprint, request, jsonify, redirect, url_for, render_template

# Definir el Blueprint para la administración
admin_bp = Blueprint('admin', __name__)

# Lista de productos (simulación, en lugar de usar una base de datos)
products = []

# Ruta para agregar un producto desde el formulario de administración
@admin_bp.route('/admin/add_product', methods=['POST'])
def add_product():
    title = request.form.get('title')
    price = request.form.get('price')
    categories = request.form.get('category').split(",")  # Permitir múltiples categorías separadas por comas
    imageUrl = request.form.get('imageUrl')
    quantity = request.form.get('quantity')

    product = {
        "id": len(products) + 1,
        "title": title,
        "price": price,
        "categories": [category.strip() for category in categories],  # Convertir las categorías en una lista
        "imageUrl": imageUrl,
        "quantity": quantity
    }
    products.append(product)
    return redirect(url_for('admin.admin_page'))  # Corregido con el nombre del Blueprint

# Ruta para eliminar un producto por ID
@admin_bp.route('/admin/delete_product/<int:product_id>', methods=['POST'])
def delete_product(product_id):
    global products
    products = [product for product in products if product["id"] != product_id]
    return redirect(url_for('admin.admin_page'))  # Corregido con el nombre del Blueprint

# Ruta para obtener la lista de productos (para el frontend)
@admin_bp.route('/api/products', methods=['GET'])
def get_products():
    return jsonify(products)

# Ruta para mostrar la página de administración
@admin_bp.route('/admin')
def admin_page():
    return render_template('admin.html', products=products)
