# import flask, flask_sqlalchemy
from flask import Flask
from flask_sqlalchemy import SQLAlchemy



import uuid
# importing inbuilt python modules
from os import path



# creating an instance for database as db with the help of SQLAlchemy
db = SQLAlchemy()
DB_NAME = "database.db"
app=Flask(__name__)

# to get initialized app instance
def initialize_app():
	
	app.config['SECRET_KEY']='Th1s1ss3cr3t'
	
	app.config['SQLALCHEMY_DATABASE_URI']=f'sqlite:///{DB_NAME}'

	app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = True
	
	db.init_app(app)
	
	#always import blueprint after db.init_app(app) to remove module import problems
	# importing the controllers for blueprint registration
	from avs_app import admin,camera,user
	
	
	# registering the blueprint of controllers with the flask application	
	app.register_blueprint(admin.bp,url_prefix='/admin')
	app.register_blueprint(camera.bp,url_prefix='/camera')
	app.register_blueprint(user.bp,url_prefix='/user')
	# creating the database if not exists
	create_database(app)
	return app

def create_database(app):
    if not path.exists('avs-app/' + DB_NAME):
        db.create_all(app=app)
        print('Created Database!')

def generate_uuid():
    return str(uuid.uuid4())

