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
                            pvp: { kills: (pilot.PvP.kills || 0), losses: (pilot.PvP.losses || 0) },
                            friendlyHits: {kills: (pilot.friendlyKills || 0), hits: (pilot.friendlyHits || 0) },
                            kills: {buildings: (pilot.kills.Buildings || 0), groundUnits: (pilot.kills[ 'Ground Units' ] || 0), rotorUnits: (pilot.kills.Helicopters || 0) },
                            losses: {crash: (pilot.losses.crash || 0), eject: (pilot.losses.eject || 0), pilotDeath: (pilot.losses.pilotDeath || 0)},
                            times: pilot.times,
                            weapons: pilot.weapons,
                            favPlane: '',
                            totalTime: 0
                            }

                            var promises2 = [];
                            var prev = 0;
                            var e;

                            angular.forEach(pilot.times, function(i, key, index){
                                var q2 = $q.defer();
                                promises.push(q.promise);
                                var math1 = i.total / 3600;
                                var math2 = Math.floor(math1);
                                calculataTotalAirTime = currentPilot.totalTime + math2;
                                currentPilot.totalTime = calculataTotalAirTime;

                                if (prev == 0){
                                    var math1 = i.total / 3600;
                                    var math2 = Math.floor(math1)
                                    i.total = math2
                                    prev = math2;
                                    e = key;
                                    q2.resolve();
                                }
                                else if (prev < math2) {
                                    i.total = math2
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

                return totalKills = (i.pvp.kills || 0) + (i.kills.buildings.total || 0) + (i.kills.groundUnits.total || 0) + (i.kills.rotorUnits.total || 0);
             }

             LeaderBoardFunctions.getTotalDeaths = function(i) {
                return totalDeaths = (i.pvp.losses || 0) + (i.losses.crash || 0) + (i.losses.eject || 0) + (i.losses.pilotDeath || 0);
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

                return totalIncidents = killCount;
             }

            return LeaderBoardFunctions;





      });

})();
