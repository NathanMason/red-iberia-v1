module.exports = function(config, _, net){
    console.log('socket');
    require('./debuger.js');
    var dataFactory = require('./dataFactory.js');
    var connOpen = true;
    let buffer;
    var gci = require('./gciData'); // variables and constants
    var time = new Date();

    function connect(dataCallback) {

        console.log(time.getHours() + ':' + time.getMinutes() + ':' + time.getSeconds() + ' ::  ATTEMPTING TO connect TO DCS');
        var request = _.get(config.serverObject, 'requestArray[0]',"none")+"\r\n";

        const client = net.createConnection({host: config.address, port: config.port}, () => {
            let time = new Date();
            console.log(time.getHours() + ':' + time.getMinutes() + ':' + time.getSeconds() + ' :: Connected to DCS server!');
            connOpen = false;
            buffer = "";
        });

        // our server just connected to DCS
        client.on('connect', function() {
            client.write("INIT"+"\n");
        });

        // we just got data from DCS
        client.on('data', (data) => {
            console.log(time.getHours() + ':' + time.getMinutes() + ':' + time.getSeconds() + ' ::  received data from DCS to node server');
            buffer += data;
            while ((i = buffer.indexOf("\n")) >= 0) {

                //lets buff the data
                let data = JSON.parse(buffer.substring(0, i));
                gci.status = 'ready';
                dataFactory(data)

                buffer = buffer.substring(i + 1);

            }
        });

        client.on('close', () => {

            console.log(time.getHours() + ':' + time.getMinutes() + ':' + time.getSeconds() + ' ::  connection to DCS closed');
			// ok we need a way to reset the data because DCS expects it to be clean if a connection is lost! so clear the SERVER object.
			config.serverObject = {} // never manually change the length of an object, just clear the obj like this {}
            connOpen = true;
        });

        client.on('error', (error) => {
            console.log(error);
            console.log(time.getHours() + ':' + time.getMinutes() + ':' + time.getSeconds() + ' ::  connection to DCS triggered an error');
            connOpen = true;
        });

    }

    setInterval(function(){
        if (connOpen === true) {
            connect();
        }
    }, config.refreshrate * config.onesecond);

};
