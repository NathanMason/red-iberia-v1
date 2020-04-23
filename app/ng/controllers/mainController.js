(function() {

      angular.module('redIberia')

            .controller('mainController', ['$scope', '$rootScope', 'SocketFactory', '$timeout', 'UnitMarkerFactory', 'markerFilters', '$route',
                  function($scope, $rootScope, SocketFactory, $timeout, UnitMarkerFactory, markerFilters, $route) {

                      // set scopes
                      $rootScope.loadingAwacsData = true;
                      $rootScope.unitMarkers = [];
                      $rootScope.airbaseMarkers = [];
                      $rootScope.missionData = [];
                      $rootScope.$route = $route;
                      $rootScope.markers = {
                          type: 'FeatureCollection',
                          features: []
                      };
                      $rootScope.airbases = {
                          type: 'FeatureCollection',
                          features: []
                      };
                      // IDEA: store in localStorage to keep filters alive for the client.
                      $rootScope.filters = {
                          Air: true,
                          Ground: true,
                          Ship: true
                      }
                      // console.log($rootScope.filters);
                      $rootScope.missioninfo = {};
                      SocketFactory.launchSocket(function(socket) {

                              socket.onMessage(function(message) {

                                    var data = JSON.parse(message.data);
                                    // console.log(data);
                                    UnitMarkerFactory.sortMarkers(data);
                                    $rootScope.missiondata = data.missiondata; // we need the missiondata to be globally accessable

                              });

                              socket.onOpen(function(message) {
                                    //// console.log(message);
                              });
                        });

                        $scope.toggleFilter = function(i){
                            // console.log('toggle');
                            markerFilters.setUnitFilter(i)

                        }
                        $scope.close_airBaseData = function(i){
                            // console.log('toggle');
                            $(".airBaseData").removeClass("showAirBaseBar");

                        }

                        mapboxgl.accessToken = 'pk.eyJ1IjoiYm9vemVyIiwiYSI6ImNrOHpidzU3bzA0eGMza29sdTJ6cmdmcXMifQ.iNvCN8OHOmQr95a_OkNLUQ';
                        $rootScope.map = new mapboxgl.Map({
                              container: 'map',
                              center: [42.422,41.600],
                              zoom: 7.38,
                              style: 'mapbox://styles/boozer/ck9c3ojrh06lv1ipcfjqffqiz'
                        });

                  }
            ]);
}());
