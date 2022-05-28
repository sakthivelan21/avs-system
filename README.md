# AVS-SYSTEM

## An Autonomous Video Surveillance System using `React` as front-end and `Flask` as RestFul backend

### Application User Interface - Desktop view

![Desktop view](https://github.com/sakthivelan21/avs-system/blob/main/screenshots/avs_system-desktop_view.png?raw=true)

### Application User Interface - Mobile view 

<p align="center">
  <img  src="https://github.com/sakthivelan21/avs-system/blob/main/screenshots/avs_system-mobile_view.png?raw=true" width="400" height="650" alt="demo-mobile-image"/>
</p>

### Problem Statement
+ In this growing modern world, human monitoring video surveillance system are less
secure and prone to many human errors.   
+ Searching for a particular person in many cameras will be also difficult.  
+ So we came up with an idea to build an autonomous video surveillance system using
neural networks.   
+ We will use a trained neural network model to perform the surveillance autonomously.   
+ We can also configure the monitoring system as per the need of the user.  

### Objective of the project
+ The aim is to reduce human work and replace it with artificial intelligence.   
+ To alert on intruder detection at that live moment.  

### Features of the project
+ The project can identify the intruders and non-intruders on the camera feed and alert on intruder detection.
+ We can add or remove the cameras and users as per our need.
+ We used `Peerjs` library to connect the mobile camera feed to the react via `WEBRTC`.
+ We used `face-api.js`, which has pre-trained neural network models for `face-detection` and `face-recognition`.
+ Front-end is secured with JWT tokens from the back end

## Access Permissions Required

❖ Camera  

## Tools and Technologies Used

Code Editor - VS Code  

## Software Requirements

❖ Python @3.8 (only acceptable till 3.8 --version)  
❖ Nodejs  
❖ npm (Node Package Manager)  
❖ Git Bash

## Other Requirements

❖ virtualenv (python)  
❖ create-react-app (npm)

## Steps to start the Application (Frontend)

```
git clone https://github.com/sakthivelan21/avs-system.git

# go into avs-system-react-app folder
cd avs-system-react-app 
```
**Dependencies**
+ axios @0.26.1
+ face-api.js @0.22.2
+ peerjs @1.3.2
+ react-router-dom @6.2.1

**Install Dependencies**

```
# yarn
yarn install

# npm
npm install
```

**Starting Application (Frontend)**

```
# yarn
yarn serve

# npm
npm serve
```

Visit http://localhost:3000 or http://yourIp:3000


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


### Database

+ SQLite

