import request from 'request';

const data = {
  test: function(callback) {
    request('http://www.google.com', callback);
  }
};

export default data;
