(function() {
      angular.module("redIberia").factory("LeaderBoardFunctions", function($rootScope, $q, converterFactory, $filter) {

            var LeaderBoardFunctions = {};
			var minpos = 999;

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
								crashes: 0,
								ejects: 0,
                                kills: 0,
                                aaKills: 0,
								heliKills: 0,
                                agKills: 0,
								shipKills: 0,
                                pvpKills: 0,
                                pvpLosses: 0,
                                position: 0,
                                flightHours: 0,
								wasted: 0,
								spent: 0,
								wpncost: 0,
                                ranking: 0,
                                flightHours_converted: '',
                                favAircraft: {
                                    flightHours: 0,
                                    frameName: '',
                                    flightHours_converted: ''
                                }

                        }
						var cvalue = 0;
                        var dvalue = 0;
						var svalue = 0;
						var wpnvalue = 0;
						var wvalue = 0;
						// just tests


                        // make sure the pilot has aircraft stats to loop over
                        if (pilot.times != null) {

                            // now we loop over the times object to get the pilots stats
                            angular.forEach(pilot.times, function(i, key, index){
									// start working out how much each of these fucking pilots cost us ;) 
									if (i.hasOwnProperty('weapons')){
										if (i.weapons.hasOwnProperty('AGM-62 Walleye II'))
										{
											var weapon = i.weapons["AGM-62 Walleye II"]
											var shot = weapon.shot;
											var kills = weapon.kills;
											var hits = weapon.numHits;
											var price = 150000;
											var w = shot - hits;
											if (w < 0 ) 
											{
												w = 0;
											}
											svalue = svalue + ((shot - w) * price);											
											wpnvalue = wpnvalue + (shot * price);
										}
										if (i.weapons.hasOwnProperty('AGM-84E SLAM'))
										{
											var weapon = i.weapons["AGM-84E SLAM"]
											var shot = weapon.shot;
											var kills = weapon.kills;
											var hits = weapon.numHits;
											var price = 1507520;
											var w = shot - hits;
											if (w < 0 ) 
											{
												w = 0;
											}
											svalue = svalue + ((shot - w) * price);
											wpnvalue = wpnvalue + (shot * price);
										}
										if (i.weapons.hasOwnProperty('AGM-88C'))
										{
											console.log('walleye');
											var weapon = i.weapons["AGM-88C"]
											var shot = weapon.shot;
											var kills = weapon.kills;
											var hits = weapon.numHits;
											var price = 284000;
											var w = shot - hits;
											if (w < 0 ) 
											{
												w = 0;
											}
											svalue = svalue + ((shot - w) * price);
											wpnvalue = wpnvalue + (shot * price);
										}
										if (i.weapons.hasOwnProperty('AGM-65E'))
										{
											var weapon = i.weapons["AGM-65E"]
											var shot = weapon.shot;
											var kills = weapon.kills;
											var hits = weapon.numHits;
											var price = 240408;
											var w = shot - hits;
											if (w < 0 ) 
											{
												w = 0;
											}
											svalue = svalue + ((shot - w) * price);
											wpnvalue = wpnvalue + (shot * price);
										}
										if (i.weapons.hasOwnProperty('AGM-65G'))
										{
											var weapon = i.weapons["AGM-65G"]
											var shot = weapon.shot;
											var kills = weapon.kills;
											var hits = weapon.numHits;
											var price = 240408;
											var w = shot - hits;
											if (w < 0 ) 
											{
												w = 0;
											}
											svalue = svalue + ((shot - w) * price);
											wpnvalue = wpnvalue + (shot * price);
										}
										if (i.weapons.hasOwnProperty('AGM-65D'))
										{
											var weapon = i.weapons["AGM-65D"]
											var shot = weapon.shot;
											var kills = weapon.kills;
											var hits = weapon.numHits;
											var price = 240408;
											var w = shot - hits;
											if (w < 0 ) 
											{
												w = 0;
											}
											svalue = svalue + ((shot - w) * price);
											wpnvalue = wpnvalue + (shot * price);
										}
										if (i.weapons.hasOwnProperty('AGM-65H'))
										{
											var weapon = i.weapons["AGM-65H"]
											var shot = weapon.shot;
											var kills = weapon.kills;
											var hits = weapon.numHits;
											var price = 300509.58;
											var w = shot - hits;
											if (w < 0 ) 
											{
												w = 0;
											}
											svalue = svalue + ((shot - w) * price);
											wpnvalue = wpnvalue + (shot * price);
										}
										if (i.weapons.hasOwnProperty('AGM-154C'))
										{
											var weapon = i.weapons["AGM-154C"]
											var shot = weapon.shot;
											var kills = weapon.kills;
											var hits = weapon.numHits;
											var price = 719012;
											var w = shot - hits;
											if (w < 0 ) 
											{
												w = 0;
											}
											svalue = svalue + ((shot - w) * price);
											wpnvalue = wpnvalue + (shot * price);
										}
										if (i.weapons.hasOwnProperty('AGM-154A'))
										{
											console.log('walleye');
											var weapon = i.weapons["AGM-154A"]
											var shot = weapon.shot;
											var kills = weapon.kills;
											var hits = weapon.numHits;
											var price = 282000;
											var w = shot - hits;
											if (w < 0 ) 
											{
												w = 0;
											}
											svalue = svalue + ((shot - w) * price);
											wpnvalue = wpnvalue + (shot * price);
										}
										if (i.weapons.hasOwnProperty('R-27ER (AA-10C)'))
										{
											var weapon = i.weapons["R-27ER (AA-10C)"]
											var shot = weapon.shot;
											var kills = weapon.kills;
											var hits = weapon.numHits;
											var price = 950000.00;
											var w = shot - hits;
											if (w < 0 ) 
											{
												w = 0;
											}
											svalue = svalue + ((shot - w) * price);
											wpnvalue = wpnvalue + (shot * price);
										}
										if (i.weapons.hasOwnProperty('PL-5EII'))
										{
											var weapon = i.weapons["PL-5EII"]
											var shot = weapon.shot;
											var kills = weapon.kills;
											var hits = weapon.numHits;
											var price = 157111.87;
											var w = shot - hits;
											if (w < 0 ) 
											{
												w = 0;
											}
											svalue = svalue + ((shot - w) * price);
											wpnvalue = wpnvalue + (shot * price);
										}
										if (i.weapons.hasOwnProperty('SD-10'))
										{
											var weapon = i.weapons["SD-10"]
											var shot = weapon.shot;
											var kills = weapon.kills;
											var hits = weapon.numHits;
											var price = 936338.18;
											var w = shot - hits;
											if (w < 0 ) 
											{
												w = 0;
											}
											svalue = svalue + ((shot - w) * price);
											wpnvalue = wpnvalue + (shot * price);
										}
										if (i.weapons.hasOwnProperty('AIM-9X'))
										{
											var weapon = i.weapons["AIM-9X"]
											var shot = weapon.shot;
											var kills = weapon.kills;
											var hits = weapon.numHits;
											var price = 486160;
											var w = shot - hits;
											if (w < 0 ) 
											{
												w = 0;
											}
											svalue = svalue + ((shot - w) * price);
											wpnvalue = wpnvalue + (shot * price);
										}
										if (i.weapons.hasOwnProperty('AIM-7F'))
										{
											var weapon = i.weapons["AIM-7F"]
											var shot = weapon.shot;
											var kills = weapon.kills;
											var hits = weapon.numHits;
											var price = 611974.11;
											var w = shot - hits;
											if (w < 0 ) 
											{
												w = 0;
											}
											svalue = svalue + ((shot - w) * price);
											wpnvalue = wpnvalue + (shot * price);
										}
										if (i.weapons.hasOwnProperty('AIM-7M'))
										{
											var weapon = i.weapons["AIM-7M"]
											var shot = weapon.shot;
											var kills = weapon.kills;
											var hits = weapon.numHits;
											var price = 538865.59;
											var w = shot - hits;
											if (w < 0 ) 
											{
												w = 0;
											}
											svalue = svalue + ((shot - w) * price);
											wpnvalue = wpnvalue + (shot * price);
										}
										if (i.weapons.hasOwnProperty('AIM-9M'))
										{
											var weapon = i.weapons["AIM-9M"]
											var shot = weapon.shot;
											var kills = weapon.kills;
											var hits = weapon.numHits;
											var price = 209482.50;
											var w = shot - hits;
											if (w < 0 ) 
											{
												w = 0;
											}
											svalue = svalue + ((shot - w) * price);
											wpnvalue = wpnvalue + (shot * price);
										}
										if (i.weapons.hasOwnProperty('AIM-54A_Mk47'))
										{
											var weapon = i.weapons["AIM-54A_Mk47"]
											var shot = weapon.shot;
											var kills = weapon.kills;
											var hits = weapon.numHits;
											var price = 2273601;
											var w = shot - hits;
											if (w < 0 ) 
											{
												w = 0;
											}
											svalue = svalue + ((shot - w) * price);
											wpnvalue = wpnvalue + (shot * price);
										}
										if (i.weapons.hasOwnProperty('AIM-54A_Mk60'))
										{
											var weapon = i.weapons["AIM-54A_Mk60"]
											var shot = weapon.shot;
											var kills = weapon.kills;
											var hits = weapon.numHits;
											var price = 2273601;
											var w = shot - hits;
											if (w < 0 ) 
											{
												w = 0;
											}
											svalue = svalue + ((shot - w) * price);
											wpnvalue = wpnvalue + (shot * price);
										}
										if (i.weapons.hasOwnProperty('AIM_54C_Mk47'))
										{
											var weapon = i.weapons["AIM_54C_Mk47"]
											var shot = weapon.shot;
											var kills = weapon.kills;
											var hits = weapon.numHits;
											var price = 3546013.07;
											var w = shot - hits;
											if (w < 0 ) 
											{
												w = 0;
											}
											svalue = svalue + ((shot - w) * price);
											wpnvalue = wpnvalue + (shot * price);
										}
										if (i.weapons.hasOwnProperty('AIM-120C'))
										{
											var weapon = i.weapons["AIM-120C"]
											var shot = weapon.shot;
											var kills = weapon.kills;
											var hits = weapon.numHits;
											var price = 350000;
											var w = shot - hits;
											if (w < 0 ) 
											{
												w = 0;
											}
											svalue = svalue + ((shot - w) * price);											
											wpnvalue = wpnvalue + (shot * price);
										}
										if (i.weapons.hasOwnProperty('AIM-120B'))
										{
											var weapon = i.weapons["AIM-120B"]
											var shot = weapon.shot;
											var kills = weapon.kills;
											var hits = weapon.numHits;
											var price = 460904;
											var w = shot - hits;
											if (w < 0 ) 
											{
												w = 0;
											}
											svalue = svalue + ((shot - w) * price);
											wpnvalue = wpnvalue + (shot * price);
										}
										if (i.weapons.hasOwnProperty('AIM-120A'))
										{
											var weapon = i.weapons["AIM-120A"]
											var shot = weapon.shot;
											var kills = weapon.kills;
											var hits = weapon.numHits;
											var price = 460904.19;
											var w = shot - hits;
											if (w < 0 ) 
											{
												w = 0;
											}
											svalue = svalue + ((shot - w) * price);
											wpnvalue = wpnvalue + (shot * price);
										}
										if (i.weapons.hasOwnProperty('GBU-12'))
										{
											var weapon = i.weapons["GBU-12"]
											var shot = weapon.shot;
											var kills = weapon.kills;
											var hits = weapon.numHits;
											var price = 21862;
											var w = shot - hits;
											if (w < 0 ) 
											{
												w = 0;
											}
											svalue = svalue + ((shot - w) * price);
											
											wpnvalue = wpnvalue + (shot * price);
										}
										if (i.weapons.hasOwnProperty('GBU-16'))
										{
											var weapon = i.weapons["GBU-16"]
											var shot = weapon.shot;
											var kills = weapon.kills;
											var hits = weapon.numHits;
											var price = 30000;
											var w = shot - hits;
											if (w < 0 ) 
											{
												w = 0;
											}
											svalue = svalue + ((shot - w) * price);
											wpnvalue = wpnvalue + (shot * price);
										}
										if (i.weapons.hasOwnProperty('GBU-38'))
										{
											var weapon = i.weapons["GBU-38"]
											var shot = weapon.shot;
											var kills = weapon.kills;
											var hits = weapon.numHits;
											var price = 35245;
											var w = shot - hits;
											if (w < 0 ) 
											{
												w = 0;
											}
											svalue = svalue + ((shot - w) * price);											
											wpnvalue = wpnvalue + (shot * price);
										}
										if (i.weapons.hasOwnProperty('Mk-82'))
										{
											var weapon = i.weapons["Mk-82"]
											var shot = weapon.shot;
											var kills = weapon.kills;
											var hits = weapon.numHits;
											var price = 3651.68;
											var w = shot - hits;
											if (w < 0 ) 
											{
												w = 0;
											}
											svalue = svalue + ((shot - w) * price);
											wvalue = wvalue + (w * price);
											wpnvalue = wpnvalue + (shot * price);
										}
										if (i.weapons.hasOwnProperty('HYDRA-70 MK5'))
										{
											var weapon = i.weapons["HYDRA-70 MK5"]
											var shot = weapon.shot;
											var kills = weapon.kills;
											var hits = weapon.numHits;
											var price = 2799;
											var w = shot - hits;
											if (w < 0 ) 
											{
												w = 0;
											}
											svalue = svalue + ((shot - w) * price);
											wpnvalue = wpnvalue + (shot * price);
										}
										if (i.weapons.hasOwnProperty("CBU-97/CBU-105 SFW"))
										{
											var weapon = i.weapons["CBU-97/CBU-105 SFW"]
											var shot = weapon.shot;
											var kills = weapon.kills;
											var hits = weapon.numHits;
											var price = 873814.49;
											var w = shot - hits;
											if (w < 0 ) 
											{
												w = 0;
											}
											svalue = svalue + ((shot - w) * price);
											wpnvalue = wpnvalue + (shot * price);
										}
										if (i.weapons.hasOwnProperty('Mk-82'))
										{
											var weapon = i.weapons["Mk-82"]
											var shot = weapon.shot;
											var kills = weapon.kills;
											var hits = weapon.numHits;
											var price = 3651.68;
											var w = shot - hits;
											if (w < 0 ) 
											{
												w = 0;
											}
											svalue = svalue + ((shot - w) * price);
											wpnvalue = wpnvalue + (shot * price);
										}
										if (i.weapons.hasOwnProperty('C802AK'))
										{
											var weapon = i.weapons["C802AK"]
											var shot = weapon.shot;
											var kills = weapon.kills;
											var hits = weapon.numHits;
											var price = 1406812.00;
											var w = shot - hits;
											if (w < 0 ) 
											{
												w = 0;
											}
											svalue = svalue + ((shot - w) * price);											
											wpnvalue = wpnvalue + (shot * price);
										}
										if (i.weapons.hasOwnProperty('GB-6-SFW'))
										{
											var weapon = i.weapons["GB-6-SFW"]
											var shot = weapon.shot;
											var kills = weapon.kills;
											var hits = weapon.numHits;
											var price = 575209.60;
											var w = shot - hits;
											if (w < 0 ) 
											{
												w = 0;
											}
											svalue = svalue + ((shot - w) * price);
											
											wpnvalue = wpnvalue + (shot * price);
										}
										if (i.weapons.hasOwnProperty('LS-6-500'))
										{
											var weapon = i.weapons["LS-6-500"]
											var shot = weapon.shot;
											var kills = weapon.kills;
											var hits = weapon.numHits;
											var price = 225600;
											var w = shot - hits;
											if (w < 0 ) 
											{
												w = 0;
											}
											svalue = svalue + ((shot - w) * price);
											wpnvalue = wpnvalue + (shot * price);
										}
										if (i.weapons.hasOwnProperty('S-8KOM'))
										{
											var weapon = i.weapons["S-8KOM"]
											var shot = weapon.shot;
											var kills = weapon.kills;
											var hits = weapon.numHits;
											var price = 2799;
											var w = shot - hits;
											if (w < 0 ) 
											{
												w = 0;
											}
											svalue = svalue + ((shot - w) * price);
											wpnvalue = wpnvalue + (shot * price);
										}
										if (i.weapons.hasOwnProperty('Vikhr M'))
										{
											var weapon = i.weapons["Vikhr M"]
											var shot = weapon.shot;
											var kills = weapon.kills;
											var hits = weapon.numHits;
											var price = 31851.90;
											var w = shot - hits;
											if (w < 0 ) 
											{
												w = 0;
											}
											svalue = svalue + ((shot - w) * price);
											wpnvalue = wpnvalue + (shot * price);
										}
										
										if (i.weapons.hasOwnProperty('M-61'))
										{
											var weapon = i.weapons["M-61"]
											var shot = weapon.shot;
											var kills = weapon.kills;
											var hits = weapon.numHits;
											var price = 150;
											var w = shot - hits;
											if (w < 0 ) 
											{
												w = 0;
											}
											svalue = svalue + ((shot - w) * price);
											
											wpnvalue = wpnvalue + (shot * price);
										}
										if (i.weapons.hasOwnProperty('M-61A1'))
										{
											var weapon = i.weapons["M-61A1"]
											var shot = weapon.shot;
											var kills = weapon.kills;
											var hits = weapon.numHits;
											var price = 150;
											var w = shot - hits;
											if (w < 0 ) 
											{
												w = 0;
											}
											svalue = svalue + ((shot - w) * price);
											
											wpnvalue = wpnvalue + (shot * price);
										}
										if (i.weapons.hasOwnProperty('GAU-8'))
										{
											var weapon = i.weapons["GAU-8"]
											var shot = weapon.shot;
											var kills = weapon.kills;
											var hits = weapon.numHits;
											var price = 215;
											var w = shot - hits;
											if (w < 0 ) 
											{
												w = 0;
											}
											svalue = svalue + ((shot - w) * price);											
											wpnvalue = wpnvalue + (shot * price);
										}
										if (i.weapons.hasOwnProperty('Gsh-2-23'))
										{
											var weapon = i.weapons["Gsh-2-23"]
											var shot = weapon.shot;
											var kills = weapon.kills;
											var hits = weapon.numHits;
											var price = 152;
											var w = shot - hits;
											if (w < 0 ) 
											{
												w = 0;
											}
											svalue = svalue + ((shot - w) * price);
											wpnvalue = wpnvalue + (shot * price);
										}
										if (i.weapons.hasOwnProperty('2A42'))
										{
											var weapon = i.weapons["2A42"]
											var shot = weapon.shot;
											var kills = weapon.kills;
											var hits = weapon.numHits;
											var price = 212;
											var w = shot - hits;
											if (w < 0 ) 
											{
												w = 0;
											}
											svalue = svalue + ((shot - w) * price);
											wpnvalue = wpnvalue + (shot * price);
										}
										if (i.weapons.hasOwnProperty('GAU_12'))
										{
											var weapon = i.weapons["GAU_12"]
											var shot = weapon.shot;
											var kills = weapon.kills;
											var hits = weapon.numHits;
											var price = 170;
											var w = shot - hits;
											if (w < 0 ) 
											{
												w = 0;
											}
											svalue = svalue + ((shot - w) * price);
											wpnvalue = wpnvalue + (shot * price);
										}
										if (i.weapons.hasOwnProperty('DEFA 554'))
										{
											var weapon = i.weapons["DEFA 554"]
											var shot = weapon.shot;
											var kills = weapon.kills;
											var hits = weapon.numHits;
											var price = 215.3;
											var w = shot - hits;
											if (w < 0 ) 
											{
												w = 0;
											}
											svalue = svalue + ((shot - w) * price);
											wpnvalue = wpnvalue + (shot * price);
										}
									}
								
								
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
												cvalue = cvalue + i.kills["Ground Units"].total / 4;
                                                // add to pilots AG kills
                                                currentPilot.agKills = currentPilot.agKills + i.kills["Ground Units"].total

                                            }
											 if (i.kills["Ships"]) {

                                                // add to pilots total kills
                                                currentPilot.kills = currentPilot.kills + ( i.kills["Ships"].total)
												cvalue = cvalue + (i.kills["Ships"].total * 2);
                                                // add to pilots AG kills
                                                currentPilot.shipKills = currentPilot.shipKills + i.kills["Ships"].total

                                            }
											if (i.kills.Helicopters) {
												currentPilot.kills = (currentPilot.kills + i.kills.Helicopters.total)
												cvalue = cvalue + i.kills.Helicopters.total / 4;

												currentPilot.heliKills = (currentPilot.heliKills + i.kills.Helicopters.total)

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
                                                dvalue = dvalue + i.pvp.losses

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
                                          currentPilot.deaths = currentPilot.deaths + (i.actions.losses.pilotDeath)
										  wvalue = wvalue + (7500000 * i.actions.losses.pilotDeath); 
										  dvalue = dvalue + (i.actions.losses.pilotDeath /2 )
                                        }
                                        if (i.actions.losses.hasOwnProperty('crash'))
                                        {
                                          currentPilot.crashes = currentPilot.crashes + (i.actions.losses.crash)
										  if (key == "FA-18C_hornet") 
										  {
											  wvalue = wvalue + (37271473.27 * i.actions.losses.crash);
										  }
										  else if (key == "F-16C_50")
										  {
											  wvalue = wvalue + (31045881.45  * i.actions.losses.crash);
										  }
										  else if (key == "F-14B") 
										  {
											  wvalue = wvalue + (82091405.94 * i.actions.losses.crash);
										  }
										  else if (key == "F-5E-3")
										  {
											  wvalue = wvalue + (4789719.19 * i.actions.losses.crash);
										  }
										  else if (key == "F-15C") 
										  {
											  wvalue = wvalue + (47528342.94 * i.actions.losses.crash);
										  }
										  else if (key == "M-2000C") 
										  {
											  wvalue = wvalue + (38238709.96 * i.actions.losses.crash);
										  }
										  else if (key == "AJS37") 
										  {
											  wvalue = wvalue + (15515029.94 * i.actions.losses.crash);
										  }
										  else if (key == "AV9BNA") 
										  {
											  wvalue = wvalue + (25000000 * i.actions.losses.crash);
										  }
										  else if (key == "A-10C") 
										  {
											  wvalue = wvalue + (46300000 * i.actions.losses.crash);
										  }
										  else if (key == "J-11A") 
										  {
											  wvalue = wvalue + (32834169.71 * i.actions.losses.crash);
										  }
										  else if (key == "JF-17") 
										  {
											  wvalue = wvalue + (25000000 * i.actions.losses.crash);
										  }
										  else if (key == "MiG-29A") 
										  {
											  wvalue = wvalue + (23000000 * i.actions.losses.crash);
										  }
										  else if (key == "MiG-29S") 
										  {
											  wvalue = wvalue + (24468987.84 * i.actions.losses.crash);
										  }
										  else if (key == "MiG-21Bis") 
										  {
											  wvalue = wvalue + (10511196.75 * i.actions.losses.crash);
										  }
										  else if (key == "MiG-19P") 
										  {
											  wvalue = wvalue + (6000000 * i.actions.losses.crash);
										  }
										  else if (key == "Su-33") 
										  {
											  wvalue = wvalue + (55000000 * i.actions.losses.crash);
										  }
										  else if (key == "Su-27") 
										  {
											  wvalue = wvalue + (37000000 * i.actions.losses.crash);
										  }
										  else if (key == "Su-25T") 
										  {
											  wvalue = wvalue + (11000000 * i.actions.losses.crash);
										  }
										  else if (key == "Su-25") 
										  {
											  wvalue = wvalue + (11000000 * i.actions.losses.crash);
										  }
										  else if (key == "Ka-50") 
										  {
											  wvalue = wvalue + (8429956.57 * i.actions.losses.crash);
										  }
										  else if (key == "UH1-H") 
										  {
											  wvalue = wvalue + (4700000 * i.actions.losses.crash);
										  }
										  else if (key == "Mi-8MT") 
										  {
											  wvalue = wvalue + (5000000 * i.actions.losses.crash);
										  }
										  else if (key == "SA342L") 
										  {
											  wvalue = wvalue + (1158368.21 * i.actions.losses.crash);
										  }
										  else if (key == "SA342M") 
										  {
											  wvalue = wvalue + (1258368.21 * i.actions.losses.crash);
										  }
										  else if (key == "SA342Minigun") 
										  {
											  wvalue = wvalue + (1358368.21 * i.actions.losses.crash);
										  }
										  else if (key == "SA342Mistral") 
										  {
											  wvalue = wvalue + (1288368.21 * i.actions.losses.crash);
										  }
										  
										  dvalue = dvalue + (i.actions.losses.crash / 2)
                                        }
                                        if (i.actions.losses.hasOwnProperty('eject'))
                                        {
                                          currentPilot.ejects = currentPilot.ejects + (i.actions.losses.eject)
										  dvalue = dvalue + (i.actions.losses.eject / 4)
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
									currentPilot.ranking = cvalue - dvalue;
                                })

									if ((currentPilot.allStats == null) || (currentPilot.favAircraft.flightHours == 0) || (currentPilot.flightHours < 60 ) || (currentPilot.flightHours < 0) || (currentPilot.flightHours == null ) ||(currentPilot.flightHours_converted == "")){
										currentPilot.position = minpos
										currentPilot.ranking = -2500
										minpos = minpos + 1
									}

									if (pilot.name.includes('Mez') || pilot.name.includes('mez')) {
                                        currentPilot.callSign = '🐱' + currentPilot.callSign + '🐱'
                                    }
									if (pilot.name.includes('OceanOver') || pilot.name.includes('OceanOver')) {
                                        currentPilot.callSign = '🦕' + currentPilot.callSign + '🦕'
                                    }
									if (pilot.name.includes('Sock') || pilot.name.includes('Sock')) {
                                        currentPilot.callSign = '🦕🦕' + currentPilot.callSign + '🦕🦕'
                                    }
                                    //if (pilot.name.includes('Sock')) {
                                    //    currentPilot.position = 99
                                    //    currentPilot.ranking = -2500
                                    //    currentPilot.pvpLosses = 369
                                    //    currentPilot.aaKills = -69
                                    //    currentPilot.callSign = '🖕🖕🖕💩 Sock 💩🖕🖕🖕'
                                    //}
                                    if (pilot.name.includes('BooZer')) {
                                        currentPilot.callSign = currentPilot.callSign + '🍺'
                                    }
									wvalue = wvalue / 1000000;
									svalue = svalue / 1000000;
									wpnvalue = wpnvalue / 1000000;
								currentPilot.wasted = wvalue.toFixed(2);
								currentPilot.spent = svalue.toFixed(2);
								currentPilot.wpncost = wpnvalue.toFixed(2);
                                stats.push(currentPilot)
                                allPilot_q.resolve();

                        } else {
							if ((currentPilot.allStats == null) || (currentPilot.favAircraft.flightHours == 0) || (currentPilot.flightHours < 60 ) || (currentPilot.flightHours < 0) || (currentPilot.flightHours == null ) ||(currentPilot.flightHours_converted == "")){
										currentPilot.position = minpos
										currentPilot.ranking = -2500
										minpos = minpos + 1
									}
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
