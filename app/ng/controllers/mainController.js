(function() {

      angular.module('redIberia')

            .controller('mainController', ['$scope', '$rootScope', 'SocketFactory', '$timeout', 'UnitMarkerFactory', 'markerFilters', '$route', 'AirbaseMarkerFactory', 'PlayerFactory',
                  function($scope, $rootScope, SocketFactory, $timeout, UnitMarkerFactory, markerFilters, $route, AirbaseMarkerFactory, PlayerFactory) {

                        // set scopes
                        $rootScope.$route = $route;
                        mapboxgl.accessToken = 'pk.eyJ1IjoiYm9vemVyIiwiYSI6ImNrOHpidzU3bzA0eGMza29sdTJ6cmdmcXMifQ.iNvCN8OHOmQr95a_OkNLUQ';
                        $rootScope.keyData = {
                              filters: {
                                    Sead: true,
                                    Scud: true,
                                    Awacs: true,
                                    Strike: true
                              },
                              humanPilots: [],
                              redMarkers: {
                                  unitData: [],
                                  markerIds: []
                              },
                              airbases: {
                                    type: 'FeatureCollection',
                                    features: [],
                                    markers: []
                              },
                              loadingAwacsData: true,
                              unitMarkers: [],
                              popup: {},
                              airbaseMarkers: [],
                              missiondata: [],
                              map: new mapboxgl.Map({
                                    container: 'map',
                                    center: [56.39, 26.67],
                                    zoom: 7.4,
                                    style: 'mapbox://styles/boozer/ck9c3ojrh06lv1ipcfjqffqiz'
                              })
                        }
                        $rootScope.loadingAwacsData = true;
                        $rootScope.moveToUnit = function(i) {
                              console.log(i);
                              $rootScope.keyData.map.flyTo({
                                    center: i.geometry.coordinates
                              });
                              var element = document.getElementById(i.properties.uid);
                              $timeout(function() {
                                    element.click()
                              }, 100);

                        }

                        var airbaseLoaded = false;

                        $rootScope.missioninfo = {};
                        $rootScope.gciPending = true;
                        $rootScope.loadingAwacsData = true;
                        SocketFactory.launchSocket(function(socket) {

                              socket.onMessage(function(message) {
                                    var data = JSON.parse(message.data);
                                    var dataStatus = JSON.stringify(data)
                                    console.log(data);
                                    if (data.missiondata) {

                                          $rootScope.gciPending = false;
                                          $rootScope.loadingAwacsData = false;
                                          $rootScope.keyData.missiondata = data.missiondata; // we need the missiondata to be globally accessable

                                          if (airbaseLoaded == false) {
                                              AirbaseMarkerFactory.createMkr(data.airbases, function(r){
                                                  airbaseLoaded = true;
                                              });
                                          }
                                          PlayerFactory.sortPlayers(data.units)
                                          UnitMarkerFactory.createMkr(data.ewintel);
                                          UnitMarkerFactory.createMkr(data.iran);
                                          UnitMarkerFactory.createMkr(data.sams);
                                          UnitMarkerFactory.createMkr(data.scud);

                                          console.log($rootScope.keyData.humanPilots);
                                    }
                              });
                              socket.onOpen(function(message) {
                                    console.log(message);
                              });

                        });

                        $scope.toggleFilter = function(i) {
                              // console.log('toggle');
                              markerFilters.setUnitFilter(i)

                        }
                        $scope.close_airBaseData = function(i) {
                              // console.log('toggle');
                              $(".airBaseData").removeClass("showAirBaseBar");

                        }

                  }
            ]);
}());
