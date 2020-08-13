(function() {
      angular.module("redIberia").factory("UnitMarkerFactory", function($rootScope, $websocket, $q, MarkerFunctions, $filter, $document, $http, $timeout, markerFilters, unitLogic, AirbaseMarkerFactory, StaticTargetsMarkerFactory, SamMarkersFactory, ScudTargetsMarkerFactory) {

            var UnitMarkerFactory = {};
            var customPopup;
            // sort out what units need thier markers updated, deleted, or created
            UnitMarkerFactory.sortMarkers = function(e) {
                $rootScope.keyData.scudTargets.features = [];
                $rootScope.keyData.scudTargetsMarkers.forEach((marker) => marker.remove());
                  var units = e.units;
                  var airBases = e.airbases;
                  var missiondata = e.missiondata;
                  var structureTargets = e.iran;
                  var samTargets = e.sams;
                  var scudTargets = e.scud;
                  var ew = e.ewintel;

                  var promises = [];
                  angular.forEach(units, function(unit, i) {

                        var q = $q.defer();
                        promises.push(q.promise);


                                // create unit and add to markers scope.
                                if (unit.action == 'C') {
                                      UnitMarkerFactory.unitAddMarker(unit, function(cb) {
                                            q.resolve();
                                      })
                                }

                                // delete units markers.
                                else if (unit.action == 'D') {
                                      UnitMarkerFactory.unitDeleteMarker(unit, function(cb) {
                                            q.resolve();
                                      })
                                }

                  })
                  $q.all(promises).then(function() {



                  })
            }

            // delete markers that are returned with status: "D"
            UnitMarkerFactory.unitDeleteMarker = function(unit, cb) {
                    var promises = [];
                    angular.forEach($rootScope.keyData.markers.features, function(i, index){
                        var q = $q.defer();
                         promises.push(q.promise);

                        if (i.properties.uid == unit.unitID) {

                            $rootScope.keyData.markers.features.splice(index, 1);
                             q.resolve();
                        } else {
                             q.resolve();
                        }
                    })
                    $q.all(promises).then(function() {

                        cb(200)

                    })

            }

            // update markers that are returned with status: "U"
            UnitMarkerFactory.unitUpdateMarker = function(e, cb) {


                  var found = false
                  var updaterPromises = [];
                  angular.forEach($rootScope.keyData.markers.features, function(marker, index){

                      var updaterQ = $q.defer();
                      updaterPromises.push(updaterQ.promise);

                      if (marker.properties.uid === e.unitID) {

                          found = true;
                          marker.geometry.coordinates = [e.lon, e.lat]
                          marker.data.speed = e.speed;
                          marker.data.heading = e.heading;
                          marker.data.alt = e.alt;
                          updaterQ.resolve();
                          //cb(200)
                      } else {
                          updaterQ.resolve();
                      }

                  })
                  $q.all(updaterPromises).then(function() {

                        if (found == false) {
                            UnitMarkerFactory.unitAddMarker(e, function(res) {
                                cb(200)
                            })
                        } else {
                            cb(200)
                        }

                  })

            }

            UnitMarkerFactory.unitAddMarker = function(unit, cb) {

                  var mkrIcon,
                      mkrSize;

                   // get the markers image based on the coalition and unit type.
                  MarkerFunctions.getMarkerImage(unit.coalition, unit.type, function(r) {
                        var mkrIcon = r.src;
                        var mkrSize = r.size;

                        // set the markers geo data
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
                                    unit,
                                    heading: unit.heading
                              }
                        }

                        // add the marker to the markers rootscope object.
                        $rootScope.keyData.markers.features.push(mkrData)
                        cb()
                  })
            }

            UnitMarkerFactory.printUnitMarkers = function(cb) {

                // delete all existing marker divs from the map.
                $rootScope.keyData.unitMarkers.forEach((marker) => marker.remove());
                $("div.marker").remove();

                // player new unit placeholder
                var newHumanList = [];


                // clear the existing marker obj.
                $rootScope.keyData.unitMarkers = [];
                    var currentClients = [];
                  var promises = [];

                  $rootScope.keyData.map.on('click', function(evt){
                      console.log(evt.lngLat);
                  });

                    // create all new marker divs on the map.
                  angular.forEach($rootScope.keyData.markers.features, function(unit) {

                        var q = $q.defer();
                        promises.push(q.promise);

                            newHumanList.push(unit)

                            // create a marker for the unit.
                            var mkr = document.createElement('div');

                            mkr.className = 'marker ' + unit.data.unit.category;
                            mkr.id = unit.properties.uid; // use this as a unique key
                            mkr.style.backgroundImage = unit.properties.icon.iconUrl;
                            mkr.style.backgroundRepeat = 'no-repeat';
                            mkr.style.backgroundPosition = 'center center';
                            mkr.style.width = unit.properties.icon.iconSize;
                            mkr.style.backgroundSize = 'contain';
                            mkr.style.height = unit.properties.icon.iconSize;
                            mkr.style.cursor = 'pointer';

                            // update selected Unit
                            if ($rootScope.keyData.selectedUnit != undefined) {

                                    if (unit.properties.uid == $rootScope.keyData.selectedUnit.unit.unitID ) {
                                        $("#" + unit.properties.uid).addClass("selectedUnit");
                                        $rootScope.keyData.selectedUnit.fixedheading = unitLogic.getHeading(unit.data.heading)
                                        $rootScope.keyData.selectedUnit.fixedspeed = unitLogic.getSpeed(unit.data.speed,unit.data.alt)
                                        $rootScope.keyData.selectedUnit.fixedalt = unitLogic.getAlt(unit.data.alt)
                                        $rootScope.keyData.selectedUnit.latlong = unitLogic.getLonLat(unit.data.unit.lat, unit.data.unit.lon)
                                        $rootScope.keyData.popup.setLngLat(unit.geometry.coordinates)
                                    }
                            }

                            // check marker filter status
                            markerFilters.getFilterStatus(unit.data.unit.category, function(r){

                                if (r == false) {
                                    mkr.classList.add('hideEl');
                                }

                            })

                            // add the units/markers click function.
                            mkr.addEventListener('click', function(evt) {
                                $rootScope.keyData.map.flyTo({ center: unit.geometry.coordinates});

                                $timeout(function(){


                                    $('.mapboxgl-popup').remove();

                                    var el = document.querySelectorAll('.selectedUnit');
                                    el.forEach(element => {
                                      element.classList.toggle('selectedUnit');
                                    });

                                    $rootScope.keyData.selectedUnit = unit.data;
                                    $rootScope.keyData.selectedUnit.fixedheading = unitLogic.getHeading(unit.data.unit.heading)
                                    $rootScope.keyData.selectedUnit.fixedspeed = unitLogic.getSpeed(unit.data.unit.speed,unit.data.alt)
                                    $rootScope.keyData.selectedUnit.fixedalt = unitLogic.getAlt(unit.data.unit.alt)
                                    $rootScope.keyData.selectedUnit.latlong = unitLogic.getLonLat(unit.data.unit.lat, unit.data.unit.lon)

                                   $("#" + unit.properties.uid).addClass("selectedUnit");

                                   console.log($rootScope.keyData.selectedUnit.unit.missionname);
                                                        $rootScope.defaultImage = '../../../img/404.png'
                                                        $rootScope.keyData.popup = new mapboxgl.Popup({ closeOnClick: false} )
                                                        .setLngLat(unit.geometry.coordinates)
                                                        .setHTML('<div class="pixel-popup-header"><strong>' + $rootScope.keyData.selectedUnit.unit.playername +
                                                        '</strong></div><img style="width: 100%; max-height: 117px;" src="../img/' + $rootScope.keyData.selectedUnit.unit.type +
                                                        '.jpg" onError="this.src=\' ../../../img/404.png\'"><table class="table"><tr><td><strong>Unit type:</strong></td><td class="right">' + $rootScope.keyData.selectedUnit.unit.type +
                                                        '</td></tr><tr><td><strong>Callsign:</strong></td><td class="right">' + $rootScope.keyData.selectedUnit.unit.missionname +
                                                        '</td></tr><tr><td><strong>Speed:</strong></td><td class="right">' + $rootScope.keyData.selectedUnit.fixedspeed +
                                                        '</td></tr><tr><td><strong>Altitude:</strong></td><td class="right">' + $rootScope.keyData.selectedUnit.fixedalt +
                                                        '</td></tr><tr><td><strong>Heading:</strong></td><td class="right">' + $rootScope.keyData.selectedUnit.fixedheading  +
                                                        '</td></tr></tr></table>')
                                                        .addTo($rootScope.keyData.map);

                                }, 100);

                            });

                            // now print the mrker to the map
                            var newUnit = new mapboxgl.Marker(mkr, {anchor: 'bottom'})
                                  .setLngLat(unit.geometry.coordinates)
                                  .setRotation(unit.data.heading) // not working if the unit is being updated
                                  .addTo($rootScope.keyData.map);
                                  $rootScope.keyData.unitMarkers.push(newUnit)

                            q.resolve();



                  });
                  $q.all(promises).then(function() {
                      $rootScope.keyData.humanPilots = [];
                        $rootScope.keyData.loadingAwacsData = false;
                        $rootScope.keyData.humanPilots = newHumanList
                        cb(200)
                  })


            }

            return UnitMarkerFactory;

      });

})();
