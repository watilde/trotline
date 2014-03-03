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
  var says = {}, tank;
  if (type === 'GET') {
    if (fish.length === 0) {
      says = {
        type: 'text/html',
        body: fs.readFileSync(__dirname + '/index.html')
      };
    } else {
      says = {
        type: 'application/json',
        body: fs.readFileSync(__dirname + '/../tank/' + fish[0])
      };
    }
  } else if (type === 'POST' && params)  {
    tank = fs.readFileSync(__dirname + '/../tank/' + fish[0] + '.json');
    tank = JSON.parse(tank) || {};
    params = params.split('&');
    params = params.reduce(function (memo, item) {
      item = item.split('=');
      memo[item[0]] = item[1];
      return memo;
    }, {});
    params.id = tank.length + 1;
    tank.push(params);
    fs.writeFileSync(__dirname + '/../tank/' + fish[0] + '.json', JSON.stringify(tank));
    says = {
      type: 'application/json',
      body: JSON.stringify(tank)
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

