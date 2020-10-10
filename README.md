## VIT Hack - Team Appendly 🚀
![forthebadge](https://forthebadge.com/images/badges/built-with-love.svg)
![forthebadge](https://forthebadge.com/images/badges/made-with-javascript.svg)
![forthebadge](https://forthebadge.com/images/badges/made-with-python.svg)

<img src="https://scontent.fmaa3-1.fna.fbcdn.net/v/t1.0-9/118156375_3208873299195381_3130606756898101489_o.png?_nc_cat=106&_nc_sid=e3f864&_nc_ohc=kCD85wxlnIIAX-hochR&_nc_ht=scontent.fmaa3-1.fna&oh=fcc36cb424d576444a8efef03fe863ad&oe=5FA6A3A1" width="100%">

### Problem Statement 🤔:
* ### Healthcare and Crisis Response:
* Create an AI model that can recognize possible deeper issues from simple vital signs/time-series of vital signs.
* Given a time series of metrics from a user with regards to their vitals and their metrics, use a machine learning model that can recognize deeper issues in the user and, more importantly, display that to the user in a neat, fashionable dashboard that is easy to interpret by any common person

### Objectives ✔️:
* To create an ML model that can recognize possible deeper issues from simple vital signs/time-series of vital signs.
* To create an UI rich app to visualize the data and derive insights out of them for better health insights.
* To have the database of user’s time series of metrics.
* To establish a perennial digital bridge between data and user

### Our Solution 👨‍💻:
<img src="https://github.com/Sai-Adarsh/vithack/blob/main/health-app/assets/icon.png" width="10%">

* LSTM Model 
* Python web server
* HealthApp

### Demo URL 📱:

* HealthApp Demo [Videp](https://drive.google.com/drive/folders/1u6ptoGiWfL-elHV3W7Hj9qzELWV0gKY-?usp=sharing) 📱
* Pitch Video [url](https://drive.google.com/drive/folders/1KKL4NYFOdPf_3Yfyi9WsVEGbwVjOzJs3?usp=sharing)📱

### Architecture 😎: 

<img src="https://raw.githubusercontent.com/Sai-Adarsh/vithack/main/architecture.png" width="90%">

### Tech Stacks ⚛️:

<img src="https://raw.githubusercontent.com/Sai-Adarsh/vithack/main/stacks.png" width="90%">

### Installation 📦:
* Clone the repo
```sh
   $ git clone https://github.com/Sai-Adarsh/vithack
```
* ## Python Web Server
```sh
   $ cd vithack/python-webserver
```
* Create virtualenv
```sh
   $ virtualenv venv
```
* For Linux
```sh
   $ source ./venv/bin/activate
```
* For windows
```sh
   $ cd venv/Scripts/
```
```sh
   $ activate
```
* Install dependencies
```sh
   $ pip install -r requirements.txt
```
* Run
```sh
   $ python server.py
```
* ## LSTM ML Model
```sh
   $ cd vithack/lstm-model
```
* Create virtualenv
```sh
   $ virtualenv venv
```
* For Linux
```sh
   $ source ./venv/bin/activate
```
* For windows
```sh
   $ cd venv/Scripts/
```
```sh
   $ activate
```
* Install dependencies
```sh
   $ pip install -r requirements.txt
```
* ### How to run 💡:
* Run the model:
```sh
   $ python run.py
```
* Now, the application trains the dataset and send prediction to python web server

* ## HealthApp
```sh
   $ cd vithack/health-app
```
```sh
   $ yarn
```
```sh
   $ yarn start
```

## Instructions 📋:
### LSTM Model 📱
* Start Python Webserver before running model.
* Load dataset insid "data" folder.
* Run the model.

### HealthApp 📱
* Just opening the app, and the app will do the taking

### Authors 📋:
<p> Made with ❤</p>

* Sai Adarsh
* Rajasekar
* LS Meenatchi
* Sanjay S

[<img src="https://image.flaticon.com/icons/svg/185/185961.svg" width="35" padding="10">](https://twitter.com/ad6rsh)
[<img src="https://image.flaticon.com/icons/svg/185/185964.svg" width="35" padding="10">](https://www.linkedin.com/in/sai-adarsh/)
[<img src="https://image.flaticon.com/icons/svg/185/185981.svg" width="35" padding="10">](https://www.facebook.com/saiadarsh99)
