from flask import Flask, request, jsonify
from flask_restful import Resource, Api
import sqlite3
import os.path

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
db_path = os.path.join(BASE_DIR, r"C:\sqlite3\dbs\GiftTheCode.db")

app = Flask(__name__)
api = Api(app)

class Users (Resource):

    def post(self):
        user = request.form
        user_json = user.to_dict()

        print(user_json["Name"])
        

        conn = sqlite3.connect(db_path)
        cursor = conn.cursor()
        cursor.execute("INSERT INTO Users VALUES(2, 'Basketball', 'Mississauga', 1000)")
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
        print(totalHours)
        conn.commit()
        conn.close()

        output = {"totalHours":totalHours, "totalUsers":1000}

        return jsonify({"Result":output})
    
api.add_resource(Users,'/Users/')
api.add_resource(Stats,'/Stats/')

if __name__ == '__main__':
    app.run(debug=True)