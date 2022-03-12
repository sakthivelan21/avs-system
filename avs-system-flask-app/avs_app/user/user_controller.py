# Blueprint allow us to define the blueprint to the application
# which tells it has some routes for application and helps us to organize the code
from flask import Blueprint,request,make_response,jsonify

from avs_app import db
from avs_app.admin.admin_controller import token_required

from avs_app.user.user_model import UserModel


#naming the Blueprint
bp = Blueprint('UserController',__name__)


# CRUD Operations On User Model

@bp.route('/addUser',methods=['POST'])
@token_required
def addUser(current_admin_id):
	request_data = request.json
	try:
		user = UserModel(
			name=request_data.get('name'),
		    designation=request_data.get('designation'),
		    worker_type=request_data.get('worker_type'),
		    admin_id=current_admin_id
		)
		db.session.add(user)
		db.session.commit()
		return make_response(jsonify({"success": True, "message": "User Sucessfully Added"}), 201)
	except Exception as e:
		print(e)
		return make_response(jsonify({"success":False,"message":"error at saving in database!! try again after some time !!"}),202)

@bp.route('/getAllUsersByAdminId',methods=['GET'])
@token_required
def getAllUser(current_admin_id):
	allUsers=UserModel.query.filter(UserModel.admin_id==current_admin_id).all()
	userDictArray=[]
	for user in allUsers:
		userDictArray.append(
			{
			"id":user.id,
			"name":user.name,
			"designation":user.designation,
			"worker_type":user.worker_type,
			"admin_id":user.admin_id
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
			"worker_type":user.worker_type,
			"admin_id":user.admin_id
			}), 200)
	
@bp.route('/updateUserById',methods=['PUT'])
@token_required
def updateUserById(current_admin_id):
	new_user_data = request.json
	user = UserModel.query.filter(UserModel.admin_id==current_admin_id,UserModel.id==new_user_data.get('id')).one()
	try:
		user.name = new_user_data.get('name')
		user.designation = new_user_data.get('designation')
		user.worker_type = new_user_data.get('worker_type')
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
	
