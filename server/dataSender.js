module.exports = function(){
    var gci = require('./gciData'),
        config = require('./config'),
        time = new Date(),
        sendCount = 0;

    setInterval(function(){
        if (config.connectedToDCS && config.gotDCSdata) {

            console.log(config.wsConnections.length + ' send cnt ' + sendCount);
            sendCount++
            if (sendCount > 5) {
                sendCount = 0;

                    for (let connection in config.wsConnections){
                        console.log(time.getHours() + ':' + time.getMinutes() + ':' + time.getSeconds() + ' :: Sending data to client #' + connection);
                        config.wsConnections[connection].send(JSON.stringify(gci.dataCollection));
                    }

            }
        }
    },1200); //60000

}
