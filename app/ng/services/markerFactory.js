(function() {
      angular.module("redIberia").factory("UnitMarkerFactory", function($rootScope, $websocket, $q, MarkerFunctions, $filter, $document, $http, $timeout, markerFilters, unitLogic, AirbaseMarkerFactory) {

            var UnitMarkerFactory = {};

            // sort out what units need thier markers updated, deleted, or created
            UnitMarkerFactory.sortMarkers = function(e) {

                  var units = e.units;
                  var airBases = e.airbases;
                  var misisonData = e.misisondata;

                  var promises = [];
                  angular.forEach(units, function(unit, i) {
                      //// console.log(unit.category);
                        var q = $q.defer();
                        promises.push(q.promise);
                        // create unit and add to markers scope.
                        if (unit.action == 'C') {
                              UnitMarkerFactory.unitAddMarker(unit, function(cb) {
                                    q.resolve();
                              })
                        }

                        // create unit and add to markers scope.
                        else if (unit.action == 'U') {
                              // //// console.log(unit);
                              UnitMarkerFactory.unitUpdateMarker(unit, function(cb) {
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

                        // print unit markers then update the airbases
                        UnitMarkerFactory.printUnitMarkers( function(r){

                            var data = {
                                airbases: airBases,
                                missiondata: misisonData
                            }
                            AirbaseMarkerFactory.sortAirbaseMarkers(data, function(r){

                                return

                            });
                        });

                  })
            }

            // delete markers that are returned with status: "D"
            UnitMarkerFactory.unitDeleteMarker = function(unit, cb) {
                  var marker = $filter('filter')($rootScope.markers.features, (item) => {
                        return item.properties.uid === unit.unitID;
                  })[0];
                  $rootScope.markers.features.splice(
                        $rootScope.markers.features.indexOf(marker), 1);
                  cb(200)
            }

            // update markers that are returned with status: "U"
            UnitMarkerFactory.unitUpdateMarker = function(e, cb) {

                  // get the unit that needs updating FROM THE markers rootscope object
                  var marker = $filter('filter')($rootScope.markers.features, (item) => {
                        return item.properties.uid === e.unitID;
                  })[0];

                  if (marker == undefined) {
                      //// console.log('unit is U but not found');
                      UnitMarkerFactory.unitAddMarker(e, function(cb) {

                      })
                  } else {

                          // update the units geo data
                          marker.geometry.coordinates = [e.lon, e.lat]
                          marker.data.speed = e.speed;
                          marker.data.heading = e.heading;
                          marker.data.alt = e.alt;
                          cb(200)
                   }
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
                        $rootScope.markers.features.push(mkrData)
                        cb()
                  })
            }


            UnitMarkerFactory.printUnitMarkers = function(cb) {

                // delete all existing marker divs from the map.
                $rootScope.unitMarkers.forEach((marker) => marker.remove());

                // clear the existing marker obj.
                $rootScope.unitMarkers = [];

                  var promises = [];

                    // create all new marker divs on the map.
                  angular.forEach($rootScope.markers.features, function(unit) {

                        var q = $q.defer();
                        promises.push(q.promise);

                        // create a marker for the unit.
                        var mkr = document.createElement('div');
                        angular.element(document.getElementsByTagName('body')).append(mkr);
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
                        if ($rootScope.selectedUnit != undefined) {
                            // console.log($rootScope.selectedUnit);
                            // console.log(unit.data);
                                if (unit.properties.uid == $rootScope.selectedUnit.unit.unitID ) {
                                    $("#" + unit.properties.uid).addClass("selectedUnit");
                                    $rootScope.selectedUnit.fixedheading = unitLogic.getHeading(unit.data.heading)
                                    $rootScope.selectedUnit.fixedspeed = unitLogic.getSpeed(unit.data.speed,unit.data.alt)
                                    $rootScope.selectedUnit.fixedalt = unitLogic.getAlt(unit.data.alt)
                                    $rootScope.selectedUnit.latlong = unitLogic.getLonLat(unit.data.unit.lat, unit.data.unit.lon)

                                    // console.log(unitLogic.getLonLat(unit.data.unit.lat, unit.data.unit.lon));

                                }
                        }

                        // check marker filter status
                        markerFilters.getFilterStatus(unit.data.unit.category, function(r){

                            if (r == false) {
                                mkr.classList.add('hideEl');
                            }

                        })

                        // add the units/markers click function.
                        mkr.addEventListener('click', function() {
                            $rootScope.map.flyTo({ center: unit.geometry.coordinates });
                            $timeout(function(){

                                var el = document.querySelectorAll('.selectedUnit');
                                el.forEach(element => {
                                  element.classList.toggle('selectedUnit');
                                });

                                $rootScope.selectedUnit = unit.data;
                                $rootScope.selectedUnit.fixedheading = unitLogic.getHeading(unit.data.unit.heading)
                                $rootScope.selectedUnit.fixedspeed = unitLogic.getSpeed(unit.data.unit.speed,unit.data.alt
                                $rootScope.selectedUnit.fixedalt = unitLogic.getAlt(unit.data.unit.alt)
                                $rootScope.selectedUnit.latlong = unitLogic.getLonLat(unit.data.unit.lat, unit.data.unit.lon)

                               $("#" + unit.properties.uid).addClass("selectedUnit");

                            }, 100);

                              //// console.log($rootScope.selectedUnit);
                            if ($("#sidebar2").hasClass("closeRightSideBar")) {
                                $("#sidebar2").toggleClass("closeRightSideBar");
                            }


                        });

                        // now print the mrker to the map
                        var newUnit = new mapboxgl.Marker(mkr)
                              .setLngLat(unit.geometry.coordinates)
                              .setRotation(unit.data.heading) // not working if the unit is being updated
                              .addTo($rootScope.map);
                              $rootScope.unitMarkers.push(newUnit)


                        q.resolve();

                  });
                  $q.all(promises).then(function() {
                        $rootScope.loadingAwacsData = false;
                        cb(200)
                  })



            }


            return UnitMarkerFactory;

      });

})();
