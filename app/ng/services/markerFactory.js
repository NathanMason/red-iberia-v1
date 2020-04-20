(function() {
      angular.module("redIberia").factory("markerFactory", function($rootScope, $websocket, $q, MarkerFunctions, $filter, $document, $http, $timeout, markerFilters) {

            var MarkerFactory = {};

            // sort out what units need thier markers updated, deleted, or created
            MarkerFactory.sortMarkers = function(e) {

                  var promises = [];
                  angular.forEach(e, function(unit, i) {
                      console.log(unit.category);
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
                              // console.log(unit);
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
                        return item.properties.uid === e.unitID;
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
                      console.log('unit is U but not found');
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

                        mkrIcon = r.src;
                        mkrSize = r.size;

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

                        // check marker filter status
                        markerFilters.getFilterStatus(unit.data.unit.category, function(r){

                            if (r == false) {
                                mkr.classList.add('hideEl');
                            }


                        })

                        // add the units/markers click function.
                        mkr.addEventListener('click', function() {
                              window.alert(JSON.stringify(unit.data));
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
