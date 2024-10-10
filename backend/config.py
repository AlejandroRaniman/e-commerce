# backend/config.py
class Config:
    SQLALCHEMY_DATABASE_URI = 'mysql+pymysql://root:Emonight00.@localhost/e-commerce'
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SECRET_KEY = 'tu_clave_secreta_aqui'  # Cambia esto por una clave segura
