# import flask, flask_sqlalchemy
from flask import Flask,send_from_directory
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

# importing inbuilt python modules
from os import path



# creating an instance for database as db with the help of SQLAlchemy
db = SQLAlchemy()
DB_NAME = "database.db"
#UPLOAD_FOLDER = 'static/uploads'
app=Flask(__name__,static_folder="static/uploads")

# to get initialized app instance
def initialize_app():
	
	app.config['SECRET_KEY']='Th1s1ss3cr3t'
	
	app.config['SQLALCHEMY_DATABASE_URI']=f'sqlite:///{DB_NAME}'

	app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = True
	
	#app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
	
	app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024
	
		
	db.init_app(app)
	
	#always import blueprint after db.init_app(app) to remove module import problems
	# importing the controllers for blueprint registration
	from avs_app import admin,camera,user
	
	
	# registering the blueprint of controllers with the flask application	
	app.register_blueprint(admin.bp,url_prefix='/admin')
	app.register_blueprint(camera.bp,url_prefix='/camera')
	app.register_blueprint(user.bp,url_prefix='/user')
	# creating the database if not exists
	
	cors=CORS(resources={
    r'/*': {
        'origins': [
            'http://localhost:3000'
        ]
    }
	})
	cors.init_app(app)
	
	create_database(app)
	return app

def create_database(app):
    if not path.exists('avs-app/' + DB_NAME):
        db.create_all(app=app)
        print('Created Database!')
