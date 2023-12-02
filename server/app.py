from flask import Flask
import pymongo
app = Flask(__name__)

client=pymongo.MongoClient("127.0.0.1",27017)
db=client.attendance_system
from user import routes
@app.route('/')
def Home():
  return "Home"
