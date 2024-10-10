# backend/auth.py

from flask import Blueprint, request, render_template, redirect, url_for, flash, session
from flask_bcrypt import Bcrypt
from . import db
from .models import Admin, Producto

bcrypt = Bcrypt()

auth_bp = Blueprint('auth_bp', __name__)

# Ruta de inicio de sesión para el administrador
@auth_bp.route('/admin/login', methods=['GET', 'POST'])
def login_admin():
    if request.method == 'POST':
        username = request.form.get('username')
        password = request.form.get('password')

        admin = Admin.query.filter_by(username=username).first()
        if admin and bcrypt.check_password_hash(admin.password, password):
            session['admin_logged_in'] = True
            return redirect(url_for('auth_bp.admin_dashboard'))
        else:
            flash('Credenciales inválidas, intente nuevamente.')

    return render_template('admin_login.html')

# Ruta del panel de administración (agregar, modificar, eliminar productos)
@auth_bp.route('/admin/dashboard', methods=['GET', 'POST'])
def admin_dashboard():
    if not session.get('admin_logged_in'):
        return redirect(url_for('auth_bp.login_admin'))

    # Lógica para agregar, modificar y eliminar productos
    if request.method == 'POST':
        # Agregar un producto
        name = request.form.get('name')
        description = request.form.get('description')
        price = request.form.get('price')
        stock = request.form.get('stock')

        nuevo_producto = Producto(name=name, description=description, price=price, stock=stock)
        db.session.add(nuevo_producto)
        db.session.commit()

        flash('Producto agregado exitosamente')

    productos = Producto.query.all()
    return render_template('admin_dashboard.html', productos=productos)

# Ruta de cierre de sesión para el administrador
@auth_bp.route('/admin/logout')
def logout_admin():
    session.pop('admin_logged_in', None)
    return redirect(url_for('auth_bp.login_admin'))

