(function() {

      angular.module('redIberia')

            .controller('leaderBoardController', ['$scope', '$rootScope', '$http', '$timeout', '$route',
                  function($scope, $rootScope, $http, $timeout,$route) {

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
                            console.log(data);
                            $timeout(function(){
                                $rootScope.pilotStatistics = data[0].stats;
                            }, 100);
                        }
                        }, //end success
                        error: function(err) { console.log(err) }
                      }); //end ajax call


                      $scope.totalDisplayed = 10;

                      $scope.loadMore = function () {
                        $scope.totalDisplayed += 10;
                      };

                  }
            ]);
}());
