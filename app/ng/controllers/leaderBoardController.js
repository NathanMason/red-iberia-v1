(function() {

      angular.module('redIberia')

            .controller('leaderBoardController', ['$scope', '$rootScope', '$http', '$timeout', '$route', 'LeaderBoardFunctions',
                  function($scope, $rootScope, $http, $timeout,$route, LeaderBoardFunctions) {

                      $rootScope.pilotStatistics = [];
                      $rootScope.$route = $route;
                       $.ajax({
                        url: "/api/web/fetch",
                        type: "POST",
                        dataType: "json",
                        data: {},
                        //on successful data reception, we can now show the data and make it all functional
                        success: function(data) {
                          if (data === false) {
                            console.log('ERROR: Server could not return a valid database object.');
                            return;
                        } else {
                            LeaderBoardFunctions.sortPilotStats(data[0].stats, function(r){

                                $timeout(function(){
                                    $rootScope.pilotStatistics = r;
                                }, 100);


                            })

                        }
                        }, //end success
                        error: function(err) { console.log(err) }
                      }); //end ajax call

                  }
            ]);
}());
