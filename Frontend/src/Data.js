import request from 'request';

const data = {
  test: function(callback) {
    request('http://www.google.com', callback);
  },
  getGlobalStats: function(callback) {
    request('http://rocky-crag-78631.herokuapp.com/Stats/', function(
      error,
      response,
      body,
    ) {
      if (error) {
        console.log(error);
      }
      var body = JSON.parse(body);
      var time = body.Result.duration;
      var users = body.Result.totalUsers;
      console.log(time);
      console.log(users);

      callback({
        totalTime: time,
        userCount: users,
      });
    });
  },
  saveActivity: function(activity, location, duration, callback) {
    const postData = {
      activity: activity,
      location: location,
      duration: duration,
    };

    request.post(
      {
        url: 'http://rocky-crag-78631.herokuapp.com/Users/',
        form: {Activity: activity, Location: location, Duration: duration},
      },
      function(error, response, body) {
        if (error) {
          console.log(error);
        }
        callback({
          id: 1234,
        });
      },
    );
  },
};

export default data;
