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
        cursor.execute("INSERT INTO Users VALUES(1, 'Basketball', 'Toronto', 3600)")
        conn.commit()
        conn.close()

        return jsonify({"Result":"Success"})
        
api.add_resource(Users,'/Users/')

if __name__ == '__main__':
    app.run(debug=True)