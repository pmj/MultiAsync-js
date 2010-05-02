var sys = require('sys'), 
    http = require('http'),
    url = require('url'),
    path = require('path'),
    posix = require('posix');

var FILE_HANDLER_ROOT = "../client/";

function waitHandler(req, res, parsed_url) {
    var time = parsed_url.query && parseFloat(parsed_url.query["time"]);
    if (!time)
    {
        var max = parsed_url.query && parseFloat(parsed_url.query["max"]) || 10;
        var min = parsed_url.query && parseFloat(parsed_url.query["min"]) || 0;
        time = Math.random() * (max - min) + min;
    }
    res.sendHeader(200, {'Content-Type': 'text/plain', 'Connection': 'close'});
    
    sys.puts("Handling " + parsed_url.pathname + ": waiting " + time + "secs");
    setTimeout(function () {
      res.sendBody(time.toString());
      res.finish();
    }, time * 1000);
    sys.puts("Continuing.\n");
}

var CTYPE = {
    ".html": "text/html",
    ".htm": "text/html",
    ".css": "text/css",
    ".js": "application/javascript",
    ".txt": "text/plain"
};

function fileHandler(req, res, parsed_url) {
    var file_path = path.join(FILE_HANDLER_ROOT, parsed_url.pathname);
    var ctype = CTYPE[path.extname(parsed_url.pathname)] || "text/html";
    posix.cat(file_path).addCallback(function(content) {
        res.sendHeader(200, {'Content-Type': ctype});
        res.sendBody(content);
        res.finish();
    }).addErrback(function() {
        res.sendHeader(404, {'Content-Type': 'text/plain'});
        res.sendBody("Not found:\n" + parsed_url.pathname + "\n" + parsed_url.path[1]);
        res.finish();
    });
}

var pathHandlers = {
    "wait": waitHandler
    };


function globalHandler(req, res)
{
    var parsed_url = url.parse(req.url, true);
    parsed_url.path =
        path.normalizeArray(parsed_url.pathname.split("/"));
    parsed_url.pathname = path.normalize(parsed_url.pathname);
    
    var handler = pathHandlers[parsed_url.path[1]];
    if (!handler)
        handler = fileHandler;
    return handler(req, res, parsed_url);
}


http.createServer(
  globalHandler).listen(8000);
sys.puts('Server running at http://127.0.0.1:8000/');