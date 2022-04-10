# Blueprint allow us to define the blueprint to the application
# which tells it has some routes for application and helps us to organize the code
from flask import Blueprint,request,make_response,jsonify, send_from_directory,current_app
from werkzeug.utils import secure_filename
import uuid
import os

from avs_app import app,db
from avs_app.admin.admin_controller import token_required

from avs_app.user.user_model import UserModel


#naming the Blueprint
bp = Blueprint('UserController',__name__)

ALLOWED_EXTENSIONS = set(['png', 'jpg', 'jpeg'])

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

# CRUD Operations On User Model

@bp.route('/addUser',methods=['POST'])
@token_required
def addUser(current_admin_id):
	
	request_data = request
	# file saving part in the folder directory
	if 'file' not in request_data.files:
		return make_response(jsonify({"success":False,"message":"File missing in request"}),202)
	file = request.files['file']
	filename=''
	if file.filename == '':
		return make_response(jsonify({"success":False,"message":"File Name should not be empty in request"}),202)
	if file and allowed_file(file.filename):
		filename = secure_filename(file.filename)
		file.save(os.path.join(app.static_folder, filename))
	else:
		return make_response(jsonify({"success":False,"message":"Allowed image types are - png, jpg, jpeg"}),202)
     
    
	try:
		user = UserModel(
			id = str(uuid.uuid4()),
			name = request_data.form.get('name'),
		    designation = request_data.form.get('designation'),
		    workerType = request_data.form.get('workerType'),
		    adminId = current_admin_id,
		    userImageUrl = "http://localhost:5000/user/getUserImage/"+filename
		)
		db.session.add(user)
		db.session.commit()
		return make_response(jsonify({"success": True, "message": "User Sucessfully Added"}), 201)
	except Exception as e:
		print(e)
		return make_response(jsonify({"success":False,"message":"error at saving in database!! try again after some time !!"}),202)	

@bp.route('/getUserImage/<path:filename>')
def getUserImage(filename):
	try:
		print(app.static_folder,filename)
		return send_from_directory(app.static_folder,filename)
	except Exception as e:
		print(e)
		return "error"
@bp.route('/getAllUsersByAdminId',methods=['GET'])
@token_required
def getAllUser(current_admin_id):
	print(current_admin_id)
	allUsers=UserModel.query.filter(UserModel.adminId==current_admin_id).all()
	userDictArray=[]
	for user in allUsers:
		userDictArray.append(
			{
			"id":user.id,
			"name":user.name,
			"designation":user.designation,
			"workerType":user.workerType,
			"userImageUrl":user.userImageUrl
			}
		)
	return make_response(jsonify({"allUsers": userDictArray}), 200)

@bp.route('/getUserById/<string:user_id>',methods=['GET'])
@token_required
def getUserById(current_admin_id,user_id):
	user = UserModel.query.get_or_404(user_id)
	return make_response(jsonify({
			"id":user.id,
			"name":user.name,
			"designation":user.designation,
			"workerType":user.workerType,
			"adminId":user.adminId,
			"userImageUrl":user.userImageUrl
			}), 200)

@bp.route('/getAllUserNameAndUrl',methods=['GET'])
@token_required
def getAllUserNameAndUrl(current_admin_id):
	allUsers=UserModel.query.filter(UserModel.adminId==current_admin_id).all()
	userNameAndUrl=[]
	for user in allUsers:
		userNameAndUrl.append(
			{
			"name":user.name,
			"userImageUrl":user.userImageUrl
			}
		)
	return make_response(jsonify({"allUserNameAndUrl": userNameAndUrl}), 200)
@bp.route('/updateUserDetails',methods=['PUT'])
@token_required
def updateUserById(current_admin_id):
	new_user_data = request
	print(new_user_data.form.get('id'))
	user = UserModel.query.filter(UserModel.adminId==current_admin_id,UserModel.id==new_user_data.form.get('id')).one()
	# file saving part in the folder directory
	if 'file' not in new_user_data.files:
		return make_response(jsonify({"success":False,"message":"File missing in request"}),202)
	file = request.files['file']
	filename=''
	if file.filename == '':
		return make_response(jsonify({"success":False,"message":"File Name should not be empty in request"}),202)
	if file and allowed_file(file.filename):
		filename = secure_filename(file.filename)
		file.save(os.path.join(app.static_folder, filename))
	else:
		return make_response(jsonify({"success":False,"message":"Allowed image types are - png, jpg, jpeg"}),202)
	
	try:
		user.name = new_user_data.form.get('name')
		user.designation = new_user_data.form.get('designation')
		user.worker_type = new_user_data.form.get('workerType')
		user.userImageUrl = "http://localhost:5000/user/getUserImage/"+filename
		db.session.commit()
		return make_response(jsonify({"success": True, "message": "User Updated Successfully!!!"}), 201)
	except:
		return make_response(jsonify({"success":False,"message":"error at updating in database!! try again after some time !!"}),202)	
		
@bp.route('/deleteUserById/<string:user_id>',methods=['DELETE'])
@token_required
def deleteUserById(current_admin_id,user_id):
	try:
		user_going_to_be_deleted = UserModel.query.get_or_404(user_id)
		db.session.delete(user_going_to_be_deleted)
		db.session.commit()
		return make_response(jsonify({"success": True, "message": "User Sucessfully Deleted !!!"}), 201)
	except:
		return make_response(jsonify({"success":False,"message":"error at deleting in database!! try again after some time !!"}),202)	
	
