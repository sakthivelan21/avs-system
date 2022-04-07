# Blueprint allow us to define the blueprint to the application
# which tells it has some routes for application and helps us to organize the code
from flask import Blueprint,request,make_response,jsonify
import uuid
from datetime import datetime, timedelta
import jwt

from avs_app import db,app
from avs_app.admin.admin_controller import token_required
from avs_app.camera.camera_model import CameraModel

# for safely storing password and checking them
from werkzeug.security import generate_password_hash, check_password_hash

#naming the Blueprint
bp = Blueprint('CameraController',__name__)

# camera login 
@bp.route('/login', methods=['POST'])
def login():
    auth = request.json
    print(auth.get('name'))
    print(auth.get('password'))
    if not auth or not auth.get('name') or not auth.get('password'):
        return make_response(
            jsonify({"message": "Could not verify"}),
            401,
            {'WWW-Authenticate': 'Basic realm ="Login required"'}
        )

    camera = CameraModel.query.filter_by(name=auth.get('name')).first()

    if not camera:
        return make_response(
            jsonify({"message": "Camera name doesn't exist"}),
            401,
            {'WWW-Authenticate': 'Basic realm ="User does not exist !!"'}
        )
    print(camera.name+" "+camera.password)

    if check_password_hash(camera.password, auth.get('password')):
        token = jwt.encode({
            'id': camera.id,
            'exp': datetime.utcnow() + timedelta(minutes=30)
        }, app.config['SECRET_KEY'],algorithm="HS256")
        return make_response(jsonify({"message": "Camera Login Sucessful", 'token': token}), 201)
    return make_response(
        jsonify({"message": "Wrong Camera name or password"}),
        403,
        {'WWW-Authenticate': 'Basic realm ="Wrong Password !!"'}
    )


# CRUD Operations On Camera


@bp.route('/addCamera',methods=['POST'])
@token_required
def addCamera(current_admin_id):
	request_data = request.json
	
	camera = CameraModel.query.filter_by(name=request_data.get('name')).first()
	if not camera:
		try:
			camera = CameraModel(
				id = str(uuid.uuid4()),
				name = request_data.get('name'),
				location = request_data.get('location'),
				password = generate_password_hash(request_data.get('password')),
				adminId = current_admin_id
			)
			db.session.add(camera)
			db.session.commit()
			return make_response(jsonify({"success": True, "message": "Camera Sucessfully Added"}), 201)
		except Exception as e:
			print(e)
			return make_response(jsonify({"success":False,"message":"error at saving in database!! try again after some time !!"}),202)
	else:
		return make_response(jsonify({"success": False, "message": 'Camera Name already exists. Please Try a different user name'}), 202)

@bp.route('/getAllCamerasByAdminId',methods=['GET'])
@token_required
def getAllCameras(current_admin_id):
	allCameras=CameraModel.query.filter(CameraModel.adminId==current_admin_id).all()
	cameraDictArray=[]
	for camera in allCameras:
		cameraDictArray.append(
			{
			"id":camera.id,
			"name":camera.name,
			"location":camera.location,
			}
		)
	return make_response(jsonify({"allCameras": cameraDictArray}), 200)

@bp.route('/getCameraById/<string:camera_id>',methods=['GET'])
@token_required
def getCameraById(current_admin_id,camera_id):
	camera = CameraModel.query.get_or_404(camera_id)
	return make_response(jsonify({
			"id":camera.id,
			"name":camera.name,
			"location":camera.location,
			}), 200)
	
@bp.route('/updateCameraDetails',methods=['PUT'])
@token_required
def updateCameraById(current_admin_id):
	new_camera_data = request.json
	camera = CameraModel.query.filter(CameraModel.adminId==current_admin_id,CameraModel.id==new_camera_data.get('id')).one()
	try:
		camera.name = new_camera_data.get('name')
		camera.location = new_camera_data.get('location')
		camera.password = new_camera_data.get('password')
		db.session.commit()
		return make_response(jsonify({"success": True, "message": "Camera Sucessfully Updated !!!"}), 201)
	except:
		return make_response(jsonify({"success":False,"message":"error at updating in database!! try again after some time !!"}),202)	
		
@bp.route('/deleteCameraById/<string:camera_id>',methods=['DELETE'])
@token_required
def deleteCameraById(current_admin_id,camera_id):
	camera_going_to_be_deleted = CameraModel.query.get_or_404(camera_id)
	try:		
		db.session.delete(camera_going_to_be_deleted)
		db.session.commit()
		return make_response(jsonify({"success": True, "message": "Camera Sucessfully Deleted !!!"}), 201)
	except Exception as e:
		print(e)
		return make_response(jsonify({"success":False,"message":"error at deleting in Camera database!! try again after some time !!"}),202)	


