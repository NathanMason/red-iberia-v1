(function() {
      angular.module("redIberia").factory("markerFactory", function($rootScope, $websocket, $q, MarkerFunctions, $filter, $document, $http, $timeout, markerFilters) {

            var MarkerFactory = {};

            // sort out what units need thier markers updated, deleted, or created
            MarkerFactory.sortMarkers = function(e) {

                  var promises = [];
                  angular.forEach(e, function(unit, i) {
                      //console.log(unit.category);
                        var q = $q.defer();
                        promises.push(q.promise);
                        // create unit and add to markers scope.
                        if (unit.action == 'C') {
                              MarkerFactory.addMarker(unit, function(cb) {
                                    q.resolve();
                              })
                        }

                        // create unit and add to markers scope.
                        else if (unit.action == 'U') {
                              // //console.log(unit);
                              MarkerFactory.updateMarker(unit, function(cb) {
                                    q.resolve();
                              })
                        }

                        // delete units markers.
                        else if (unit.action == 'D') {
                              MarkerFactory.deleteMarker(unit, function(cb) {
                                    q.resolve();
                              })
                        }

                  })
                  $q.all(promises).then(function() {

                        MarkerFactory.printMarkers();

                  })
            }

            // delete markers that are returned with status: "D"
            MarkerFactory.deleteMarker = function(unit, cb) {
                  var marker = $filter('filter')($rootScope.markers.features, (item) => {
                        return item.properties.uid === unit.unitID;
                  })[0];
                  $rootScope.markers.features.splice(
                        $rootScope.markers.features.indexOf(marker), 1);
                  cb(200)
            }

            // update markers that are returned with status: "U"
            MarkerFactory.updateMarker = function(e, cb) {

                  // get the unit that needs updating FROM THE markers rootscope object
                  var marker = $filter('filter')($rootScope.markers.features, (item) => {
                        return item.properties.uid === e.unitID;
                  })[0];

                  if (marker == undefined) {
                      //console.log('unit is U but not found');
                      MarkerFactory.addMarker(e, function(cb) {

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

            MarkerFactory.addMarker = function(unit, cb) {

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

            MarkerFactory.printMarkers = function() {

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
                        //console.log($rootScope.selectedUnit);

                        if ($rootScope.selectedUnit != undefined) {
                            //console.log(unit.properties.uid );
                            //console.log($rootScope.selectedUnit.unit );
                                if (unit.properties.uid == $rootScope.selectedUnit.unit.unitID ) {
                                    $("#" + unit.properties.uid).addClass("selectedUnit");
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
                                //console.log(el);

                                el.forEach(element => {
                                  element.classList.toggle('selectedUnit');
                                });
                                $rootScope.selectedUnit = unit.data;
                               $rootScope.selectedUnit = unit.data;
							   console.log("unit.data dump");
							   console.log(unit.data);
							   var lat = unit.data.unit.lat;
							   lat = lat.toFixed(4);
							   var lon = unit.data.unit.lon;
							   lon = lon.toFixed(4);
							   var uLatLon = "DDMS:" + lat + "," + lon + "";
                               $rootScope.selectedUnit.latlong = uLatLon; // mkr.getlatlng was erroring this works
							   var fixedalt = unit.data.unit.alt * 3.28084;
							   fixedalt = fixedalt.toFixed(0);
							   fixedalt = fixedalt.toString() + "ft";
							   $rootScope.selectedUnit.fixedalt = fixedalt; // corrects the altitude to Ft.
							   var fixedspeed = unit.data.unit.speed;
							   fixedspeed = fixedspeed.toFixed(0);
							   fixedspeed = fixedspeed.toString() + "kts TAS";
							   var fixedheading = unit.data.unit.heading;
							   var fixedheading = fixedheading.toFixed(0); // fixs altitude to 0 places
							   $rootScope.selectedUnit.fixedheading = fixedheading; 
							   $rootScope.selectedUnit.fixedspeed = fixedspeed; // corrects speed to TAS
                               $("#" + unit.properties.uid).addClass("selectedUnit");
                               console.log($rootScope.selectedUnit);
                            }, 100);

                              //console.log($rootScope.selectedUnit);
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
                  })



            }

            return MarkerFactory;

      });

})();
