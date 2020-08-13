(function() {
      angular.module("redIberia").factory("unitLogic", function($rootScope, $timeout) {

            var Logic = {};

            Logic.getAlt= function(alt){

                var fixedalt = alt * 3.28084;
                fixedalt = fixedalt.toFixed(0);
                fixedalt = fixedalt.toString() + "ft";
                return fixedalt; // corrects the altitude to Ft.


            }

            Logic.getHeading= function(heading){

                var fixedheading = heading;
                var magdec = $rootScope.keyData.missiondata.magdec
                var magheading = (fixedheading + magdec);
                magheading = magheading.toFixed(0);
                fixedheading = fixedheading.toFixed(0); // fixs altitude to 0 places

                if (magheading > 360) {
                      magheading = magheading - 360;
                } else if (magheading < 0) {
                      magheading = magheading + 360;
                }

                return fixedheading + "True,<br /> " + magheading + "Magnetic";


            }

            Logic.getSpeed= function(speed,alt){
              var fixedspeed = speed;
              var altft = alt * 3.28084;
              var ias = speed / (1+(alt/1000 * 0.02));
              ias = ias.toFixed(0);
              fixedspeed = fixedspeed.toFixed(0);
              fixedspeed = fixedspeed.toString() + "kts";
              return fixedspeed;
            }

            Logic.getLonLat= function(la, lo){
                var lat = la;
                lat = lat.toFixed(4);
                var lon = lo;
                lon = lon.toFixed(4);
                var uLatLon = "" + lat + "," + lon + "";



                return uLatLon;

            }

            Logic.icon = function(e){

                    switch (e) {

                            case 'sam':
                                return 'url("../../img/sam_red.png")';
                            break;

                            case 'scud':
                                return 'url("../../img/scud.png")';
                            break;
                            case 'struc':
                                return 'url("../../img/iran.png")';
                            break;
                            case 'ew':
                                return 'url("../../img/air.png")';
                            break;
                    }

            }

            return Logic;

      });

})();
