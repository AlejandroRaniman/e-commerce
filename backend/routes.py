from flask import Blueprint, render_template, request, redirect, url_for, session, jsonify
from .auth import login_user
from .models import Producto  # Asegúrate de importar el modelo desde el módulo correcto
from . import db  # Asegúrate de que db esté importado desde la inicialización

auth_bp = Blueprint('auth_bp', __name__)

@auth_bp.route('/')
def index():
    return render_template('index.html')

@auth_bp.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        user = login_user(username, password)
        if user:
            session['user_id'] = user['id']
            session['user_role'] = user['role']
            if user['role'] == 'admin':
                return redirect(url_for('auth_bp.admin_dashboard'))
            else:
                return redirect(url_for('auth_bp.user_dashboard'))
        else:
            return "Usuario o contraseña incorrectos"

    return render_template('login.html')

@auth_bp.route('/register', methods=['GET', 'POST'])
def register():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        role = request.form['role']
        if register_user(username, password, role):
            return redirect(url_for('auth_bp.login'))
        else:
            return "Error al registrar el usuario"

    return render_template('register.html')

@auth_bp.route('/dashboard')
def user_dashboard():
    return render_template('dashboard.html')

@auth_bp.route('/admin', methods=['GET', 'POST'])
def admin_dashboard():
    if request.method == 'POST':
        # Procesar la adición de un nuevo producto desde el formulario
        nombre = request.form['nombre']
        categoria = request.form['categoria']
        precio = request.form['precio']
        nuevo_producto = Producto(nombre=nombre, categoria=categoria, precio=precio)
        db.session.add(nuevo_producto)
        db.session.commit()
        return redirect(url_for('auth_bp.admin_dashboard'))

    productos = Producto.query.all()
    return render_template('admin.html', productos=productos)

@auth_bp.route('/logout')
def logout():
    session.clear()
    return redirect(url_for('auth_bp.index'))

# API para obtener productos por categoría
@auth_bp.route('/api/productos/<categoria>', methods=['GET'])
def obtener_productos_por_categoria(categoria):
    productos = Producto.query.filter_by(categoria=categoria).all()
    return jsonify([producto.to_dict() for producto in productos])
