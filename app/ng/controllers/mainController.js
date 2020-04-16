(function() {

  angular.module('redIberia')

    .controller('mainController', ['$scope', '$rootScope', 'SocketFactory',
      function($scope, $rootScope, SocketFactory) {

          SocketFactory.launchSocket( function(socket){
              var collection = [];

              socket.onMessage(function(message) {
                    collection.push(JSON.parse(message.data));
                    var data = JSON.parse(message.data);
                    console.log(data);

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

              socket.onOpen(function(message) {
                    console.log(message);
              });
          });

          $scope.map = {
              zoom: 8,
              center: [ 42, 42 ]
          };

      }
    ]);
}());
