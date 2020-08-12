module.exports = function(data){
    var gci = require('./gciData');

        //filter the data


        // store the data so we can send it to new clients between data updates.
        gci.dataCollection = data;

}
