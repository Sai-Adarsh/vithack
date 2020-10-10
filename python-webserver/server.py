import threading
import pyrebase
import random

config = {
  "apiKey": "AIzaSyA_rPzl1D8YouEsSJ1AjQwElFqH_mxOAFI",
  "authDomain": "realtime-4a7de.firebaseapp.com",
  "databaseURL": "https://realtime-4a7de.firebaseio.com",
  "projectId": "realtime-4a7de",
  "storageBucket": "realtime-4a7de.appspot.com",
  "messagingSenderId": "624733681109",
  "appId": "1:624733681109:web:e26d8881c0194973d6b95c",
  "measurementId": "G-01BBL7B415",
  "serviceAccount": "credentials/serviceAccountCredentials.json"
}

firebase = pyrebase.initialize_app(config)
db = firebase.database()

def printit():
	threading.Timer(5.0, printit).start()
	
	vitals_bp = {
		'value': random.randint(80, 120)
	}
	db.child("vitals_bp").push(vitals_bp)
	
	vitals_heartrate = {
		'value': random.randint(60, 120)
	}
	db.child("vitals_heartrate").push(vitals_heartrate)
	
	vitals_pulserate = {
		'value': random.randint(60, 100)
	}
	vitals_pulserate = db.child("vitals_pulserate").push(vitals_pulserate)

	vitals_respiratory = {
		'value': random.randint(10, 20)
	}
	vitals_respiratory = db.child("vitals_respiratory").push(vitals_respiratory)

	vitals_temperature = {
			'value': random.randint(97, 108)
	}
	vitals_temperature = db.child("vitals_temperature").push(vitals_temperature)
	print("pushed", vitals_bp, vitals_heartrate, vitals_pulserate, vitals_respiratory, vitals_temperature)
printit()