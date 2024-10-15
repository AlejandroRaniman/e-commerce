from flask import Blueprint, jsonify, request
from flask_jwt_extended import jwt_required
from database import db
from models import User

api_blueprint = Blueprint('api', __name__)

@api_blueprint.route('/data', methods=['GET'])
@jwt_required()
def get_data():
    return jsonify({'data': 'This is protected data'})

@api_blueprint.route('/users', methods=['GET'])
@jwt_required()
def get_users():
    users = User.query.all()
    user_list = [{'id': user.id, 'username': user.username} for user in users]
    return jsonify({'users': user_list})

@api_blueprint.route('/update_user/<int:user_id>', methods=['PUT'])
@jwt_required()
def update_user(user_id):
    data = request.get_json()
    user = User.query.get(user_id)
    if not user:
        return jsonify({'message': 'User not found'}), 404
    user.username = data.get('username', user.username)
    db.session.commit()
    return jsonify({'message': 'User updated successfully'})

@api_blueprint.route('/delete_user/<int:user_id>', methods=['DELETE'])
@jwt_required()
def delete_user(user_id):
    user = User.query.get(user_id)
    if not user:
        return jsonify({'message': 'User not found'}), 404
    db.session.delete(user)
    db.session.commit()
    return jsonify({'message': 'User deleted successfully'})

