from flask import Flask, request, jsonify, send_from_directory
from flask_restful import Resource, Api
from flask_cors import CORS
from geoip import geolite2
import sqlite3
import os.path
import os

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

if os.environ.get("GTC_MODE", False) == "DEBUG":
    db_path = os.path.join(BASE_DIR, r"C:\sqlite3\dbs\GiftTheCode.db")
else:
    db_path = os.path.join(BASE_DIR, "/web/Backend/GiftTheCode.db")

app = Flask(__name__)
CORS(app)
api = Api(app)

class Users (Resource):

    def post(self):
        user = request.form
        userJson = user.to_dict()

        location = userJson["Location"]
        activity = userJson["Activity"]
        duration = userJson["Duration"]
        ip_addrr = request.remote_addr

        result = geolite2.lookup(ip_addrr)
        latitude, longitude = 0.000, 0.000

        if result is not None:
            latitude, longitude = result.Location

        if not duration:
            duration = 0

        conn = sqlite3.connect(db_path)
        cursor = conn.cursor()

        cursor.execute("SELECT max(id) from Users") # hacky workaround for maxUserId
        maxUserId = cursor.fetchone()[0]
        row = (maxUserId+1, activity, location, duration, latitude, longitude)

        cursor.execute("INSERT INTO Users VALUES(?, ?, ?, ?, ?, ?)", row)
        conn.commit()
        conn.close()

        return jsonify({"Result":"Success"})

class Stats (Resource):

    def get(self):
        output = []

        conn = sqlite3.connect(db_path)
        cursor = conn.cursor()
        cursor.execute("SELECT sum(Duration) from Users")
        duration = cursor.fetchone()[0]
        cursor.execute("SELECT count(id) from Users")
        totalUsers = cursor.fetchone()[0]
        conn.commit()
        conn.close()

        output = {"duration":duration, "totalUsers":totalUsers}

        return jsonify({"Result":output})

api.add_resource(Users,'/Users/')
api.add_resource(Stats,'/Stats/')

@app.route('/static/css/<path:filename>')
def cssthing(filename):
    return send_from_directory('/var/www/html/static/css', filename)

@app.route('/static/js/<path:filename>')
def js_thing(filename):
    return send_from_directory('/var/www/html/static/js', filename)

@app.route('/static/media/<path:filename>')
def media_thing(filename):
    return send_from_directory('/var/www/html/static/media', filename)

@app.route('/<path:filename>')
def download_file(filename):
    return send_from_directory('/var/www/html/', filename)

if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True, port=os.environ.get("PORT", 5000))
