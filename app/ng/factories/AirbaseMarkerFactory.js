(function() {
      angular.module("redIberia").factory("AirbaseMarkerFactory", function($rootScope, $q, $filter, $document, $http, $timeout) {

            var AirbaseMarkerFactory = {};

            // sort out what airbases need thier markers updated,  or created
            AirbaseMarkerFactory.createMkr = function(e, cb) {
                    console.log(e);
                  $rootScope.keyData.airbases = {
                        type: 'FeatureCollection',
                        features: []
                  };
                  var promises = [];
                  angular.forEach(e, function(airBase, i) {

                        var q = $q.defer();
                        promises.push(q.promise);
                        var iconToUse;
                        if (airBase.coalition == 1 || airBase.coalition == 2) {
                              if (airBase.coalition == 1) {
                                    iconToUse = 'url("../../img/airport-red.png")'
                              } else {
                                    iconToUse = 'url("../../img/airport-blue.png")'
                              }
                              var mkrData = {
                                    type: 'Feature',
                                    geometry: {
                                          type: 'Point',
                                          coordinates: [airBase.lon, airBase.lat]
                                    },
                                    properties: {
                                          icon: {
                                                iconUrl: iconToUse,
                                                iconSize: '25px'
                                          },
                                          airbasename: airBase.airbasename,
                                          coalition: airBase.coalition,
                                          pressure: airBase.pressure,
                                          temp: airBase.temp,
                                          weatherstring: airBase.weatherstring,
                                          winddirection: airBase.winddirection,
                                          windstrength: airBase.windstrength
                                    },
                                    data: {
                                          airBase
                                    }
                              }
                              // console.log(mkrData);
                              $rootScope.keyData.airbases.features.push(mkrData)
                        }


                        // now print the airbase markers
                        AirbaseMarkerFactory.printMarkers(function(cb) {
                              q.resolve();
                        })

                  })
                  $q.all(promises).then(function() {
                        cb()
                  })
            }

            AirbaseMarkerFactory.printMarkers = function(cb) {

                  // delete all existing marker divs from the map.
                  $rootScope.keyData.airbaseMarkers.forEach((marker) => marker.remove());


                  var promises = [];

                  // create all new marker divs on the map.
                  angular.forEach($rootScope.keyData.airbases.features, function(airBase) {

                        var q = $q.defer();
                        promises.push(q.promise);

                        // create a marker for the unit.
                        var mkr = document.createElement('div');
                        angular.element(document.getElementsByTagName('body')).append(mkr);
                        mkr.id = airBase.properties.airbasename.split(' ').join('') + '_mkrID';
                        mkr.style.backgroundImage = airBase.properties.icon.iconUrl;
                        mkr.style.backgroundRepeat = 'no-repeat';
                        mkr.style.backgroundPosition = 'center center';
                        mkr.style.width = airBase.properties.icon.iconSize;
                        mkr.style.backgroundSize = 'contain';
                        mkr.style.height = airBase.properties.icon.iconSize;
                        mkr.style.cursor = 'pointer';
                        mkr.className = 'marker ' + airBase.properties.airbasename.split(' ').join('');


                        // add the units/markers click function.
                        mkr.addEventListener('click', function() {
                              $rootScope.keyData.map.flyTo({
                                    center: airBase.geometry.coordinates
                              });
                              $timeout(function() {

                                    $rootScope.keyData.selectedAirBase = airBase;

                                    $(".airBaseData").addClass("showAirBaseBar");
                              }, 100);
                        });

                        // now print the mrker to the map
                        var newMKR = new mapboxgl.Marker(mkr)
                              .setLngLat(airBase.geometry.coordinates)
                              .addTo($rootScope.keyData.map);
                        $rootScope.keyData.airbaseMarkers.push(newMKR)


                        q.resolve();

                  });
                  $q.all(promises).then(function() {
                        cb(200)
                  })



            }


            return AirbaseMarkerFactory;

      });

})();
