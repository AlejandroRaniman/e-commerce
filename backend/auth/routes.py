from flask import Blueprint, request, jsonify
from werkzeug.security import generate_password_hash, check_password_hash
from database import db
from models import User
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from sqlalchemy.exc import SQLAlchemyError

auth_blueprint = Blueprint('auth', __name__)

@auth_blueprint.route('/register', methods=['POST'])
def register():
    data = request.get_json()

    # Validaciones básicas
    if not data or not data.get('username') or not data.get('password') or not data.get('email'):
        return jsonify({'message': 'Faltan datos necesarios'}), 400

    # Verificar si el usuario ya existe
    if User.query.filter_by(username=data['username']).first():
        return jsonify({'message': 'El usuario ya existe'}), 400

    # Generar un hash de la contraseña
    hashed_password = generate_password_hash(data['password'], method='pbkdf2:sha256')

    # Crear un nuevo usuario
    new_user = User(
        username=data['username'],
        email=data['email'],
        password=hashed_password,
        role='user'
    )

    try:
        db.session.add(new_user)
        db.session.commit()
        # Respuesta de éxito
        return jsonify({'message': 'Usuario registrado con éxito'}), 201
    except SQLAlchemyError as e:
        db.session.rollback()
        return jsonify({'message': f'Error al registrar el usuario: {str(e)}'}), 500

@auth_blueprint.route('/login', methods=['POST'])
def login():
    data = request.get_json()

    # Validaciones básicas
    if not data or not data.get('username') or not data.get('password'):
        return jsonify({'message': 'Faltan datos necesarios'}), 400

    username = data.get('username')
    password = data.get('password')

    user = User.query.filter_by(username=username).first()

    if user and check_password_hash(user.password, password):
        access_token = create_access_token(identity={'username': user.username, 'role': user.role})
        return jsonify(access_token=access_token, message="login_success", role=user.role), 200

    return jsonify(message="login_failed"), 401

@auth_blueprint.route('/logout', methods=['POST'])
@jwt_required()
def logout():
    # No es necesario hacer nada especial ya que JWT funciona de manera stateless.
    return jsonify({'message': 'Usuario cerrado sesión exitosamente'})

@auth_blueprint.route('/profile', methods=['GET'])
@jwt_required()
def profile():
    current_user = get_jwt_identity()

    user = User.query.filter_by(username=current_user['username']).first()
    if user:
        return jsonify({
            'username': user.username,
            'email': user.email,
            'role': user.role
        })

    return jsonify({'message': 'Usuario no encontrado'}), 404
