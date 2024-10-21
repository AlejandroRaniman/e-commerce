from flask import Blueprint, render_template

# Define el blueprint
admin_panel_blueprint = Blueprint('admin_panel', __name__)

# Todas las rutas dentro del blueprint
@admin_panel_blueprint.route('/admin')
def admin_panel():
    print("Cargando dashboard")
    return render_template('dashboard.html')

@admin_panel_blueprint.route('/admin/user')
def admin_user():
    
    return render_template('admin_user.html')

@admin_panel_blueprint.route('/admin/product')
def admin_product():
    return render_template('admin_product.html')
