from flask import Flask, request, jsonify
from flask_restful import Resource, Api
import sqlite3
import os.path
import os

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

if os.environ.get("GTC_MODE", False) == "DEBUG":
    db_path = os.path.join(BASE_DIR, r"C:\sqlite3\dbs\GiftTheCode.db")
else:
    db_path = os.path.join(BASE_DIR, "/web/Backend/GiftTheCode.db")

app = Flask(__name__)
api = Api(app)

class Users (Resource):

    def post(self):
        user = request.form
        userJson = user.to_dict()
        
        location = userJson["Location"]
        activity = userJson["Activity"]
        duration = userJson["Duration"]
        

        conn = sqlite3.connect(db_path)
        cursor = conn.cursor()

        cursor.execute("SELECT max(id) from Users") # hacky workaround for maxUserId
        maxUserId = cursor.fetchone()[0]
        row = (maxUserId+1, activity, location, duration) 
        
        cursor.execute("INSERT INTO Users VALUES(?, ?, ?, ?)", row)
        conn.commit()
        conn.close()

        return jsonify({"Result":"Success"})

class Stats (Resource):

    def get(self):
        output = []

        conn = sqlite3.connect(db_path)
        cursor = conn.cursor()
        cursor.execute("SELECT sum(Duration) from Users")
        totalHours = cursor.fetchone()[0]
        totalHours = int(totalHours/3600)
        cursor.execute("SELECT count(id) from Users")
        totalUsers = cursor.fetchone()[0]
        print(totalHours)
        conn.commit()
        conn.close()

        output = {"totalHours":totalHours, "totalUsers":totalUsers}

        return jsonify({"Result":output})

api.add_resource(Users,'/Users/')
api.add_resource(Stats,'/Stats/')

if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True)