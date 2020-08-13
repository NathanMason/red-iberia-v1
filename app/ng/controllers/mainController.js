(function() {

      angular.module('redIberia')

            .controller('mainController', ['$scope', '$rootScope', 'SocketFactory', '$timeout', 'UnitMarkerFactory', 'markerFilters', '$route', 'AirbaseMarkerFactory',
                  function($scope, $rootScope, SocketFactory, $timeout, UnitMarkerFactory, markerFilters, $route, AirbaseMarkerFactory) {

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
                              redMarkers: {
                                  unitData: [],
                                  markerIds: []
                              }, // storage to hold marker divs that are not airbases or humans
                              airbases: {
                                    type: 'FeatureCollection',
                                    features: [],
                                    markers: []
                              }, // storage for airbase data and markers
                              loadingAwacsData: true,
                              unitMarkers: [], // storage for human data and markers
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

                        $rootScope.missioninfo = {};
                        $rootScope.gciPending = true;
                        $rootScope.loadingAwacsData = true;
                        SocketFactory.launchSocket(function(socket) {

                              socket.onMessage(function(message) {
                                    var data = JSON.parse(message.data);
                                    var dataStatus = JSON.stringify(data)
                                    console.log(dataStatus);
                                    if (data.missiondata) {

                                          $rootScope.gciPending = false;
                                          $rootScope.loadingAwacsData = false;
                                          $rootScope.keyData.missiondata = data.missiondata; // we need the missiondata to be globally accessable


                                          AirbaseMarkerFactory.createMkr(data.airbases, function(r){});
                                          UnitMarkerFactory.createMkr(data.ewintel);
                                          UnitMarkerFactory.createMkr(data.iran);
                                          UnitMarkerFactory.createMkr(data.sams);
                                          UnitMarkerFactory.createMkr(data.scud);


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
