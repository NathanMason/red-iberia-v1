(function() {
      angular.module("redIberia").factory("PlayerFactory", function($rootScope) {

            var Data = {};

            Data.sortPlayers = function(e) {

                $rootScope.keyData.humanPilots = [];
                _.forEach(e, function(unit) {

                    if (unit.playername != undefined) {

                        // if ($rootScope.keyData.humanPilots.some(e => e.playername != unit.playername) == false) {
                            $rootScope.keyData.humanPilots.push({
                                name: unit.playername,
                                airCraft: unit.type,
                                coalition: unit.coalition
                            })
                        // }



                    }

                });


                  return

            }

            return Data;

      });

})();
