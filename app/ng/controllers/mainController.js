(function() {

      angular.module('redIberia')

            .controller('mainController', ['$scope', '$rootScope', 'SocketFactory', '$timeout', 'markerFactory', 'markerFilters', '$route',
                  function($scope, $rootScope, SocketFactory, $timeout, markerFactory, markerFilters, $route) {

                      // set scopes
                      $rootScope.loadingAwacsData = true;
                      $rootScope.unitMarkers = [];
                      $rootScope.$route = $route;
                      $rootScope.markers = {
                          type: 'FeatureCollection',
                          features: []
                      };
                      // IDEA: store in localStorage to keep filters alive for the client.
                      $rootScope.filters = {
                          Air: true,
                          Ground: true,
                          Ship: true
                      }
                      console.log($rootScope.filters);
                      $rootScope.missioninfo = {};
                      SocketFactory.launchSocket(function(socket) {

                              socket.onMessage(function(message) {

                                    var data = JSON.parse(message.data);
                                    console.log(data);
                                    markerFactory.sortMarkers(data.units);
                                    $rootScope.missiondata = data.missiondata; // we need the missiondata to be globally accessable

                              });

                              socket.onOpen(function(message) {
                                    //console.log(message);
                              });
                        });

                        $scope.toggleFilter = function(i){
                            console.log('toggle');
                            markerFilters.setUnitFilter(i)

                        }


                        mapboxgl.accessToken = 'pk.eyJ1IjoiYm9vemVyIiwiYSI6ImNrOHpidzU3bzA0eGMza29sdTJ6cmdmcXMifQ.iNvCN8OHOmQr95a_OkNLUQ';
                        $rootScope.map = new mapboxgl.Map({
                              container: 'map',
                              center: [41.7, 42],
                              zoom: 9,
                              style: 'mapbox://styles/boozer/ck948f65d1ckg1inhbtw2t1zc'
                        });


                  }
            ]);
}());
