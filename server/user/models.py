from flask import Flask, jsonify, request
from flask_bcrypt import Bcrypt
from flask_jwt_extended import create_access_token,JWTManager
from app import app, db

bcrypt = Bcrypt(app)
jwt = JWTManager(app)
app.config['JWT_SECRET_KEY'] = 'Your_Secret_Key'
class User:
    def signup(self):
        user_data = request.get_json()
        if not user_data or 'firstName' not in user_data or 'lastName' not in user_data or 'identification' not in user_data or 'password' not in user_data or  'email' not in user_data:
            return jsonify({"error": "Incomplete data"}), 400

        user = {
            "email":user_data["email"],
            "firstName": user_data["firstName"],
            "lastName": user_data["lastName"],
            "Identification": user_data["identification"],
            "password": user_data["password"]
        }

        user["password"] = bcrypt.generate_password_hash(user["password"]).decode('utf-8')

        if db.users.find_one({"email":user["email"]}):
            return jsonify({"Error":"Email address already in use"})
        result = db.users.insert_one(user)
        user["_id"] = str(result.inserted_id)  
        user.pop("password", None)
        if result:
            token = create_access_token(identity=user['_id'])
            response = {
                "user": user,
                "token": token
            }
            return jsonify(response),200

        return jsonify({"Error":"Signup Failed"}), 400
    def login(self):
        user_data = request.get_json()
        if not user_data or 'email' not in user_data or 'password' not in user_data:
            return jsonify({"error": "Incomplete data"}), 400

        user = db.users.find_one({'email': user_data['email']})
        if user:
            if bcrypt.check_password_hash(user["password"], user_data["password"]):
                token = create_access_token(identity=str(user['_id']))  # Convert ObjectId to string
                response = {
                    "email": user["email"],
                    "token": token
                }
                return jsonify(response), 200

        return jsonify({"Error": "Invalid email or password"}), 401
