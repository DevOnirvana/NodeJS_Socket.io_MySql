var express = require('express'),
    app = express(),
    http = require('http'),
    server = http.createServer(app),
    io = require('socket.io').listen(server);
    mysql = require('mysql');

//listening to port 3000

server.listen(3000, function(err){
    if(err)
      throw err;
    else {
      console.log('Server listening on port 3000');
    }
});

//the default route

app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
  });

var config={
          host : 'db.sql.priceboard.in',
          port : 3306,
          user : 'root',
          password : 'Anirban95',
          database : 'messages'
        }

  // estabhlishment of connection using socket.io

io.sockets.on('connection', function(socket){
  socket.on('send message', function(data){
      var b64 =  new Buffer(data).toString('base64');
      var unicode = new Buffer(b64, 'base64').toString();
      console.log('The value entered by the client is :',unicode);
      console.log('The value entered by the client in base64 is :',b64);
      io.sockets.emit('new message', b64);        

      // connect to mysql server

      socket.on('success message', function(data) {
          var connection = mysql.createConnection(config);
          connection.on('error', function (err) {
            console.log(err)
          });
          connection.connect();                     
          // save success message in database
          var post = {msg:'Success message Recorded'};
          var query = connection.query('INSERT INTO message SET ?', post);
          connection.end();

                });     
              });
            });
