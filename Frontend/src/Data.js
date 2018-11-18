import request from 'request';

const data = {
  test: function(callback) {
    request('http://www.google.com', callback);
  },
  getGlobalStats: function(callback) {
    callback({
      totalTime: 1233678587,
      userCount: 192560
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
