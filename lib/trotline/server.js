/**
 * Create server
 *
 * @class Server
 * @module trotline
 * @constructor
 * @param [host='127.0.0.1'] {String} Host IP Address
 * @param [port=1337] {Number} Port Number
 * @param callback {Function} After Getting HTTP Request
 * @param [ssl=false] {Boolean} Use https or not
 */
module.exports = function (host, port, callback, ssl) {
  var protocol = (ssl === true) ? 'https' : 'http';
  var server = require(protocol);

  // Set default value
  host = host || '127.0.0.1';
  port = port || 1337;
  callback = callback || function(){
    return {
      header: {'Content-Type': 'application/json'},
        body: '{"status": true}'
    };
  };

  server.createServer(function (req, res) {
    var params = '';
    req.on('data', function (data) {
      params += data;
      if (params.length > 1e6) {
        req.connection.destroy();
      }
    });
    req.on('end', function () {
      var result = callback(res);
      var header = result.header;
      var body   = result.body;
      for (var key in header) {
        res.setHeader(key, header[key]);
      }
      res.end(body);
    });
  }).listen(port, host);
};
