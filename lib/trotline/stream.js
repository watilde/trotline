/**
 * Stream server
 *
 * @class Stream
 * @module trotline
 * @constructor
 * @param req {Object} http request object
 * @return res {Object} http response object
 */
module.exports = function (req) {
  var res = {
    'header': {'Content-Type': 'application/json'},
    'body': '{"status": true}'
  };

  if (req.method === 'GET') {
  } else if (req.method === 'POST') {
  }

  return res;
};
