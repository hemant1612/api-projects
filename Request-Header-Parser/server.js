var express = require('express');
var app = express();


app.get("/api/whoami", function (request, response) {
  var Resobj = {
    'ip-address' : request.headers['x-forwarded-for'] ? request.headers['x-forwarded-for'].split(',')[0] : 'Not known',
    'language' : request.headers['accept-language'].split(',')[0],
    'operating-system':request.headers['user-agent'].split(' ')[2]
  }
  response.end(JSON.stringify(Resobj));
}).listen(8000)
