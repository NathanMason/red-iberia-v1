(function() {

      angular.module('redIberia')

            .controller('mainController', ['$scope', '$rootScope', 'SocketFactory', '$timeout', 'markerFactory', 'markerFilters',
                  function($scope, $rootScope, SocketFactory, $timeout, markerFactory, markerFilters) {

                      // set scopes
                      $rootScope.loadingAwacsData = true;
                      $rootScope.unitMarkers = [];
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
                      SocketFactory.launchSocket(function(socket) {

                              socket.onMessage(function(message) {

                                    var data = JSON.parse(message.data);
                                    markerFactory.sortMarkers(data.units);


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
