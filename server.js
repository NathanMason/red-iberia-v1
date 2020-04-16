//////////////////////////////////////////////////////////////////////////
///////// THRIDPARTY PACKAGES
//////////////////////////////////////////////////////////////////////////
const bodyParser = require('body-parser');
const path = require('path');
var express = require('express');
var log_stdout = process.stdout;
var _ = require('lodash');
const net = require('net')
var websocket = require('nodejs-websocket');
//////////////////////////////////////////////////////////////////////////
///////// SET EXPRESS
//////////////////////////////////////////////////////////////////////////
var app = express();

//////////////////////////////////////////////////////////////////////////
///////// SET SOCKET
//////////////////////////////////////////////////////////////////////////
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.set('view engine', 'html');

//////////////////////////////////////////////////////////////////////////
///////// FOLDER STRUCTURE
//////////////////////////////////////////////////////////////////////////
app.use('/', express.static(__dirname + '/app'));
app.use('server', express.static(__dirname + '/server'));
app.use('/node_modules', express.static(__dirname + '/node_modules'));
app.use('/bower_components', express.static(__dirname + '/bower_components'));


app.set('views', __dirname + '/');

//////////////////////////////////////////////////////////////////////////
///////// IMPORT MODULES
//////////////////////////////////////////////////////////////////////////
var config = require('./server/config'); // variables and constants
require('./server/routes.js')(app); //server routes
require('./server/debuger.js'); //server routes
var socket = require('./server/socket.js');


//////////////////////////////////////////////////////////////////////////
///////// SETUP AND CREATE SOCKET
//////////////////////////////////////////////////////////////////////////
var server = websocket.createServer(function (conn) {

    let time = new Date();
    console.log(time.getHours() + ':' + time.getMinutes() + ':' + time.getSeconds() + ' :: <- Client connected');
    config.wsConnections.push(conn);

    conn.on("close", function (code, reason) {
        config.wsConnections.splice(config.wsConnections.indexOf(conn), 1);
        time = new Date();
        console.log(' :: -> Client disconnected');
        console.log(' +  '  + reason);
    });

    conn.on('message', function incoming(data) {
      console.log(data);
      conn.clients.forEach(function each(client) {
          console.log(conn.clients);
        if (client.readyState === WebSocket.OPEN) {
          client.send(data);
        }
      })
    });
    conn.on('error', function incoming(error) {
      console.log('error  ' + error);
    });
});
server.listen(config.serverlisten);

//////////////////////////////////////////////////////////////////////////
///////// LAUNCH THE SERVER
//////////////////////////////////////////////////////////////////////////
app.listen(config.webport);
socket(config, _, net)
