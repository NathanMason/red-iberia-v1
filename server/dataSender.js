module.exports = function(){
    var gci = require('./gciData');
    var config = require('./config');
    var time = new Date();
    var sendCount = 0;
    setInterval(function(){
        console.log(config.wsConnections.length + ' send cnt ' + sendCount);
        sendCount++
        if (sendCount > 5) {
            sendCount = 0;

                for (let connection in config.wsConnections){
                    console.log(time.getHours() + ':' + time.getMinutes() + ':' + time.getSeconds() + ' :: Sending data to clients');
                    config.wsConnections[connection].send(JSON.stringify(gci.dataCollection));
                }

        }
    },1200); //60000

}
