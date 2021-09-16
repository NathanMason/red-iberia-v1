module.exports = function(data){
    var gci = require('./gciData');
    var _ = require('lodash');
    var socketData = {};
    var shuffle = function(e){
        return e.sort(() => 0.5 - Math.random());
    }

        // lets remove air units except for players
         _.remove(data.units, (item) => item.category == 'Air' && item.playername == "")

        // lets remove excess ground units
        // _.remove(data.units, (item) => item.category == 'Ground')

        // lets remove excess Ship units
        _.remove(data.units, (item) => item.category == 'Ship' && !item.displayname.includes('CVN'))

        // lets remove excess Heli units
        _.remove(data.units, (item) => item.category == 'Heli' && item.playername == "")

        // lets get random amount of scud intel
        data.scud = shuffle(data.scud).slice(0,_.random(3, 15));

        // lets get random amount of ewintel intel
        data.ewintel = shuffle(data.ewintel).slice(0,_.random(3, 15));

        // lets get random amount of iran intel
        data.iran = shuffle(data.iran).slice(0,_.random(3, 10));

        // lets get random amount of sams intel
        data.sams = shuffle(data.sams).slice(0,_.random(3, 10));

        // store the data so we can send it to new clients between data updates.
        gci.dataCollection = data;
		//console.log(data);
}
