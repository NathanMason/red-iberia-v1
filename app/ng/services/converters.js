(function() {
      angular.module("redIberia").factory("converterFactory", function($websocket) {

            var Data = {};

            Data.timeConvert = function(n) {
                console.log(n);
                var num = n;
                var hours = (num / 3600);
                var rhours = Math.floor(hours);
                var minutes = (hours - rhours) * 60;
                var rminutes = Math.round(minutes);

                return rhours + " hour(s) and " + rminutes + " minute(s).";
            }

            return Data;

      });

})();
