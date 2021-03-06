module.exports = function(config, _, net){
    console.log('socket');
    require('./debuger.js');
    var connOpen = true;
    let buffer;


    function connect(dataCallback) {
        console.log('ATTEMPTING TO connect TO DCS');
        var request = _.get(config.serverObject, 'requestArray[0]',"none")+"\r\n";

        const client = net.createConnection({host: config.address, port: config.port}, () => {
            let time = new Date();
            console.log(time.getHours() + ':' + time.getMinutes() + ':' + time.getSeconds() + ' :: Connected to DCS server!');
            connOpen = false;
            buffer = "";
        });

        client.on('connect', function() {
            client.write("INIT"+"\n");
        });

        client.on('data', (data) => {
            buffer += data;
            while ((i = buffer.indexOf("\n")) >= 0) {
                let data = JSON.parse(buffer.substring(0, i));
                console.log("got data from DCS sending to clients now");

                for (let connection in config.wsConnections){
                    console.log("sending to " + config.wsConnections[connection]);
                    config.wsConnections[connection].send(JSON.stringify(data));
                }

                buffer = buffer.substring(i + 1);

            }
        });

        client.on('close', () => {
            time = new Date();
            // rdebug(time.getHours() + ':' + time.getMinutes() + ':' + time.getSeconds() + ' :: Reconnecting....');
			// ok we need a way to reset the data because DCS expects it to be clean if a connection is lost! so set the SERVER object list to 0 ie clean it out and wait.
			config.serverObject.length = 0
            connOpen = true;
        });

        client.on('error', (error) => {
            // rdebug('error!');
            console.log(error);
            connOpen = true;
        });

    }

    setInterval(function(){
        if (connOpen === true) {
            connect();
        }
    }, config.refreshrate * config.onesecond);

};
