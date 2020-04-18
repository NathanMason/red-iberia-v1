(function() {

      angular.module('redIberia')

            .controller('mainController', ['$scope', '$rootScope', 'SocketFactory', '$timeout', 'markerFactory',
                  function($scope, $rootScope, SocketFactory, $timeout, markerFactory) {

                      // $rootScope.loadingAwacsData = true;
                      // create Marker scopes
                      $rootScope.markers = {
                          type: 'FeatureCollection',
                          features: []
                      };

                        SocketFactory.launchSocket(function(socket) {

                              socket.onMessage(function(message) {
                                    var data = JSON.parse(message.data);
                                    markerFactory.sortMarkers(data.units);


                              });

                              socket.onOpen(function(message) {
                                    console.log(message);
                              });
                        });

                        mapboxgl.accessToken = 'pk.eyJ1IjoiYm9vemVyIiwiYSI6ImNrOHpidzU3bzA0eGMza29sdTJ6cmdmcXMifQ.iNvCN8OHOmQr95a_OkNLUQ';
                        $rootScope.map = new mapboxgl.Map({
                              container: 'map',
                              center: [42, 42],
                              zoom: 7,
                              style: 'mapbox://styles/boozer/ck948f65d1ckg1inhbtw2t1zc'
                        });


                  }
            ]);
}());
