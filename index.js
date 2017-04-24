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
        console.log('Happy Returns');
      }
  });

  //the default route

    app.get('/', function(req, res){
      res.sendFile(__dirname + '/index.html');
    });

    // estabhlishment of connection using socket.io

  io.sockets.on('connection', function(socket){
    socket.on('send message', function(data){
        var b64 =  new Buffer(data).toString('base64');
        var unicode = new Buffer(b64, 'base64').toString();
        console.log('The value entered by the client is :',unicode);
        console.log('The value entered by the client in base64 is :',b64);
        io.sockets.emit('new message', b64);
        socket.on('success message', function(data) {

          // connect to mysql server

        var config={
              host : '127.0.0.1',
              user : 'root',
              password : 'Mfaraday',
              database : 'messages'
            }
        var connection = mysql.createConnection(config);
            connection.connect(function(err){
                if(err)
                {
                  throw err;;
                }
                else{
                  console.log('MySql server is Connected');
                }
              });

              // save success message in database

                  var post = {msg:'Success Recorded'};
                  var query = connection.query('INSERT INTO message SET ?', post, function(err) {

                                      if (err)
                                    {
                                      throw err;
                                    }
                                      else{
                                        console.log('data is added');
                                      }
                                      connection.end(function(err){
                                          if(err){
                                            console.log(err);
                                          }
                                          else{
                                            //disconnect server                                          
                                            console.log('MySql disconnected');
                                          }

                                        });

                                            });

                              });
                    });
          });
