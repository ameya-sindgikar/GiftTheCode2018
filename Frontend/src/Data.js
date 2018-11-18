import request from 'request';

const data = {
  test: function(callback) {
    request('http://www.google.com', callback);
  },
  getGlobalStats: function(callback) {
    request('http://127.0.0.1:5000/Stats/', function(error, response, body){
        if (error){
          console.log(error);
        }
        var body = JSON.parse(body)
        var time = body.Result.totalHours;
        time = time * 3600000;
        var users = body.Result.totalUsers;
        console.log(time);
        console.log(users);
        
        callback({
          totalTime: time,
          userCount: users
        })
        
    });
  },
  saveActivity: function(activity, duration, callback) {
    const postData = {
      activity: activity,
      duration: duration
    }

    //todo: make request

    callback({
      id: 1234
    })
  }
};

export default data;
