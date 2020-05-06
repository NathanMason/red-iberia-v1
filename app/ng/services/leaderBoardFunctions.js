(function() {
      angular.module("redIberia").factory("LeaderBoardFunctions", function($rootScope, $q) {

            var LeaderBoardFunctions = {};


            LeaderBoardFunctions.sortPilotStats = function(obj, cb) {
                    // create the pilot object
                    var stats = [];
                    var promises = [];
                    // calculate leaderboard positions

                    angular.forEach(obj, function(pilot){
                        var q = $q.defer();
                        promises.push(q.promise);

                        var currentPilot = {
                            callSign: pilot.name,
                            pvp: { kills: pilot.PvP.kills, losses: pilot.PvP.losses },
                            friendlyHits: {kills: pilot.friendlyKills, hits: pilot.friendlyHits },
                            kills: {buildings: pilot.kills.Buildings, groundUnits: pilot.kills[ 'Ground Units' ], rotorUnits: pilot.kills.Helicopters },
                            losses: {crash: pilot.losses.crash, eject: pilot.losses.eject, pilotDeath: pilot.losses.pilotDeath},
                            times: [],
                            weapons: pilot.weapons,
                            favPlane: ''
                            }

                            var promises2 = [];
                            var prev = 0;
                            var e;

                            angular.forEach(pilot.times, function(i, key, index){
                                var q2 = $q.defer();
                                promises.push(q.promise);
                                var math1 = i.total / 3600;
                                var math2 = Math.floor(math1)

                                if (prev == 0){
                                    var math1 = i.total / 3600;
                                    var math2 = Math.floor(math1)
                                    i.total = math2
                                    prev = math2;
                                    e = key;
                                    q2.resolve();
                                }
                                else if (prev < math2) {

                                        prev = math2;

                                    e = key;
                                    q2.resolve();
                                }
                                else {
                                    q2.resolve();
                                }

                            })
                            $q.all(promises2).then(function() {

                                  currentPilot.favPlane = e;
                                  currentPilot.ranking = LeaderBoardFunctions.calcRank(currentPilot);
                                  currentPilot.totalDeaths = LeaderBoardFunctions.getTotalDeaths(currentPilot);
                                  currentPilot.totalKills = LeaderBoardFunctions.getTotalKills(currentPilot);
                                  currentPilot.totalIncidents = LeaderBoardFunctions.getTotalIncidents(currentPilot);
                              stats.push(currentPilot)
                              q.resolve();
                            })

                    });

                    $q.all(promises).then(function() {
                        cb(stats)
                    })
            }

             LeaderBoardFunctions.calcRank = function(i) {

                return rank = LeaderBoardFunctions.getTotalKills(i) - LeaderBoardFunctions.getTotalDeaths(i) - LeaderBoardFunctions.getTotalIncidents(i);

             }

             LeaderBoardFunctions.getTotalKills = function(i) {

                return totalKills = i.pvp.kills + i.kills.buildings.total + i.kills.groundUnits.total + i.kills.rotorUnits.total;
             }

             LeaderBoardFunctions.getTotalDeaths = function(i) {
                return totalDeaths = i.pvp.losses + i.losses.crash + i.losses.eject + i.losses.pilotDeath;
             }

             LeaderBoardFunctions.getTotalIncidents = function(i) {
                 var killCount = 0;
                 var hitCount = 0;
                 if (i.friendlyHits.kills == null) {
                    killCount = 0
                } else {
                    angular.forEach(i.friendlyHits.kills, function(value, key) {
                      killCount++
                    });
                }
                //  if (i.friendlyHits.hits == null) {
                //     hitCount = 0;
                // } else {
                //     angular.forEach(i.friendlyHits.hits, function(value, key) {
                //       hitCount++
                //     });
                // }

                return totalIncidents = killCount;
             }

            return LeaderBoardFunctions;





      });

})();
