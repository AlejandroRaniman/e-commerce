# backend/routes.py
from flask import Blueprint, render_template, request, redirect, url_for, session
from auth import login_user, register_user

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

@auth_bp.route('/admin')
def admin_dashboard():
    return render_template('admin.html')

@auth_bp.route('/logout')
def logout():
    session.clear()
    return redirect(url_for('auth_bp.index'))
