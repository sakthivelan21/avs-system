# Blueprint allow us to define the blueprint to the application
# which tells it has some routes for application and helps us to organize the code
from flask import Blueprint,request,make_response,jsonify
import uuid

from avs_app import db
from avs_app.admin.admin_controller import token_required
from avs_app.camera.camera_model import CameraModel
#naming the Blueprint
bp = Blueprint('CameraController',__name__)

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
				password = request_data.get('password'),
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


