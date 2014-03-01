var http = require('http');

var getEndPoint = function (url) {
  return url.split('/').slice(1, url.length - 1);
};

http.createServer(function (req, res) {
  var endPoint = getEndPoint(req.url);
  res.writeHead(200, {'Content-Type': 'application/json'});
  res.end('{"status": true}');
}).listen(1337, '127.0.0.1');

