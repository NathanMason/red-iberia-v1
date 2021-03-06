(function() {
      angular.module("redIberia")
        .factory("UnitMarkerFactory", [ '$rootScope', 'MarkerFunctions', 'unitLogic', '$q', '$timeout', 'LanguageFactory', 'markerFilters', function($rootScope, MarkerFunctions, unitLogic, $q, $timeout, LanguageFactory, markerFilters) {

                var Data = {};

                Data.createMkr = function(o) {

                            // lets reset all exisitng data
                            var promises = []
                            angular.forEach($rootScope.keyData.redMarkers.markerIds, function(i) {

                                var q = $q.defer();
                                promises.push(q.promise);
                                $('#' + i).remove();
                                q.resolve();
                            });

                            $rootScope.keyData.redMarkers.unitData = []
                            $rootScope.keyData.redMarkers.markerIds = []

                            // now we can create the updated markers
                            $q.all(promises).then(function() {
                                $rootScope.keyData.markers = [];
                                //now lets create the new unit markers.
                                _.forEach(o, function(unit, key) {
                                        console.log(unit);
                                        //get the title
                                        unit.title = LanguageFactory.getUnitTitle(unit.type)

                                        // set the description
                                        unit.description = LanguageFactory.getUnitDescription(unit.type)

                                          // set the markers geo data
                                          var mkrData = {
                                                type: 'Feature',
                                                geometry: {
                                                      type: 'Point',
                                                      coordinates: [unit.lon, unit.lat],
                                                      dms: unitLogic.convertToDMS(unit.lon, unit.lat),
                                                      height: unitLogic.getAlt(unit.alt),
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
                                          mkr.className = 'marker ' + mkrData.properties.uid + ' ' + unitLogic.getMisisonType(unit.type);
                                          mkr.id = mkrData.properties.uid; // use this as a unique key
                                          mkr.style.backgroundImage = mkrData.properties.icon.iconUrl;
                                          mkr.style.backgroundRepeat = 'no-repeat';
                                          mkr.style.backgroundPosition = 'center center';
                                          mkr.style.width = mkrData.properties.icon.iconSize;
                                          mkr.style.backgroundSize = 'contain';
                                          mkr.style.height = mkrData.properties.icon.iconSize;
                                          mkr.style.cursor = 'pointer';
                                          mkr.style.borderRadius = '50px';
                                          mkr.addEventListener('click', function(evt) {
                                              $rootScope.keyData.map.flyTo({ center: mkrData.geometry.coordinates});

                                              $timeout(function(){

                                                  console.log(mkrData.data.unit);
                                                  $('.mapboxgl-popup').remove();

                                                  var el = document.querySelectorAll('.selectedUnit');
                                                  el.forEach(element => {
                                                    element.classList.toggle('selectedUnit');
                                                  });

                                                  $rootScope.keyData.selectedUnit = mkrData.data;
                                                  $rootScope.keyData.selectedUnit.latlong = unitLogic.getLonLat(mkrData.data.unit.lat, mkrData.data.unit.lon)

                                                 $("#" + mkrData.properties.uid).addClass("selectedUnit");

                                                 console.log($rootScope.keyData.selectedUnit.unit.missionname);
                                                                      $rootScope.defaultImage = '../../../img/404.png'
                                                                      $rootScope.keyData.popup = new mapboxgl.Popup({ closeOnClick: false} )
                                                                      .setLngLat(mkrData.geometry.coordinates)
                                                                      .setHTML('<div class="pixel-popup-header">' +
                                                                                    '<strong style="border-bottom: 1px solid;padding-bottom: 7px;line-height: 51px;">' + mkrData.data.unit.title + '</strong>' +
                                                                                    '<p style=" color: #fff">' + mkrData.data.unit.description + '</p>' +
                                                                                    '<strong style="border-bottom: 1px solid;padding-bottom: 7px;line-height: 51px;">Co-ords  </strong>' +
                                                                                    '<p style="color: #ffffff">' + mkrData.geometry.dms + '</p> ' +
                                                                                    '<strong style="border-bottom: 1px solid;padding-bottom: 7px;line-height: 51px;">Altitude  </strong>' +
                                                                                    '<p style="color: #ffffff">' + mkrData.geometry.height + '</p> ' +
                                                                                '</div>')
                                                                        .addTo($rootScope.keyData.map);

                                              }, 100);

                                          });

                                          // once styled we append the new div to the html body
                                          angular.element(document.getElementsByTagName('body')).append(mkr);


                                          var newUnit = new mapboxgl.Marker(mkr, {anchor: 'bottom'})
                                                .setLngLat(mkrData.geometry.coordinates)
                                                .addTo($rootScope.keyData.map);

                                                // lets store the markers so we can delete them.
                                                $rootScope.keyData.redMarkers.markerIds.push(mkrData.properties.uid)

                                });

                                return
                            })
                }

                return Data;

        }]);

})();
