from flask import Flask
from app import app
from user.models import User

@app.route("/user/register", methods=["POST"])
def signup():
  return User().signup()