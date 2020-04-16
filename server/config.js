//////////////////////////////////////////////////////////////////////////
///////// our constants, these never change unless done by the user
//////////////////////////////////////////////////////////////////////////
module.exports = {
    port: 3001, // our port we listen to dcs on.
    address: "127.0.0.1", // our address
    net: require('net'), // we need net
    webport: 8080, // our webport
    serverlisten: 8081, // our pass through for the webserver
    showsides: true, // do we show sides.
    onesecond: 1000, // how many milliseconds to 1 second.
    refreshrate: 5, // our server refresh rate.logfile: 'nodeserver.log', // what do we set our log file for rdebug
    logfile: 'nodeserver.log', // what do we set our log file for rdebug
    forceconsole: false, // over rules local rdebug options and forces a console output
    serverObject: {},
    wsConnections: [],
    forcelogfile: false // over rules local rdebug options and forces a file output
}
