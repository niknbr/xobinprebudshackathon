var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
const fs = require('fs');
// var parser = require('xml2json');
//  const Parser = require('xml2js-parser');

// var parser = new Parser({trim: true});
var parseString = require('xml2js').parseString;
var xml = "<root>Hello xml2js!</root>"

app.get('/test', function (req, res) {
  parseString(xml, function (err, result) {
    res.send(result);
  });
});


app.get('/', function (req, res) {
  res.sendfile('public/index.html');
});

app.get('/posts', function (req, res) {
  fs.readFile(__dirname + '/assets/data/Posts.xml', function (err, xml) {
    //console.log(xml.toString());
    parseString(xml.toString(), function (err, result) {
      res.send(result);
    });
  })
});


app.get('/comments', function (req, res) {
  fs.readFile(__dirname + '/assets/data/Comments.xml', function (err, xml) {
    //console.log(xml.toString());
    parseString(xml.toString(), function (err, result) {
      res.send(result);
    });
  });
});



// var xml = "<foo attr=\"value\">bar</foo>";
// console.log("input -> %s", xml)

// // // xml to json 
// var json = parser.toJson(xml);
// console.log("to json -> %s", json);
// parser.parseString(xml, function(err, result){
//   console.dir(result);
//   res.send(JSON.stringify(result));
// });
// });
//   // var x={a:10};
//   // res.send(JSON.stringify(x));
// });

io.on('connection', function (socket) {
  console.log('a user connected');
});

http.listen(3000, function () {
  console.log('listening on *:3000');
});

// app.use('/bower_components',express.static('public/bower_components'));    
// app.use('/view1',express.static('public/view1'));
// app.use('/view2',express.static('public/view2'));    
// app.use('/components',express.static('public/components'));    
// app.use('/bower_components',express.static('public/bower_components'));
// app.use('/css',express.static('public/css'));    
app.use('/', express.static('public'));