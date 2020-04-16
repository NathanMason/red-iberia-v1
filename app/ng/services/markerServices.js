(function() {
      angular.module("redIberia").service("MarkerFunctions", function($websocket, $q) {
          return {

                getMarkerImage: function(i, e){
                    // if (i == 'red') {
                    //   return '../../img/blue-' + e + '.png";
                    // }
                    // else if (i == 'blue') {
                    //   return 'url("../../img/blue-' + e + '.png")'
                    // }
                    // else {
                    //   return 'url("../../img/blue-' + e + '.png")';
                    // }
                    return 'url("../../img/temp-dot.png")';
                }

            };
      });

})();
