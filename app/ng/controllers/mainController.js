(function() {

      angular.module('redIberia')

            .controller('mainController', ['$scope', '$rootScope', 'SocketFactory', '$timeout',
                  function($scope, $rootScope, SocketFactory, $timeout) {

                        SocketFactory.launchSocket(function(socket) {
                              var collection = [];
                              $scope.markers = [];
                              socket.onMessage(function(message) {
                                    collection.push(JSON.parse(message.data));
                                    var data = JSON.parse(message.data);
                                    var geojson = {
                                          type: 'FeatureCollection',
                                          features: []
                                    }

                                    angular.forEach(data.units, function(unit) {
                                          if (unit.action = "C") {
                                                console.log(unit);
                                                var data = {
                                                      type: 'Feature',
                                                      geometry: {
                                                            type: 'Point',
                                                            coordinates: [unit.lon, unit.lat]
                                                      },
                                                      properties: {
                                                            icon: {
                                                                  iconUrl: '../../img/blue-f18.png'
                                                            }
                                                      },
                                                      data: {
                                                            unit
                                                      }
                                                }
                                                geojson.features.push(data)
                                          }

                                    })

                                    // remove all markers from map
                                    // currently causes all static units to disapear due to DCS not sending all units back after the initial call
                                    $(".marker").remove();

                                    // create new div's to represent markers
                                    geojson.features.forEach(function(marker) {
                                        console.log(marker);
                                          var el = document.createElement('div');
                                          el.className = 'marker';
                                          el.style.backgroundImage = 'url(img/blue-c130.png)'; // <- need to incorporate robs function
                                          el.style.width = '48px';
                                          el.style.backgroundSize = 'contain';
                                          el.style.height = '48px';
                                          el.addEventListener('click', function() {
                                                window.alert(JSON.stringify(marker.data));
                                          });

                                          // aadd the new divs to the map as markers
                                          new mapboxgl.Marker(el)
                                                .setLngLat(marker.geometry.coordinates)
                                                .setRotation(marker.data.unit.heading)
                                                .addTo($rootScope.map);
                                    });

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
                              style: 'mapbox://styles/boozer/ck8zc1c2t08u51iqv1dwjp2dr'
                        });


                  }
            ]);
}());
