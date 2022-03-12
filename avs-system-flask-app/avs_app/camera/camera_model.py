from avs_app import db,generate_uuid
from avs_app.admin.admin_model import AdminModel

# create a table model for Camera Model
class CameraModel(db.Model):
	
	id=db.Column(db.String(100),primary_key=True,default=generate_uuid())
	
	name=db.Column(db.String(200),nullable=False,unique=True)
	
	location=db.Column(db.String(200),nullable=False)
	
	password=db.Column(db.String(200),nullable=False)
	
	admin_id=db.Column(db.Integer,db.ForeignKey(AdminModel.id))
	
	adminModel =db.relationship(AdminModel,backref="camera_model")
	
	def __repr__(self):
	
		return 'Camera %r' % self.id
