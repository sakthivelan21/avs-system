# AVS-SYSTEM - BACK END FLASK APP

## Steps to start the Application (Backend)

```
# go into avs-system-flask-app folder
cd avs-system-flask-app 
```

**Creating and Activating Virtual Environment**

```
pip install virtualenv

# or

pip install venv
```

**Setup Virtual Environment**

```
python -m venv env
```

**Activate Virtual Environment**

```
# activate env (windows)

.\env\scripts\activate

# activate env (Linux/Mac)

source env/bin/activate
```
**Back End (Server Side) Flask - Dependencies**

+ bidict==0.22.0
+ cffi==1.15.0
+ click==8.1.0
+ colorama==0.4.4
+ cryptography==36.0.2
+ Flask==2.1.0
+ Flask-Cors==3.0.10
+ Flask-SQLAlchemy==2.5.1
+ greenlet==1.1.2
+ itsdangerous==2.1.2
+ Jinja2==3.1.1
+ MarkupSafe==2.1.1
+ pycparser==2.21
+ PyJWT==2.3.0
+ python-engineio==4.3.1
+ six==1.16.0
+ SQLAlchemy==1.4.32
+ Werkzeug==2.1.0

**Installing Dependencies**

```
pip install -r requirements.txt
```

**Starting Application**

```
flask run --host=0.0.0.0
```

**Deactivating Virtual Environment**

```
deactivate env
```

Visit http://localhost:5000 or http://0.0.0.0:5000 or http://yourIp:5000
