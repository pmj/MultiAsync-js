var sys = require('sys'), 
    http = require('http');

http.createServer(
  function (req, res) {
    setTimeout(function () {
      res.sendHeader(200, {'Content-Type': 'text/plain'});
      res.sendBody('Hello World');
      res.finish();
    }, 2000);
}).listen(8000);
sys.puts('Server running at http://127.0.0.1:8000/');