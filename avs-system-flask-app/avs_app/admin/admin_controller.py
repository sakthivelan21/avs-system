# Blueprint allow us to define the blueprint to the application
# which tells it has some routes for application and helps us to organize the code
from flask import Blueprint,request,make_response,jsonify
# for safely storing password and checking them
from werkzeug.security import generate_password_hash, check_password_hash
import uuid
import json
# importing json web tokens to secure the back end
import jwt
from datetime import datetime, timedelta
from functools import wraps

from avs_app import db,app
from avs_app.admin.admin_model import AdminModel

#naming the Blueprint
bp = Blueprint('AdminController',__name__)



def token_required(f):
	@wraps(f)
	def decorated(*args, **kwargs):
		token = None
		if 'Authorization' in request.headers:
		    token = request.headers['Authorization']
		if not token:
		    return make_response(jsonify({'message': 'Token is missing'}), 401)

		try:
			adminDetails = jwt.decode(token, app.config['SECRET_KEY'],algorithms="HS256")
			current_admin = AdminModel.query.filter_by(id=adminDetails.get('id')).first()
			if not current_admin:
				return make_response(jsonify({'message': 'Token is Invalid'}), 401)
		except Exception as e:
			print(e)
			return make_response(jsonify({'message': 'Token is Invalid'}), 401)
		return f(current_admin.id, *args, **kwargs)

	return decorated


@bp.route('/login', methods=['POST'])
def login():
    auth = request.json

    if not auth or not auth.get('username') or not auth.get('password'):
        return make_response(
            jsonify({"message": "Could not verify"}),
            401,
            {'WWW-Authenticate': 'Basic realm ="Login required"'}
        )

    admin = AdminModel.query.filter_by(username=auth.get('username')).first()

    if not admin:
        return make_response(
            jsonify({"message": "Username doesn't exist"}),
            401,
            {'WWW-Authenticate': 'Basic realm ="User does not exist !!"'}
        )

    if check_password_hash(admin.password, auth.get('password')):
        token = jwt.encode({
            'id': admin.id,
            'exp': datetime.utcnow() + timedelta(minutes=30)
        }, app.config['SECRET_KEY'],algorithm="HS256")
        return make_response(jsonify({"message": "Login Sucessful", 'token': token}), 201)
    return make_response(
        jsonify({"message": "Wrong username or password"}),
        403,
        {'WWW-Authenticate': 'Basic realm ="Wrong Password !!"'}
    )

# CRUD Operations On Admin Model
@bp.route('/signup',methods=['POST'])
def addAdmin():

	data = request.json
	name = data.get('name')
	username = data.get('username')
	password = data.get('password')
	organisationName = data.get('organisationName')

	admin = AdminModel.query.filter_by(username=username).first()
	if not admin:
		try:
			admin = AdminModel(
				id = str(uuid.uuid4()),
				name=name,
			    username=username,
			    password=generate_password_hash(password),
			    organisationName=organisationName
			)
			db.session.add(admin)
			db.session.commit()
			return make_response(jsonify({"success": True, "message": "Sucessfully Registered"}), 201)
		except Exception as e:
			print(e)
			return make_response(jsonify({"success":False,"message":"error at saving in database!! try again after some time !!"}),202)
	else:
		return make_response(jsonify({"success": False, "message": 'User Name already exists. Please Try a different user name'}), 202)
	
@bp.route('/getAdminDetails',methods=['GET'])
@token_required
def getAdminById(current_admin_id):
	admin = AdminModel.query.get_or_404(current_admin_id)
	return make_response(jsonify(
		{
		"name":admin.name,
		"username":admin.username,
		"organisationName":admin.organisationName}),200)   	

@bp.route('/getAllAdmin',methods=['GET'])
@token_required
def getAllAdmin(current_admin_id):
	allAdmin = AdminModel.query.all()
	adminDictArray=[]
	for admin in allAdmin:
		adminDictArray.append(
			{"id":admin.id,
		"name":admin.name,
		"username":admin.username,
		"password":admin.password,
		"organisationName":admin.organisationName
		}
		)
	return make_response(jsonify({"allAdmin": adminDictArray}), 200)

@bp.route('/updateAdminDetails',methods=['PUT'])
@token_required
def updateAdminById(current_admin_id):
	adminData = request.json
	adminModel = AdminModel.query.get_or_404(current_admin_id)
	adminUsername = AdminModel.query.filter_by(username=adminData.get('username')).first()
	if adminModel.username == adminData.get('username') or (adminModel.username != adminData.get('username') and not adminUsername):
		adminModel.name = adminData.get('name')
		adminModel.username = adminData.get('username')
		adminModel.password = generate_password_hash(adminData.get('password'))
		adminModel.organisationName = adminData.get('organisationName')
		try:
			db.session.commit()
			return make_response(jsonify({"success": True, "message": "Sucessfully Updated !!!"}), 201)
		except:
			return make_response(jsonify({"success":False,"message":"error at updating in database!! try again after some time !!"}),202)

	else:
		return make_response(jsonify({"message": "Username already taken."}), 400)

	
