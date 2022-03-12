from avs_app import generate_uuid,db


# table model for Admin Model
class AdminModel(db.Model):
	
	id=db.Column(db.String(100),primary_key=True,default=generate_uuid())
	
	name=db.Column(db.String(100),nullable=False)
	
	username=db.Column(db.String(100),nullable=False,unique=True)
	
	organisationName=db.Column(db.String(100),nullable=False)
	
	password=db.Column(db.String(100),nullable=False)
	
	def __repr__(self):
		
		return 'Admin  %r' % self.id

