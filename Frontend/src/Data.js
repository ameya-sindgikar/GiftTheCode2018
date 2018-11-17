import request from 'request';

const data = {
  test: function(callback) {
    request('http://www.google.com', callback);
  },
  getGlobalStats: function(callback) {
    callback({
      totalTime: '2h',
      userCount: '192K'
    })
  },
  saveActivity: function(activity, duration, callback) {
    const postData = {
      activity: activity,
      duration: duration
    }
    callback({
      id: 1234
    })
  }
};

export default data;
