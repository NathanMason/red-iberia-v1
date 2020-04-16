(function() {
      angular.module("redIberia").factory("markerFactory", function($rootScope, $websocket, $q, MarkerFunctions, $filter, $document) {

            var MarkerFactory = {};



                // sort out what units need thier markers updated, deleted, or created
                MarkerFactory.sortMarkers = function(e) {

                    console.log(e);

                    var promises = [];
                    angular.forEach(e, function(unit, i) {


                        console.log(unit);

                        var q = $q.defer();
                        promises.push(q.promise);

                        // create unit and add to markers scope.
                        if (unit.action == 'C') {
                            MarkerFactory.addMarker(unit, function(cb){
                                q.resolve();
                            })
                        }

                        // create unit and add to markers scope.
                        else if (unit.action == 'U') {
                            MarkerFactory.updateMarker(unit, function(cb){
                                q.resolve();
                            })
                        }

                        // delete units markers.
                        else if (unit.action == 'D') {
                            MarkerFactory.deleteMarker(unit, function(cb){
                                q.resolve();
                            })
                        }

                    })
                    $q.all(promises).then(function() {

                        MarkerFactory.printMarkers();

                    })

                }

                // to be tested
                MarkerFactory.deleteMarker = function(unit, cb){
                    var marker = $filter('filter')($rootScope.markers.features, (item) =>{
                            return item.properties.uid === e.unitID;
                    })[0];
                    $rootScope.markers.features.splice(
                        $rootScope.markers.features.indexOf(marker),
                    1);
                    cb(200)
                }

                MarkerFactory.updateMarker = function(e, cb){
                    console.log('updating marker');

                    var marker = $filter('filter')($rootScope.markers.features, (item) =>{
                            return item.properties.uid === e.unitID;
                    })[0];

                    console.log(marker);
                    marker.geometry.coordinates = [e.lon, e.lat]
                    marker.data.speed = e.speed;
                    marker.data.heading =  e.heading;
                    marker.data.alt =  e.alt;

                    cb(200)
                }

                MarkerFactory.addMarker = function(unit, cb){
                    console.log('adding marker');
                    var mkrData = {
                          type: 'Feature',
                          geometry: {
                                type: 'Point',
                                coordinates: [unit.lon, unit.lat]
                          },
                          properties: {
                                icon: {
                                      iconUrl: MarkerFunctions.getMarkerImage('red', unit.type)
                                },
                                uid: unit.unitID
                          },
                          data: {
                                unit
                          }
                    }

                    $rootScope.markers.features.push(mkrData)
                    cb(200)



                }

                MarkerFactory.printMarkers = function(){
                    console.log('printing markers');

                    var promises = [];
                    angular.forEach($rootScope.markers.features, function(feature) {

                        var q = $q.defer();
                        promises.push(q.promise);

                        // check to see if the same marker on the map exists already if it does destroy it
                        if ( angular.element('#' + feature.properties.uid).length ) {
                            var currentMkr = angular.element('#' + feature.properties.uid);
                            console.log(currentMkr);
                            currentMkr[0].remove();
                        }

                        var mkr = document.createElement('div');
                            mkr.className = 'marker';
                            mkr.id = feature.properties.uid; // use this as a unique key
                            mkr.style.backgroundImage = feature.properties.icon.iconUrl;
                            mkr.style.width = '10px'; // 40px if not testing
                            mkr.style.backgroundSize = 'contain';
                            mkr.style.height = '10px'; // 40px if not testing

                            mkr.addEventListener('click', function() {
                                  window.alert(JSON.stringify(feature.data));
                            });

                            new mapboxgl.Marker(mkr)
                                  .setLngLat(feature.geometry.coordinates)
                                  .setRotation(feature.data.unit.heading)
                                  .addTo($rootScope.map);

                            q.resolve();

                    });
                    $q.all(promises).then(function() {

                        console.log('done');

                    })



                }

            return MarkerFactory;

      });

})();
