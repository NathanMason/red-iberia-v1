(function() {
      angular.module("redIberia").factory("LeaderBoardFunctions", function($rootScope, $q, converterFactory, $filter) {

            var LeaderBoardFunctions = {};


            LeaderBoardFunctions.sortPilotStats = function(obj, cb) {
                    // create the pilot object
                    var stats = [];
                    var allPilotpromises = [];
                    // calculate leaderboard positions

                    var keyChecker = function(key){
                        if (!key) {key = 0} else {key = key}
                        return key
                    }


                    angular.forEach(obj, function(pilot){

                        var allPilot_q = $q.defer();
                        allPilotpromises.push(allPilot_q.promise);

                        // set the pilot array
                        var currentPilot = {
                                callSign: pilot.name,
                                allStats: pilot.times,
                                deaths: 0,
                                kills: 0,
                                aaKills: 0,
                                agKills: 0,
                                pvpKills: 0,
                                pvpLosses: 0,
                                position: 0,
                                flightHours: 0,
                                ranking: 0,
                                flightHours_converted: '',
                                favAircraft: {
                                    flightHours: 0,
                                    frameName: '',
                                    flightHours_converted: ''
                                }

                        }
						var cvalue = 0;
                        // just tests


                        // make sure the pilot has aircraft stats to loop over
                        if (pilot.times != null) {

                            // now we loop over the times object to get the pilots stats
                            angular.forEach(pilot.times, function(i, key, index){
                                    // get pilots kills
                                    if (i.hasOwnProperty('kills')) {

                                            // get AA kills
                                            if (i.kills.Planes) {

                                                // add to pilots total kills
                                                currentPilot.kills = currentPilot.kills + i.kills.Planes.total;
												cvalue = cvalue + i.kills.Planes.total;
                                                // add to pilots AA kills
                                                currentPilot.aaKills = currentPilot.aaKills + i.kills.Planes.total;

                                            }

                                            // get AG kills
                                            if (i.kills["Ground Units"]) {

                                                // add to pilots total kills
                                                currentPilot.kills = currentPilot.kills + ( i.kills["Ground Units"].total)
												cvalue = cvalue + i.kills["Ground Units"].total / 8;
                                                // add to pilots AG kills
                                                currentPilot.agKills = currentPilot.agKills + i.kills["Ground Units"].total

                                            }
											if (i.kills.Helicopters) {
												currentPilot.kills = (currentPilot.kills + i.kills.Helicopters.total /4 )
												cvalue = cvalue + i.kills.Helicopters.total / 4;

												currentPilot.aaKills = (currentPilot.aaKills + i.kills.Helicopters.total / 4)

											}
                                        }

                                    // get PvP stats
                                    if (i.hasOwnProperty('pvp')) {

                                            if (i.pvp.hasOwnProperty('kills')) {
                                                // add to pilots total kills
                                                currentPilot.kills = currentPilot.kills + (i.pvp.kills)
												cvalue = cvalue + (i.pvp.kills * 2)
                                                // add to pilots pvp Kills
                                                currentPilot.pvpKills = currentPilot.pvpKills + i.pvp.kills

                                            }
                                            if (i.pvp.hasOwnProperty('losses')) {
                                                // add to pilots total deaths
                                                currentPilot.deaths = currentPilot.deaths + i.pvp.losses

                                                // add to pilots pvp deaths
                                                currentPilot.pvpLosses = currentPilot.pvpLosses + i.pvp.losses

                                            }

                                    }
                                    // get actions
                                    if (i.hasOwnProperty('actions')) {
                                      if (i.actions.hasOwnProperty('losses'))
                                      {
                                        //
                                        if (i.actions.losses.hasOwnProperty('pilotDeath'))
                                        {
                                          currentPilot.deaths = currentPilot.deaths + (i.actions.losses.pilotDeath /2 )
                                        }
                                        if (i.actions.losses.hasOwnProperty('crash'))
                                        {
                                          currentPilot.deaths = currentPilot.deaths + (i.actions.losses.crash / 2)
                                        }
                                        if (i.actions.losses.hasOwnProperty('eject'))
                                        {
                                          currentPilot.deaths = currentPilot.deaths + (i.actions.losses.eject / 4)
                                        }
                                      }
                                    }
                                    // get flight time
                                    if (i.hasOwnProperty('inAir')) {
                                        currentPilot.flightHours = currentPilot.flightHours + i.inAir
                                        currentPilot.flightHours_converted = converterFactory.timeConvert(currentPilot.flightHours)

                                        // get fav aircraft
                                        if (i.inAir > currentPilot.favAircraft.flightHours) {
                                            currentPilot.favAircraft.flightHours = i.inAir
                                            currentPilot.favAircraft.flightHours_converted = currentPilot.flightHours_converted
                                            currentPilot.favAircraft.frameName = key
                                        }

                                    }



                                    // set pilots rank
                                    //currentPilot.ranking = currentPilot.kills - currentPilot.deaths;
									currentPilot.ranking = cvalue - currentPilot.deaths;
                                })


                                    console.log(currentPilot.favAircraft.frameName);

                                    if (pilot.name.includes('Sock')) {
                                        currentPilot.position = 99
                                        currentPilot.ranking = -2500
                                        currentPilot.pvpLosses = 369
                                        currentPilot.aaKills = -69
                                        currentPilot.callSign = '🖕🖕🖕💩 Sock 💩🖕🖕🖕'
                                    }
                                    if (pilot.name.includes('BooZer')) {
                                        currentPilot.callSign = currentPilot.callSign + '🍺'
                                    }

                                stats.push(currentPilot)
                                allPilot_q.resolve();


                        } else {
                            stats.push(currentPilot)
                            allPilot_q.resolve();
                        }

                    });

                    $q.all(allPilotpromises).then(function() {


                        // lets structure the standings
                        var leaderBoard = $filter('orderBy')(stats, '-ranking');
                        var result = [];
                        var sortPromise = [];
                        angular.forEach(leaderBoard, function(pilot, index){

                            var sort_q = $q.defer();
                            sortPromise.push(sort_q.promise);
                            pilot.position = index+1
                            result.push(pilot)
                            sort_q.resolve();
                        })
                        $q.all(sortPromise).then(function() {
                            cb(result)
                        })

                    })
            }


            return LeaderBoardFunctions;





      });

})();
