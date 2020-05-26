(function() {

      angular.module('redIberia')

            .controller('leaderBoardController', ['$scope', '$rootScope', '$http', '$timeout', '$route', 'LeaderBoardFunctions',
                  function($scope, $rootScope, $http, $timeout,$route, LeaderBoardFunctions) {

                      $rootScope.pilotStatistics = [];
                      $scope.pilot;
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
                                    console.log(r);
                                    $rootScope.pilotStatistics = r;

                                }, 1000);


                            })

                        }
                        }, //end success
                        error: function(err) { console.log(err) }
                      }); //end ajax call


                      $scope.setPilot = function(i){
                          console.log(i);
                          $scope.pilot = i

                      }
                      $scope.convertMinsToHrsMins = function(mins) {
                          let h = Math.floor(mins / 3600);
                          let m = mins % 3600;
                          h = h < 10 ? '0' + h : h;
                          m = m < 10 ? '0' + m : m;
                          return `${h}:${m}`;
                        }

                        $scope.humanize = function(number) {

                                if(number % 100 >= 11 && number % 100 <= 13){
                                    return number + "th";
                                }


                                switch(number % 10) {
                                    case 1: return number + "st";
                                    case 2: return number + "nd";
                                    case 3: return number + "rd";
                                }
                                console.log(number);
                                return number + "th";
                            }

                  }
            ]);
}());
