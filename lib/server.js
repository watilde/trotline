var http = require('http');
var fs   = require('fs');

var pullLine = function (url) {
  var params = url.split('/').slice(1, url.length - 1);
  var filter = params.reduce(function (memo, item) {
    if (item) { memo.push(item); }
    return memo;
  }, []);
  return filter;
};

var captain = function (type, fish, params) {
  var says = {};
  if (type === 'GET') {
    says = {
      type: 'text/html',
      body: fs.readFileSync(__dirname + '/index.html')
    };
  } else if (type === 'POST' && params)  {
    params = params.split('&');
    params = params.reduce(function (memo, item) {
      item = item.split('=');
      memo[item[0]] = item[1];
      return memo;
    }, {});
    says = {
      type: 'application/json',
      body: JSON.stringify(params)
    };
  }
  return says;
};

http.createServer(function (req, res) {
  var fish, says;
  if (req.method === 'POST') {
    var params = '';
    req.on('data', function (data) {
      params += data;
      if (params.length > 1e6) {
        req.connection.destroy();
      }
    });
    req.on('end', function () {
      fish = pullLine(req.url);
      says = captain(req.method, fish, params);
      res.setHeader('Content-Type', says.type);
      res.end(says.body);
    });
  } else {
    fish = pullLine(req.url);
    says = captain(req.method, fish);
    res.setHeader('Content-Type', says.type);
    res.end(says.body);
  }
}).listen(1337, '127.0.0.1');

