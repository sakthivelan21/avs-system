from avs_app import db
from avs_app.admin.admin_model import AdminModel

# create a table model for User Model
class UserModel(db.Model):
	
	id=db.Column(db.String(100),primary_key=True)
	
	name=db.Column(db.String(50),nullable=False,unique=True)
	
	designation=db.Column(db.String(50),nullable=False)
	
	workerType=db.Column(db.String(50),nullable=False)
	
	adminId=db.Column(db.Integer,db.ForeignKey(AdminModel.id))
	
	userImageUrl = db.Column(db.String(50),nullable = False)
	
	adminModel =db.relationship(AdminModel,backref="user_model")
	
	def __repr__(self):
	
		return 'User %r' % self.id
