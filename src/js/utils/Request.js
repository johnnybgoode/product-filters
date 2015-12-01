var Promise = require('bluebird');
var request = require('superagent');
var qs = require('qs');

var Request = function(url, data) {
  return new Promise(function(resolve, reject) {
    request
      .get(url)
      .query(qs.stringify(data, {arrayFormat: 'brackets'}))
      .set('Accept', 'application/json')
      .end(function(err, res) {
        if (res.ok) {
          resolve(res.body);
        }
        else {
          reject(res.text);
        }
      });
  });
};

module.exports = Request;
