(function() {
      angular.module("redIberia")
        .factory("UnitMarkerFactory", [ '$rootScope', 'MarkerFunctions', 'unitLogic', '$q', function($rootScope, MarkerFunctions, unitLogic, $q) {

                var Data = {};

                Data.createMkr = function(o) {

                            // lets remove any existing markers
                            var promises = []
                            angular.forEach($rootScope.keyData.redMarkers.markerIds, function(i) {

                                var q = $q.defer();
                                promises.push(q.promise);
                                $('#' + i).remove();
                                q.resolve();
                            });

                            // now we can create the updated markers
                            $q.all(promises).then(function() {
                                $rootScope.keyData.markers = [];
                                //now lets create the new unit markers.
                                _.forEach(o, function(unit, key) {

                                          // set the markers geo data
                                          var mkrData = {
                                                type: 'Feature',
                                                geometry: {
                                                      type: 'Point',
                                                      coordinates: [unit.lon, unit.lat]
                                                },
                                                properties: {
                                                      icon: {
                                                            iconUrl: unitLogic.icon(unit.type),
                                                            iconSize: '25px'
                                                      },
                                                      uid: unit.groupname.replace(/\s/g,'').replace(/#/g,'_')
                                                },
                                                data: {
                                                      unit
                                                      // heading: unit.heading
                                                }
                                          }

                                          // add the marker to the markers rootscope object.
                                          $rootScope.keyData.redMarkers.unitData.push(mkrData)

                                          // now lets add the marker to the map
                                          var mkr = document.createElement('div');

                                          // now style the marker
                                          mkr.className = 'marker ' + mkrData.properties.uid;
                                          mkr.id = mkrData.properties.uid; // use this as a unique key
                                          mkr.style.backgroundImage = mkrData.properties.icon.iconUrl;
                                          mkr.style.backgroundRepeat = 'no-repeat';
                                          mkr.style.backgroundPosition = 'center center';
                                          mkr.style.width = mkrData.properties.icon.iconSize;
                                          mkr.style.backgroundSize = 'contain';
                                          mkr.style.height = mkrData.properties.icon.iconSize;
                                          mkr.style.cursor = 'pointer';

                                          // once styled we append the new div to the html body
                                          angular.element(document.getElementsByTagName('body')).append(mkr);

                                          var newUnit = new mapboxgl.Marker(mkr, {anchor: 'bottom'})
                                                .setLngLat(mkrData.geometry.coordinates)
                                                .addTo($rootScope.keyData.map);

                                                // lets store the markers so we can delete them.
                                                $rootScope.keyData.redMarkers.markerIds.push(mkrData.properties.uid)

                                });
                            })
                }

                Data.updateMkr = function(o) { }

                return Data;

        }]);

})();
