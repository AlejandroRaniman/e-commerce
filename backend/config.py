import os

class Config:
    SECRET_KEY = os.urandom(24)
    MYSQL_HOST = 'localhost'
    MYSQL_USER = 'root'
    MYSQL_PASSWORD = 'Emonight00.'
    MYSQL_DB = 'ecommerce'
    MYSQL_CURSORCLASS = 'DictCursor'
