
// what do you want to call your Web Server?
const name = 'Task Group Warrior Flight Log'; // default: '229th Flight Log'



// do you need to run the server on a specific port?
const port = 8080; // default: 4000



// what is the name of the image you have stored in views/assets
//  that will be displayed in the page header?
const logo = 'patch.png'; // default: 'patch.png'



/*
  EDIT TOKENS BELOW ACCORDING TO YOUR NEEDS
    i.e. if you have 2 game servers posting to this app
    then give them each a token. You will need to share
    the id and token manually to its respective game server

    default:
      "0": "token_for_server_0",
      "1": "token_for_server_1"
*/
const tokens = {
  "0": "token_for_server_0",
  "1": "token_for_server_1"
};



// What do you want to search to try to find a default player name?
// This code will find '229) ' in (A/229) Huckleberry, and set that as their default player name.
// Otherwise, it will be the last name in their list of names
const handleTag = 'Rob'; // note, if you dont want to use it, just make it something really obscure like '%#^$(*HHHJKV*())'

// Do you want to enable the button to show the stats in Tree View?
// NOTE: This is resource intensive, and freezes some browsers while the tree is generated
const treeView = true; // default: true


// This needs to be sufficiently large to fit a growing slmod dataset
const postJsonSizeLimit = '20mb'; // default: '20mb'


// what do you want to call your database?
const databaseName = 'db'; // default: 'db'

// what do you want to call your backup database?
const backupDatabaseName = 'db_backup'; // default: 'db_backup'


//////////////////////////////////////////////////////////////////////////
///////// our constants, these never change unless done by the user
//////////////////////////////////////////////////////////////////////////
module.exports = {
    connectedToDCS: false,
    gotDCSdata: false,
    port: 3009, // our port we listen to dcs on.
    address: "127.0.0.1", // our address
    net: require('net'), // we need net
    webport: 8080, // our webport
    serverlisten: 8081, // our pass through for the webserver
    showsides: true, // do we show sides.
    onesecond: 1000, // how many milliseconds to 1 second.
    refreshrate: 3, // our server refresh rate.logfile: 'nodeserver.log', // what do we set our log file for rdebug
    logfile: 'nodeserver.log', // what do we set our log file for rdebug
    forceconsole: false, // over rules local rdebug options and forces a console output
    serverObject: {},
    wsConnections: [],
    forcelogfile: false, // over rules local rdebug options and forces a file output
    getName: function() { return name },
    getLogo: function() { return logo },
    getPort: function() { return port },
    getTokens: function() { return tokens },
    getDB: function() { return databaseName },
    getAircraft: function() { return aircraft },
    getHandleTag: function() { return handleTag },
    getTreeView: function() { return treeView },
    getBDB: function() { return backupDatabaseName },
    getKillObjects: function() { return killObjects },
    getPostJsonSizeLimit: function() { return postJsonSizeLimit }
}
