(function() {

      angular.module('redIberia')

            .controller('mainController', ['$scope', '$rootScope', 'SocketFactory', '$timeout', 'UnitMarkerFactory', 'markerFilters', '$route',
                  function($scope, $rootScope, SocketFactory, $timeout, UnitMarkerFactory, markerFilters, $route) {

                        // set scopes
                        $rootScope.$route = $route;
                        mapboxgl.accessToken = 'pk.eyJ1IjoiYm9vemVyIiwiYSI6ImNrOHpidzU3bzA0eGMza29sdTJ6cmdmcXMifQ.iNvCN8OHOmQr95a_OkNLUQ';
                        $rootScope.keyData = {
                              filters: {
                                    Air: true,
                                    Ground: true,
                                    Ship: true
                              },
                              humanPilots: [],
                              markers: {
                                    type: 'FeatureCollection',
                                    features: []
                              },
                              airbases: {
                                    type: 'FeatureCollection',
                                    features: []
                              },
                              samTargets: {
                                    type: 'FeatureCollection',
                                    features: []
                              },
                              scudTargets: {
                                    type: 'FeatureCollection',
                                    features: []
                              },
                              staticTargets: {
                                    type: 'FeatureCollection',
                                    features: []
                              },
                              loadingAwacsData: true,
                              unitMarkers: [],
                              popup: {},
                              airbaseMarkers: [],
                              staticTargetsMarkers: [],
                              samTargetsMarkers: [],
                              scudTargetsMarkers: [],
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
                        // console.log($rootScope.filters);
                        $rootScope.missioninfo = {};

                        SocketFactory.launchSocket(function(socket) {

                              socket.onMessage(function(message) {
                                    var data = JSON.parse(message.data);
                                    var dataStatus = JSON.stringify(data)
                                    console.log(dataStatus);
                                    console.log(data);
                                    if (dataStatus == "pending") {
                                          $rootScope.gciPending = true;
                                          $rootScope.loadingAwacsData = true;
                                    } else {
                                          $rootScope.gciPending = false;
                                          $rootScope.loadingAwacsData = false;
                                          UnitMarkerFactory.sortMarkers(data);
                                          $rootScope.keyData.missiondata = data.missiondata; // we need the missiondata to be globally accessable
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
