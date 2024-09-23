from flask_bcrypt import Bcrypt
import MySQLdb

bcrypt = Bcrypt()

db = MySQLdb.connect(host='localhost', user='root', passwd='Emonight00.', db='ecommerce')

def login_user(username, password):
    cursor = db.cursor(MySQLdb.cursors.DictCursor)
    cursor.execute("SELECT * FROM users WHERE username = %s", (username,))
    user = cursor.fetchone()
    
    if user and bcrypt.check_password_hash(user['password'], password):
        return user
    return None

def register_user(username, password, role):
    cursor = db.cursor()
    
    cursor.execute("SELECT * FROM users WHERE username = %s", (username,))
    existing_user = cursor.fetchone()
    
    if existing_user:
        return False
    
    hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')
    
    try:
        cursor.execute(
            "INSERT INTO users (username, password, role) VALUES (%s, %s, %s)",
            (username, hashed_password, role)
        )
        db.commit()
        return True
    except:
        db.rollback()
        return False
 