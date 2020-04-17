(function() {
      angular.module("redIberia").factory("MarkerFunctions", function($websocket, $q, $http, $window, $location ) {

          return {
                getMarkerImage: function(i, e, cb){
                    var side;
                    if (i == 1) {
                        side = 'blue-'
                    } else if( i == 2){
                        side = 'red-'
                    } else {
                        side = 'unknown-'
                    }
                    switch (e) {
                        case 'F-16C_50':
                            var data = {
                                src: 'url("../../img/' + side + 'jet.png")',
                                size: '30px'
                            }
                            cb(data);
                            break;

                        default:
                        var data = {
                            src: 'url("../../img/unknown.png")',
                            size: '5px'
                        }
                            cb(data);
                            break;
                    }

                }

            };
      });

})();
