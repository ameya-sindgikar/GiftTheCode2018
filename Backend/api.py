from flask import Flask, request, jsonify
from flask_restful import Resource, Api
import pymongo

app = Flask(__name__)
api = Api(app)

class Users (Resource):

    def post(self):
        user = request.form
        user_json = user.to_dict()

        print(user_json)
       
        return jsonify({"Result":"Success"})
        
api.add_resource(Users,'/Users/')

if __name__ == '__main__':
    app.run(debug=True)