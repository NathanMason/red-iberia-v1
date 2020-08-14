(function() {
      angular.module("redIberia").service("converterFactory", function($websocket) {

            var Data = {};

            Data.timeConvert = function(n) {

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
