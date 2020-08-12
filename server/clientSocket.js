module.exports = function(){
    var gci = require('./gciData');
    var config = require('./config');
    var websocket = require('nodejs-websocket');
    var time = new Date();
    var server = websocket.createServer(function (conn) {

        // save the new client connection
        config.wsConnections.push(conn);
        console.log(time.getHours() + ':' + time.getMinutes() + ':' + time.getSeconds() + ' :: New Client Connected');

        // send the first package to the client
        if (gci.status = 'pending') {
            conn.send(JSON.stringify('pending'));
        } else {
            conn.send(JSON.stringify(gci.dataCollection));
        }


        // when the client leaves
        conn.on("close", function (code, reason) {
            config.wsConnections.splice(config.wsConnections.indexOf(conn), 1);
            console.log(time.getHours() + ':' + time.getMinutes() + ':' + time.getSeconds() + ' ::  Client Disconected');
            console.log(' +  '  + reason);
        });

        // the socket that sends the data to the client
        conn.on('message', function incoming(data) {
            conn.clients.forEach(function each(client) {
              console.log(conn.clients);
            if (client.readyState === WebSocket.OPEN) {
                time = new Date();
              console.log(time.getHours() + ':' + time.getMinutes() + ':' + time.getSeconds() + ' ::  Data sent to a client');
              client.send(data);
            }
          })
        });

        conn.on('error', function incoming(error) {
            time = new Date();
          console.log(time.getHours() + ':' + time.getMinutes() + ':' + time.getSeconds() + ' :: Client connection  Error');
          console.log(error);
          console.log('-----------------');
        });
    });

    server.listen(config.serverlisten);

}
