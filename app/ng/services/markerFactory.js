(function() {
      angular.module("redIberia").factory("markerFactory", function($rootScope, $websocket, $q, MarkerFunctions, $filter, $document, $http) {

            var MarkerFactory = {};



                // sort out what units need thier markers updated, deleted, or created
                MarkerFactory.sortMarkers = function(e) {

                    var promises = [];
                    angular.forEach(e, function(unit, i) {
                        console.log(e);
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

                    var marker = $filter('filter')($rootScope.markers.features, (item) =>{
                            console.log(item.properties.uid === e.unitID);
                            return item.properties.uid === e.unitID;
                    })[0];
                    marker.geometry.coordinates = [e.lon, e.lat]
                    marker.data.speed = e.speed;
                    marker.data.heading =  e.heading;
                    marker.data.alt =  e.alt;

                    cb(200)
                }

                MarkerFactory.addMarker = function(unit, cb){
                    var mkrIcon;
                    var mkrSize;
                    MarkerFunctions.getMarkerImage(unit.coalition, unit.type, function(r){

                        mkrIcon = r.src;
                        mkrSize = r.size;

                        var mkrData = {
                          type: 'Feature',
                          geometry: {
                                type: 'Point',
                                coordinates: [unit.lon, unit.lat]
                          },
                          properties: {
                                icon: {
                                      iconUrl: mkrIcon,
                                      iconSize: mkrSize
                                },
                                uid: unit.unitID
                          },
                          data: {
                                unit
                          }
                    }
                        $rootScope.markers.features.push(mkrData)
                        cb(200)
                    })
                }

                MarkerFactory.printMarkers = function(){

                    var promises = [];
                    angular.forEach($rootScope.markers.features, function(feature) {

                        var q = $q.defer();
                        promises.push(q.promise);

                        // check to see if the same marker on the map exists already if it does destroy it
                        if ( angular.element('#' + feature.properties.uid).length ) {
                            var currentMkr = angular.element('#' + feature.properties.uid);
                            currentMkr[0].remove();
                        }

                        var mkr = document.createElement('div');
                            mkr.className = 'marker';
                            mkr.id = feature.properties.uid; // use this as a unique key
                            mkr.style.backgroundImage = feature.properties.icon.iconUrl;
                            mkr.style.backgroundRepeat = 'no-repeat';
                            mkr.style.backgroundPosition = 'center center';
                            mkr.style.width = feature.properties.icon.iconSize; // 40px if not testing
                            mkr.style.backgroundSize = 'contain';
                            mkr.style.height = feature.properties.icon.iconSize; // 40px if not testing

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
