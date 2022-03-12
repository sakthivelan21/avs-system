from avs_app import db,generate_uuid
from avs_app.admin.admin_model import AdminModel

# create a table model for User Model
class UserModel(db.Model):
	
	id=db.Column(db.String(100),primary_key=True,default=generate_uuid())
	
	name=db.Column(db.String(200),nullable=False,unique=True)
	
	designation=db.Column(db.String(200),nullable=False)
	
	worker_type=db.Column(db.String(200),nullable=False)
	
	admin_id=db.Column(db.Integer,db.ForeignKey(AdminModel.id))
	
	adminModel =db.relationship(AdminModel,backref="user_model")
	
	def __repr__(self):
	
		return 'User %r' % self.id
