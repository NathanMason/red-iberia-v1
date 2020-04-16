    function rdebug(debuginfo,consolelogging = true,filelogging = true) {
      var dcDate = new Date();
      var datestring = dcDate.toISOString();
      if ((consolelogging == true) || (forceconsole == true)){
        console.log(datestring + ':' + debuginfo);
      }
      if ((filelogging == true) || (forcelogfile == true)){
        fs.appendFile(logfile,datestring + ":",'utf8', function(err){ if (err) throw err; });
        fs.appendFile(logfile,util.format(debuginfo) + "\n",'utf8',
        // callback function
        function(err) {  if (err) throw err; }
      );
      }
    }

    exports.rdebug = rdebug;
