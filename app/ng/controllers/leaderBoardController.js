(function() {

      angular.module('redIberia')

            .controller('leaderBoardController', ['$scope', '$rootScope',
                  function($scope, $rootScope) {

                      $http({
                        url: "/api/web/fetch",
                        type: "POST",
                        dataType: "json",
                        data: {},
                        //on successful data reception, we can now show the data and make it all functional
                        success: function(data) {
                            console.log(data);
                          if (data === false) {
                            console.log('ERROR: Server could not return a valid database object.');
                            return;
                          }
                        }, //end success
                        error: function(err) { console.log(err) }
                      }); //end ajax call

                  }
            ]);
}());
