(function() {
      angular.module("redIberia").factory("AirbaseMarkerFactory", function($rootScope, $q, $filter, $document, $http, $timeout) {

            var AirbaseMarkerFactory = {};

            // sort out what airbases need thier markers updated,  or created
            AirbaseMarkerFactory.sortAirbaseMarkers = function(e, cb) {

                  var airBases = e.airbases;
                  var misisonData = e.misisondata;

                  $rootScope.airbases = {
                      type: 'FeatureCollection',
                      features: []
                  };

                  var promises = [];
                  angular.forEach(airBases, function(airBase, i) {

                        var q = $q.defer();
                        promises.push(q.promise);

                            if (airBase.coalition == 1 || airBase.coalition == 2) {
                              var mkrData = {
                                    type: 'Feature',
                                    geometry: {
                                          type: 'Point',
                                          coordinates: [airBase.lon, airBase.lat]
                                    },
                                    properties: {
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
                              $rootScope.airbases.features.push(mkrData)
                            }


                        // now print the airbase markers
                        AirbaseMarkerFactory.printAirbaseMarkers(function(cb) {
                              q.resolve();
                        })

                  })
                  $q.all(promises).then(function() {
                        cb()
                  })
            }

            AirbaseMarkerFactory.printAirbaseMarkers = function(cb) {

                  // delete all existing marker divs from the map.
                  $rootScope.airbaseMarkers.forEach((marker) => marker.remove());
                  $rootScope.airbaseMarkers = [];

                  var promises = [];

                  // create all new marker divs on the map.
                  angular.forEach($rootScope.airbases.features, function(airBase) {

                        var q = $q.defer();
                        promises.push(q.promise);

                        // create a marker for the unit.
                        var mkr = document.createElement('div');
                        angular.element(document.getElementsByTagName('body')).append(mkr);
                        mkr.className = 'marker ' + airBase.properties.airbasename;
                        mkr.id = airBase.properties.airbasename + '_mkrID';
                        mkr.style.width = '50px';
                        mkr.style.height = '50px';
                        mkr.style.borderRadius = '100px';
                        mkr.style.opacity = '0.5';
                        mkr.style.cursor = 'pointer';
                        if (airBase.properties.coalition == 1) {
                            mkr.style.backgroundColor = 'rgba(255,0,0,0.3)'
                        } else {
                            mkr.style.backgroundColor = 'rgba(	0, 128, 255,0.3)'
                        }

                        // add the units/markers click function.
                        mkr.addEventListener('click', function() {
                              $rootScope.map.flyTo({
                                    center: airBase.geometry.coordinates
                              });
                              $timeout(function() {

                                    $rootScope.selectedAirBase = airBase;
      
                                $(".airBaseData").addClass("showAirBaseBar");
                              }, 100);
                        });

                        // now print the mrker to the map
                        var newMKR = new mapboxgl.Marker(mkr)
                              .setLngLat(airBase.geometry.coordinates)
                              .addTo($rootScope.map);
                        $rootScope.airbaseMarkers.push(newMKR)


                        q.resolve();

                  });
                  $q.all(promises).then(function() {
                        cb(200)
                  })



            }


            return AirbaseMarkerFactory;

      });

})();
