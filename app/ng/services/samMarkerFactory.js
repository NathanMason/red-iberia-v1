(function() {
      angular.module("redIberia").factory("SamMarkersFactory", function($rootScope, $q, $filter, $document, $http, $timeout) {

            var SamMarkersFactory = {};

            // sort out what airbases need thier markers updated,  or created
            SamMarkersFactory.sortMarkers = function(e, cb) {
                console.log(e);
                  var tgts = e.tgts;
                  var misisonData = e.misisondata;

                  $rootScope.keyData.samTargets = {
                      type: 'FeatureCollection',
                      features: []
                  };
                  var promises = [];
                  angular.forEach(tgts, function(obj, i) {
                      console.log(obj);
                        var q = $q.defer();
                        promises.push(q.promise);

                              var mkrData = {
                                    type: 'Feature',
                                    geometry: {
                                          type: 'Point',
                                          coordinates: [obj.lon, obj.lat]
                                    },
                                    properties: {
                                        icon: {
                                          iconUrl: 'url("../../img/sam_red.png")',
                                          iconSize: '25px'
                                        },
                                        name: obj.groupname
                                    },
                                    data: {
                                          obj
                                    }
                              }
                              console.log(mkrData);
                              $rootScope.keyData.samTargets.features.push(mkrData)



                        // now print the airbase markers
                        SamMarkersFactory.printMarkers(function(cb) {
                              q.resolve();
                        })

                  })
                  $q.all(promises).then(function() {
                        cb()
                  })
            }

            SamMarkersFactory.printMarkers = function(cb) {

                  // delete all existing marker divs from the map.
                  $rootScope.keyData.samTargetsMarkers.forEach((marker) => marker.remove());

                  var promises = [];

                  // create all new marker divs on the map.
                  angular.forEach($rootScope.keyData.samTargets.features, function(obj) {

                      console.log(obj);

                        var generateID = obj.properties.name.split(' ').join('')
                        var q = $q.defer();
                        promises.push(q.promise);
                        console.log(obj);
                        // create a marker for the unit.
                        var mkr = document.createElement('div');
                        angular.element(document.getElementsByTagName('body')).append(mkr);
                        mkr.id = generateID + '_mkrID';
                        mkr.style.cursor = 'pointer';
                        mkr.className = generateID;
                        mkr.style.backgroundImage = obj.properties.icon.iconUrl;
                        mkr.style.backgroundRepeat = 'no-repeat';
                        mkr.style.backgroundPosition = 'center center';
                        mkr.style.width = obj.properties.icon.iconSize;
                        mkr.style.backgroundSize = 'contain';
                        mkr.style.height = obj.properties.icon.iconSize;
                        // add the units/markers click function.
                        mkr.addEventListener('click', function() {
                              $rootScope.keyData.map.flyTo({
                                    center: obj.geometry.coordinates
                              });
                              // $timeout(function() {
                              //
                              //       $rootScope.keyData.selectedAirBase = obj;
                              //
                              //   $(".airBaseData").addClass("showAirBaseBar");
                              // }, 100);
                        });

                        // now print the mrker to the map
                        var newMKR = new mapboxgl.Marker(mkr)
                              .setLngLat(obj.geometry.coordinates)
                              .addTo($rootScope.keyData.map);
                        $rootScope.keyData.samTargetsMarkers.push(newMKR)


                        q.resolve();

                  });
                  $q.all(promises).then(function() {
                        cb(200)
                  })



            }

            return SamMarkersFactory;

      });

})();
