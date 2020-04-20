module.exports = function(app){
    require('./config.js');
    var API = require('../api/db_api.js');
    app.get('/', function(req, res) {
      res.sendFile('index.html', {root : __dirname + '/app'});
    });

    //API for WEB View
    app.post('/api/web/fetch', (req, res) => {
      // rdebug('WEB Server Stats Requested: Sending the JSON object');
      res.json(API.getJson()); //send them the data they need
    });

    //API for SLSC Server
    //update the database with new info
    app.post('/api/dcs/slmod/update', (req, res) => {

      // rdebug('DCS Server Stats Received: "' + req.body.name + '", ID ' + req.body.id);
      var err = API.update(req.body); //send it the stats and server info
      if (err) {
        rdebug(err);
        res.end('fail');
      } else { res.end('pass') }

    });


};
