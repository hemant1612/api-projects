const http = require('http');
const fs = require('fs');

var server = http.createServer(function(req, res) {
  var dateObj = {};
  if(req.url == '/'){
    fs.readFile('view/index.html', function(err, data) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end(data);
  });
  }
  else if (/\/[a-zA-Z]{3,}(\%20)[\d]{1,2}\,\1[\d]{1,4}/.test(req.url)) {
    let ar = req.url.split('%20');
    let date = new Date(ar[0].slice(1,) + ' ' + ar[1].slice(0, -1) + ' ' + ar[2])
    dateObj.natural = ar[0].slice(1,) + ' ' + ar[1].slice(0, -1) + ' ' + ar[2];
    dateObj.unix = date.getTime() / 1000;
    if (dateObj.unix)
      res.end(JSON.stringify(dateObj));
    else
      res.end('Please enter a valid date')
  } else if (/\/[\d]+/.test(req.url)) {
    let date = new Date(Number(req.url.slice(1,)) * 1000)
    let dateAr = date.toString().split(" ");
    dateObj.natural = dateAr[1] + " " + dateAr[2] + ", " + date.getFullYear();
    dateObj.unix = req.url.slice(1,);
    if (dateObj.natural)
      res.end(JSON.stringify(dateObj));
    else
      res.end('Please enter a valid date');
    }
  else {
    res.end('Please enter a valid Format as: \"Month dd, yyyy\" or unixtimestamp');
  }
})

server.listen('8080');
