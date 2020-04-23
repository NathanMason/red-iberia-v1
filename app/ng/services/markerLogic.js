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
                var magdec = $rootScope.missiondata.magdec
                var magheading = (fixedheading + magdec);
                magheading = magheading.toFixed(0);
                fixedheading = fixedheading.toFixed(0); // fixs altitude to 0 places

                if (magheading > 360) {
                      magheading = magheading - 360;
                } else if (magheading < 0) {
                      magheading = magheading + 360;
                }

                return fixedheading + "True, " + magheading + "Magnetic";


            }

            Logic.getSpeed= function(speed,alt){
              var fixedspeed = speed;
              var altft = alt * 3.28084;
              var ias = speed / (1+(alt/1000 * 0.02));
              ias = ias.toFixed(0);
              fixedspeed = fixedspeed.toFixed(0);
              fixedspeed = fixedspeed.toString() + "kts TAS";
              fixedspeed = fixedspeed.toString() + "kts TAS, " + ias + "Kts IAS";
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

            return Logic;

      });

})();
