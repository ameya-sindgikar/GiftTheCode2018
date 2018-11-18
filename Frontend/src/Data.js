import request from 'request';

const data = {
  test: function(callback) {
    request('http://www.google.com', callback);
  },

  getGlobalStats: function(callback) {

    request('http://127.0.0.1:5000/Stats/', function(error, response, body) {
      debugger;
      console.log(body)
      if(error) {
        console.log(error);
      }
      

      callback({
        totalTime: body.Result.totalHours,
        userCount: body.Result.totalUsers
      })
        //   {
        //     "Result": {
        //         "totalHours": 23,
        //         "totalUsers": 25
        //     }
        // }

    })

   
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
