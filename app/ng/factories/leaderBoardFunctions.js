(function() {
      angular.module("redIberia").factory("LeaderBoardFunctions", function($rootScope, $q, converterFactory, $filter) {
			var timeranked = false;
            var LeaderBoardFunctions = {};
			var minpos = 999;
			LeaderBoardFunctions.numberWithCommas = function(x) {
				return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
			}
			LeaderBoardFunctions.toggletimerank = function(){
				if (timeranked == false)
				{
					timeranked = true;
				}
				else
				{
					timeranked = false;
				}
			}
			LeaderBoardFunctions.reseteverstat = function(){
				LeaderBoardFunctions.everystat = 
					{
						deaths: 0,
						crashes: 0,
						ejects: 0,
						crashLanding: 0,
						pilotError: 0,
                        kills: 0,
						buildings: 0,
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
						wpncostformated: '',
						wpneffect: 0,
                        ranking: 0,
                        flightHours_converted: '',
						Walleye:0, 
						PL5:0, 
						SD10:0, 
						SLAM:0,
						SLAMER: 0,
						AGM_84: 0,
						HARM:0, 
						Maverick:0, 
						JSOW_A:0,
						JSOW_C:0,
						GBU10:0,
						GBU12:0,
						GBU16:0,
						GBU31:0,
						GBU38:0,
						GB6:0,
						CBU87_103:0,
						CBU97_105:0,
						C802AK:0,
						AIM120A:0,
						AIM120B:0,
						AIM7:0,
						AIM120C:0,
						AIM9M:0,
						AIM9X:0,
						AIM54:0,
						kh58U: 0,
						kh25MP: 0,
						MK82:0,
						MK20:0,
						MK83:0,
						MK84:0,
						BLG66:0,
						MAGIC:0,
						LD10:0,
						LS6:0,
						Matra_S530D:0,
						R27:0,
						R77:0,
						RBK250:0,
						RBK500:0,
						Rockeye:0,
						AT6: 0,
						S8KOM: 0,
						AP30: 0,
						HYDRA: 0,
						S8KOM: 0,
						Vikhr: 0,
						M61: 0,
						GAU8:0,
						Gsh223:0,
						_2A43:0,
						GAU12:0,
						AP30:0,
						M134:0,
						DEFA554:0,
					}
			}
            LeaderBoardFunctions.everystat = 
					{
						deaths: 0,
						crashes: 0,
						ejects: 0,
						crashLanding: 0,
						pilotError: 0,
                        kills: 0,
						buildings: 0,
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
						wpncostformated: '',
						wpneffect: 0,
                        ranking: 0,
                        flightHours_converted: '',
						Walleye:0, 
						PL5:0, 
						SD10:0, 
						SLAM:0,
						SLAMER: 0,
						AGM_84: 0,
						HARM:0, 
						Maverick:0, 
						JSOW_A:0,
						JSOW_C:0,
						GBU10:0,
						GBU12:0,
						GBU16:0,
						GBU31:0,
						GBU38:0,
						GB6:0,
						CBU87_103:0,
						CBU97_105:0,
						C802AK:0,
						AIM120A:0,
						AIM120B:0,
						AIM7:0,
						AIM120C:0,
						AIM9M:0,
						AIM9X:0,
						AIM54:0,
						kh58U: 0,
						kh25MP: 0,
						MK82:0,
						MK20:0,
						MK83:0,
						MK84:0,
						BLG66:0,
						MAGIC:0,
						LD10:0,
						LS6:0,
						Matra_S530D:0,
						R27:0,
						R77:0,
						RBK250:0,
						RBK500:0,
						Rockeye:0,
						AT6: 0,
						S8KOM: 0,
						AP30: 0,
						HYDRA: 0,
						S8KOM: 0,
						Vikhr: 0,
						M61: 0,
						GAU8:0,
						Gsh223:0,
						_2A43:0,
						GAU12:0,
						AP30:0,
						M134:0,
						DEFA554:0,
					}
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
								crashLanding: 0,
								pilotError: 0,
                                kills: 0,
								buildings: 0,
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
								wpneffect: 0,
                                ranking: 0,
								ppoints: 0,
								dpoints: 0,
                                flightHours_converted: '',
                                favAircraft: {
                                    flightHours: 0,
                                    frameName: '',
                                    flightHours_converted: ''
                                },
								favweapon: 'Unknown',
								lso: {
									wire1: 0,
									wire2: 0,
									wire3: 0,
									wire4: 0,
									grades: {
										
									}
								}

                        }
						var cvalue = 0;
                        var dvalue = 0;
						var svalue = 0;
						var wpnvalue = 0;
						var wvalue = 0;
						var wused = 0;
						// just tests
						
						var weapons = {
							Walleye:0, 
							PL5:0, 
							SD10:0, 
							SLAM:0,
							SALMER: 0,
							AGM_84: 0,
							HARM:0, 
							Maverick:0, 
							JSOW_A:0,
							JSOW_C:0,
							GBU10:0,
							GBU12:0,
							GBU16:0,
							GBU31:0,
							GBU38:0,
							BLG66:0,
							GB6:0,
							CBU87_103:0,
							CBU97_105:0,
							C802AK:0,
							AIM120A:0,
							AIM120B:0,
							AIM7:0,
							AIM120C:0,
							AIM9M:0,
							AIM9X:0,
							AIM54:0,
							kh58U: 0,
							kh25MP: 0,
							MK82:0,
							MK20:0,
							MK83:0,
							MK84:0,
							MAGIC:0,
							LD10:0,
							LS6:0,
							Matra_S530D:0,
							R27:0,
							R77:0,
							RBK250:0,
							RBK500:0,
							Rockeye:0,
							AT6: 0,
							S8KOM: 0,
							AP30: 0,
							};
						// make sure the pilot has aircraft stats to loop over
                        if (pilot.times != null) {

                            // now we loop over the times object to get the pilots stats
                            angular.forEach(pilot.times, function(i, key, index){
									// start working out how much each of these fucking pilots cost us ;) 
									if (i.hasOwnProperty('weapons')){
										//console.log(pilot.name);
										if (i.weapons == null)
										{
											return;
										}
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
											weapons.Walleye = weapons.Walleye + shot;
											LeaderBoardFunctions.everystat.Walleye = LeaderBoardFunctions.everystat.Walleye + shot;
											
										}
										if (i.weapons.hasOwnProperty('AGM-84D'))
										{
											var weapon = i.weapons["AGM-84D"]
											var shot = weapon.shot;
											var kills = weapon.kills;
											var hits = weapon.numHits;
											var price = 507520;
											var w = shot - hits;
											if (w < 0 ) 
											{
												w = 0;
											}
											weapons.AGM_84 = weapons.AGM_84 + shot;
											svalue = svalue + ((shot - w) * price);
											wpnvalue = wpnvalue + (shot * price);
											LeaderBoardFunctions.everystat.AGM_84 = LeaderBoardFunctions.everystat.AGM_84 + shot;
											
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
											weapons.SLAM = weapons.SLAM + shot;
											svalue = svalue + ((shot - w) * price);
											wpnvalue = wpnvalue + (shot * price);
											LeaderBoardFunctions.everystat.SLAM = LeaderBoardFunctions.everystat.SLAM + shot;
											
										}
										if (i.weapons.hasOwnProperty('AGM-84H'))
										{
											var weapon = i.weapons["AGM-84H"]
											var shot = weapon.shot;
											var kills = weapon.kills;
											var hits = weapon.numHits;
											var price = 3033468;
											var w = shot - hits;
											if (w < 0 ) 
											{
												w = 0;
											}
											svalue = svalue + ((shot - w) * price);
											wpnvalue = wpnvalue + (shot * price);
											weapons.SALMER = weapons.SALMER + shot;
											LeaderBoardFunctions.everystat.SLAMER = LeaderBoardFunctions.everystat.SLAMER + shot;
											
										}
										if (i.weapons.hasOwnProperty('AGM-88C'))
										{
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
											weapons.HARM = weapons.HARM + shot;
											LeaderBoardFunctions.everystat.HARM = LeaderBoardFunctions.everystat.HARM + shot;
											
											
										}
											if (i.weapons.hasOwnProperty('LD-10'))
										{
											var weapon = i.weapons["LD-10"]
											var shot = weapon.shot;
											var kills = weapon.kills;
											var hits = weapon.numHits;
											var price = 550000;
											var w = shot - hits;
											if (w < 0 ) 
											{
												w = 0;
											}
											svalue = svalue + ((shot - w) * price);
											wpnvalue = wpnvalue + (shot * price);
											weapons.LD10 = weapons.LD10 + shot;
											LeaderBoardFunctions.everystat.LD10 = LeaderBoardFunctions.everystat.LD10 + shot;
											
											
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
											weapons.Maverick = weapons.Maverick + shot;
											LeaderBoardFunctions.everystat.Maverick = LeaderBoardFunctions.everystat.Maverick + shot;
											
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
											weapons.Maverick = weapons.Maverick + shot;
											LeaderBoardFunctions.everystat.Maverick = LeaderBoardFunctions.everystat.Maverick + shot;
											
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
											weapons.Maverick = weapons.Maverick + shot;
											LeaderBoardFunctions.everystat.Maverick = LeaderBoardFunctions.everystat.Maverick + shot;
											
										}
										if (i.weapons.hasOwnProperty('AGM-65F'))
										{
											var weapon = i.weapons["AGM-65F"]
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
											weapons.Maverick = weapons.Maverick + shot;
											LeaderBoardFunctions.everystat.Maverick = LeaderBoardFunctions.everystat.Maverick + shot;
											
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
											weapons.Maverick = weapons.Maverick + shot;
											LeaderBoardFunctions.everystat.Maverick = LeaderBoardFunctions.everystat.Maverick + shot;
											
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
											weapons.JSOW_C = weapons.JSOW_C + shot;
											LeaderBoardFunctions.everystat.JSOW_C = LeaderBoardFunctions.everystat.JSOW_C + shot;
											
										}
										if (i.weapons.hasOwnProperty('AGM-154A'))
										{
											//console.log('walleye');
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
											weapons.JSOW_A = weapons.JSOW_A + shot;
											LeaderBoardFunctions.everystat.JSOW_A = LeaderBoardFunctions.everystat.JSOW_A + shot;
											
										}
										if (i.weapons.hasOwnProperty('Kh-58U'))
										{
											var weapon = i.weapons["Kh-58U"]
											var shot = weapon.shot;
											var kills = weapon.kills;
											var hits = weapon.numHits;
											var price = 27375;
											var w = shot - hits;
											if (w < 0 ) 
											{
												w = 0;
											}
											svalue = svalue + ((shot - w) * price);
											wpnvalue = wpnvalue + (shot * price);
											weapons.kh58U = weapons.kh58U + shot;
											LeaderBoardFunctions.everystat.kh58U = LeaderBoardFunctions.everystat.kh58U + shot;
											
										}
										if (i.weapons.hasOwnProperty('Kh-25MP'))
										{
											var weapon = i.weapons["Kh-25MP"]
											var shot = weapon.shot;
											var kills = weapon.kills;
											var hits = weapon.numHits;
											var price = 11080;
											var w = shot - hits;
											if (w < 0 ) 
											{
												w = 0;
											}
											svalue = svalue + ((shot - w) * price);
											wpnvalue = wpnvalue + (shot * price);
											weapons.kh25MP = weapons.kh25MP + shot;
											LeaderBoardFunctions.everystat.kh25MP = LeaderBoardFunctions.everystat.kh25MP + shot;
											
										}
										if (i.weapons.hasOwnProperty('AT-6'))
										{
											var weapon = i.weapons["AT-6"]
											var shot = weapon.shot;
											var kills = weapon.kills;
											var hits = weapon.numHits;
											var price = 50000;
											var w = shot - hits;
											if (w < 0 ) 
											{
												w = 0;
											}
											svalue = svalue + ((shot - w) * price);
											wpnvalue = wpnvalue + (shot * price);
											weapons.AT6 = weapons.AT6 + shot;
											LeaderBoardFunctions.everystat.AT6 = LeaderBoardFunctions.everystat.AT6 + shot;
											
										}
										// bombs
										if (i.weapons.hasOwnProperty('GBU-10'))
										{
											var weapon = i.weapons["GBU-10"]
											var shot = weapon.shot;
											var kills = weapon.kills;
											var hits = weapon.numHits;
											var price = 28862;
											var w = shot - hits;
											if (w < 0 ) 
											{
												w = 0;
											}
											svalue = svalue + ((shot - w) * price);
											wpnvalue = wpnvalue + (shot * price);
											weapons.GBU10 = weapons.GBU10 + shot;
											LeaderBoardFunctions.everystat.GBU10 = LeaderBoardFunctions.everystat.GBU10 + shot;
											
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
											weapons.GBU12 = weapons.GBU12 + shot;
											LeaderBoardFunctions.everystat.GBU12 = LeaderBoardFunctions.everystat.GBU12 + shot;
											
										}
										if (i.weapons.hasOwnProperty('GBU-16'))
										{
											var weapon = i.weapons["GBU-16"]
											var shot = weapon.shot;
											var kills = weapon.kills;
											var hits = weapon.numHits;
											var price = 18000;
											var w = shot - hits;
											if (w < 0 ) 
											{
												w = 0;
											}
											svalue = svalue + ((shot - w) * price);
											wpnvalue = wpnvalue + (shot * price);
											weapons.GBU16 = weapons.GBU16 + shot;
											LeaderBoardFunctions.everystat.GBU16 = LeaderBoardFunctions.everystat.GBU16 + shot;
																
										}
										
										if (i.weapons.hasOwnProperty('GBU-31(V)3/B'))
										{
											var weapon = i.weapons["GBU-31(V)3/B"]
											var shot = weapon.shot;
											var kills = weapon.kills;
											var hits = weapon.numHits;
											var price = 33245;
											var w = shot - hits;
											if (w < 0 ) 
											{
												w = 0;
											}
											svalue = svalue + ((shot - w) * price);											
											wpnvalue = wpnvalue + (shot * price);
											weapons.GBU31 = weapons.GBU31 + shot;
											LeaderBoardFunctions.everystat.GBU31 = LeaderBoardFunctions.everystat.GBU31 + shot;
											
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
											weapons.GBU38 = weapons.GBU38 + shot;
											LeaderBoardFunctions.everystat.GBU38 = LeaderBoardFunctions.everystat.GBU38 + shot;
											
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
											weapons.MK82 = weapons.MK82 + shot;
											LeaderBoardFunctions.everystat.MK82 = LeaderBoardFunctions.everystat.MK82 + shot;
											
										}
										if (i.weapons.hasOwnProperty('Mk-82 SnakeEye'))
										{
											var weapon = i.weapons["Mk-82 SnakeEye"]
											var shot = weapon.shot;
											var kills = weapon.kills;
											var hits = weapon.numHits;
											var price = 5651.68;
											var w = shot - hits;
											if (w < 0 ) 
											{
												w = 0;
											}
											svalue = svalue + ((shot - w) * price);
											wvalue = wvalue + (w * price);
											wpnvalue = wpnvalue + (shot * price);
											weapons.MK82 = weapons.MK82 + shot;
											LeaderBoardFunctions.everystat.MK82 = LeaderBoardFunctions.everystat.MK82 + shot;
											
										}
										
										if (i.weapons.hasOwnProperty('Mk-82AIR'))
										{
											var weapon = i.weapons["Mk-82AIR"]
											var shot = weapon.shot;
											var kills = weapon.kills;
											var hits = weapon.numHits;
											var price = 5651.68;
											var w = shot - hits;
											if (w < 0 ) 
											{
												w = 0;
											}
											svalue = svalue + ((shot - w) * price);
											wvalue = wvalue + (w * price);
											wpnvalue = wpnvalue + (shot * price);
											weapons.MK82 = weapons.MK82 + shot;
											LeaderBoardFunctions.everystat.MK82 = LeaderBoardFunctions.everystat.MK82 + shot;
											
										}
										
										if (i.weapons.hasOwnProperty('Mk-83'))
										{
											var weapon = i.weapons["Mk-83"]
											var shot = weapon.shot;
											var kills = weapon.kills;
											var hits = weapon.numHits;
											var price = 10000.68;
											var w = shot - hits;
											if (w < 0 ) 
											{
												w = 0;
											}
											svalue = svalue + ((shot - w) * price);
											wpnvalue = wpnvalue + (shot * price);
											weapons.MK83 = weapons.MK83 + shot;
											LeaderBoardFunctions.everystat.MK83 = LeaderBoardFunctions.everystat.MK83 + shot;
											
										}
										if (i.weapons.hasOwnProperty('Mk-84'))
										{
											var weapon = i.weapons["Mk-84"]
											var shot = weapon.shot;
											var kills = weapon.kills;
											var hits = weapon.numHits;
											var price = 16000.68;
											var w = shot - hits;
											if (w < 0 ) 
											{
												w = 0;
											}
											svalue = svalue + ((shot - w) * price);
											wpnvalue = wpnvalue + (shot * price);
											weapons.MK84 = weapons.MK84 + shot;
											LeaderBoardFunctions.everystat.MK84 = LeaderBoardFunctions.everystat.MK84 + shot;
											
										}
										
										if (i.weapons.hasOwnProperty("BLG-66 Belouga"))
										{
											var weapon = i.weapons["BLG-66 Belouga"]
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
											weapons.BLG66 = weapons.BLG66 + shot;
											LeaderBoardFunctions.everystat.BLG66 = LeaderBoardFunctions.everystat.BLG66 + shot;
											
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
											weapons.CBU97_105 = weapons.CBU97_105 + shot;
											LeaderBoardFunctions.everystat.CBU97_105 = LeaderBoardFunctions.everystat.CBU97_105 + shot;
											
										}
										if (i.weapons.hasOwnProperty("CBU-87/CBU-103 CEM"))
										{
											var weapon = i.weapons["CBU-87/CBU-103 CEM"]
											var shot = weapon.shot;
											var kills = weapon.kills;
											var hits = weapon.numHits;
											var price = 14000.49;
											var w = shot - hits;
											if (w < 0 ) 
											{
												w = 0;
											}
											svalue = svalue + ((shot - w) * price);
											wpnvalue = wpnvalue + (shot * price);
											weapons.CBU87_103 = weapons.CBU87_103 + shot;
											LeaderBoardFunctions.everystat.CBU87_103 = LeaderBoardFunctions.everystat.CBU87_103 + shot;
											
										}
										if (i.weapons.hasOwnProperty("Mk-20 Rockeye"))
										{
											var weapon = i.weapons["Mk-20 Rockeye"]
											var shot = weapon.shot;
											var kills = weapon.kills;
											var hits = weapon.numHits;
											var price = 14000.49;
											var w = shot - hits;
											if (w < 0 ) 
											{
												w = 0;
											}
											svalue = svalue + ((shot - w) * price);
											wpnvalue = wpnvalue + (shot * price);
											weapons.MK20 = weapons.MK20 + shot;
											LeaderBoardFunctions.everystat.MK20 = LeaderBoardFunctions.everystat.MK20 + shot;
											
										}
										if (i.weapons.hasOwnProperty("RBK-500 PTAB-10"))
										{
											var weapon = i.weapons["RBK-500 PTAB-10"]
											var shot = weapon.shot;
											var kills = weapon.kills;
											var hits = weapon.numHits;
											var price = 114000.49;
											var w = shot - hits;
											if (w < 0 ) 
											{
												w = 0;
											}
											svalue = svalue + ((shot - w) * price);
											wpnvalue = wpnvalue + (shot * price);
											weapons.RBK500 = weapons.RBK500 + shot;
											LeaderBoardFunctions.everystat.RBK500 = LeaderBoardFunctions.everystat.RBK500 + shot;
											
										}
										if (i.weapons.hasOwnProperty("RBK-500U PTAB-1M"))
										{
											var weapon = i.weapons["RBK-500U PTAB-1M"]
											var shot = weapon.shot;
											var kills = weapon.kills;
											var hits = weapon.numHits;
											var price = 214000.49;
											var w = shot - hits;
											if (w < 0 ) 
											{
												w = 0;
											}
											svalue = svalue + ((shot - w) * price);
											wpnvalue = wpnvalue + (shot * price);
											weapons.RBK500 = weapons.RBK500 + shot;
											LeaderBoardFunctions.everystat.RBK500 = LeaderBoardFunctions.everystat.RBK500 + shot;
											
										}
										if (i.weapons.hasOwnProperty("RBK-250"))
										{
											var weapon = i.weapons["RBK-250"]
											var shot = weapon.shot;
											var kills = weapon.kills;
											var hits = weapon.numHits;
											var price = 34000.49;
											var w = shot - hits;
											if (w < 0 ) 
											{
												w = 0;
											}
											svalue = svalue + ((shot - w) * price);
											wpnvalue = wpnvalue + (shot * price);
											weapons.RBK250 = weapons.RBK250 + shot;
											LeaderBoardFunctions.everystat.RBK250 = LeaderBoardFunctions.everystat.RBK250 + shot;
											
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
											weapons.C802AK = weapons.C802AK + shot;
											LeaderBoardFunctions.everystat.C802AK = LeaderBoardFunctions.everystat.C802AK + shot;
											
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
											weapons.GB6 = weapons.GB6 + shot;
											LeaderBoardFunctions.everystat.GB6 = LeaderBoardFunctions.everystat.GB6 + shot;
											
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
											weapons.LS6 = weapons.LS6 + shot;
											LeaderBoardFunctions.everystat.LS6 = LeaderBoardFunctions.everystat.LS6 + shot;
											
										}
										// Air to air missiles.
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
											weapons.R27 = weapons.R27 + shot;
											LeaderBoardFunctions.everystat.R27 = LeaderBoardFunctions.everystat.R27 + shot;
											
										}
										if (i.weapons.hasOwnProperty('R-77 (AA-12 Adder)'))
										{
											var weapon = i.weapons["R-77 (AA-12 Adder)"]
											var shot = weapon.shot;
											var kills = weapon.kills;
											var hits = weapon.numHits;
											var price = 400000.00;
											var w = shot - hits;
											if (w < 0 ) 
											{
												w = 0;
											}
											svalue = svalue + ((shot - w) * price);
											wpnvalue = wpnvalue + (shot * price);
											weapons.R77 = weapons.R77 + shot;
											LeaderBoardFunctions.everystat.R77 = LeaderBoardFunctions.everystat.R77 + shot;
											
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
											weapons.PL5 = weapons.PL5 + shot;
											LeaderBoardFunctions.everystat.PL5 = LeaderBoardFunctions.everystat.PL5 + shot;
											
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
											weapons.SD10 = weapons.SD10 + shot;
											LeaderBoardFunctions.everystat.SD10 = LeaderBoardFunctions.everystat.SD10 + shot;
											
										}
										
										if (i.weapons.hasOwnProperty('MMagicII'))
										{
											var weapon = i.weapons["MMagicII"]
											var shot = weapon.shot;
											var kills = weapon.kills;
											var hits = weapon.numHits;
											var price = 256160;
											var w = shot - hits;
											if (w < 0 ) 
											{
												w = 0;
											}
											svalue = svalue + ((shot - w) * price);
											wpnvalue = wpnvalue + (shot * price);
											weapons.MAGIC = weapons.MAGIC + shot;
											LeaderBoardFunctions.everystat.MAGIC = LeaderBoardFunctions.everystat.MAGIC + shot;
											
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
											weapons.AIM9X = weapons.AIM9X + shot;
											LeaderBoardFunctions.everystat.AIM9X = LeaderBoardFunctions.everystat.AIM9X + shot;
											
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
											weapons.AIM7 = weapons.AIM7 + shot;
											LeaderBoardFunctions.everystat.AIM7 = LeaderBoardFunctions.everystat.AIM7 + shot;
											
										}
										
										if (i.weapons.hasOwnProperty('AIM-7MH'))
										{
											var weapon = i.weapons["AIM-7MH"]
											var shot = weapon.shot;
											var kills = weapon.kills;
											var hits = weapon.numHits;
											var price = 578865.59;
											var w = shot - hits;
											if (w < 0 ) 
											{
												w = 0;
											}
											svalue = svalue + ((shot - w) * price);
											wpnvalue = wpnvalue + (shot * price);
											weapons.AIM7 = weapons.AIM7 + shot;
											LeaderBoardFunctions.everystat.AIM7 = LeaderBoardFunctions.everystat.AIM7 + shot;
											
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
											weapons.AIM7 = weapons.AIM7 + shot;
											LeaderBoardFunctions.everystat.AIM7 = LeaderBoardFunctions.everystat.AIM7 + shot;
											
										}
										if (i.weapons.hasOwnProperty('Matra_S530D'))
										{
											var weapon = i.weapons["Matra_S530D"]
											var shot = weapon.shot;
											var kills = weapon.kills;
											var hits = weapon.numHits;
											var price = 528865.59;
											var w = shot - hits;
											if (w < 0 ) 
											{
												w = 0;
											}
											svalue = svalue + ((shot - w) * price);
											wpnvalue = wpnvalue + (shot * price);
											weapons.Matra_S530D = weapons.Matra_S530D + shot;
											LeaderBoardFunctions.everystat.Matra_S530D = LeaderBoardFunctions.everystat.Matra_S530D + shot;
											
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
											weapons.AIM9M = weapons.AIM9M + shot;
											LeaderBoardFunctions.everystat.AIM9m = LeaderBoardFunctions.everystat.AIM9M + shot;
											
										}
										if (i.weapons.hasOwnProperty('AIM-54A-Mk47'))
										{
											var weapon = i.weapons["AIM-54A-Mk47"]
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
											weapons.AIM54 = weapons.AIM54 + shot;
											LeaderBoardFunctions.everystat.AIM54 = LeaderBoardFunctions.everystat.AIM54 + shot;
											
										}
										if (i.weapons.hasOwnProperty('AIM-54A-Mk60'))
										{
											var weapon = i.weapons["AIM-54A-Mk60"]
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
											weapons.AIM54 = weapons.AIM54 + shot;
											LeaderBoardFunctions.everystat.AIM54 = LeaderBoardFunctions.everystat.AIM54 + shot;
											
										}
										if (i.weapons.hasOwnProperty('AIM_54C-Mk47'))
										{
											var weapon = i.weapons["AIM_54C-Mk47"]
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
											weapons.AIM54 = weapons.AIM54 + shot;
											LeaderBoardFunctions.everystat.AIM54 = LeaderBoardFunctions.everystat.AIM54 + shot;
											
										}
										if (i.weapons.hasOwnProperty('AIM-120C-5'))
										{
											var weapon = i.weapons["AIM-120C-5"]
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
											weapons.AIM120C = weapons.AIM120C + shot;
											LeaderBoardFunctions.everystat.AIM120C = LeaderBoardFunctions.everystat.AIM120C + shot;
											
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
											weapons.AIM120C = weapons.AIM120C + shot;
											LeaderBoardFunctions.everystat.AIM120C = LeaderBoardFunctions.everystat.AIM120C + shot;
											
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
											weapons.AIM120B = weapons.AIM120B + shot;
											LeaderBoardFunctions.everystat.AIM120B = LeaderBoardFunctions.everystat.AIM120B + shot;
											
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
											weapons.AIM120A = weapons.AIM120A + shot;
											LeaderBoardFunctions.everystat.AIM120A = LeaderBoardFunctions.everystat.AIM120A + shot;
											
										}
										//rockets
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
											LeaderBoardFunctions.everystat.HYDRA = LeaderBoardFunctions.everystat.HYDRA + shot;
											
										}
										if (i.weapons.hasOwnProperty('HYDRA-70 M154'))
										{
											var weapon = i.weapons["HYDRA-70 M154"]
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
											LeaderBoardFunctions.everystat.HYDRA = LeaderBoardFunctions.everystat.HYDRA + shot;
											
										}
										if (i.weapons.hasOwnProperty('HYDRA-70 M154 WP'))
										{
											var weapon = i.weapons["HYDRA-70 M154 WP"]
											var shot = weapon.shot;
											var kills = weapon.kills;
											var hits = weapon.numHits;
											var price = 1799;
											var w = shot - hits;
											if (w < 0 ) 
											{
												w = 0;
											}
											svalue = svalue + ((shot - w) * price);
											wpnvalue = wpnvalue + (shot * price);
											LeaderBoardFunctions.everystat.HYDRA = LeaderBoardFunctions.everystat.HYDRA + shot;
											
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
											LeaderBoardFunctions.everystat.S8KOM = LeaderBoardFunctions.everystat.S8KOM + shot;
											
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
											LeaderBoardFunctions.everystat.Vikhr = LeaderBoardFunctions.everystat.Vikhr + shot;
											
										}
										// Cannon or Guns.
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
											LeaderBoardFunctions.everystat.M61 = LeaderBoardFunctions.everystat.M61 + shot;
											
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
											LeaderBoardFunctions.everystat.M61 = LeaderBoardFunctions.everystat.M61 + shot;
											
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
											LeaderBoardFunctions.everystat.GAU8 = LeaderBoardFunctions.everystat.GAU8 + shot;
											
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
											LeaderBoardFunctions.everystat.Gsh223 = LeaderBoardFunctions.everystat.Gsh223 + shot;
											
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
											LeaderBoardFunctions.everystat._2A43 = LeaderBoardFunctions.everystat._2A43 + shot;
											
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
											LeaderBoardFunctions.everystat.GAU12 = LeaderBoardFunctions.everystat.GAU12 + shot;
											
										}
										if (i.weapons.hasOwnProperty('AP-30 Plamya'))
										{
											var weapon = i.weapons["AP-30 Plamya"]
											var shot = weapon.shot;
											var kills = weapon.kills;
											var hits = weapon.numHits;
											var price = 270;
											var w = shot - hits;
											if (w < 0 ) 
											{
												w = 0;
											}
											svalue = svalue + ((shot - w) * price);
											wpnvalue = wpnvalue + (shot * price);
											LeaderBoardFunctions.everystat.AP30 = LeaderBoardFunctions.everystat.A30 + shot;
											
										}
										if (i.weapons.hasOwnProperty('M134 Minigun'))
										{
											var weapon = i.weapons["M134 Minigun"]
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
											LeaderBoardFunctions.everystat.M134 = LeaderBoardFunctions.everystat.M134 + shot;
											
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
											LeaderBoardFunctions.everystat.DEFA554 = LeaderBoardFunctions.everystat.DEFA554 + shot;
											
										}
									}
									// truuncate the wpncost if it's not 0
									if (Number.isNaN(wpnvalue))
									{
										wpnvalue = 0
									}
									var tempval = wpnvalue
									//// console.log("tv is:")
									//console.log(tempval)
									tempval = LeaderBoardFunctions.everystat.wpncost + tempval
									//// console.log("tv now is:")
									//console.log(tempval)
									//// console.log("LeaderBoardFunctions.everystat.wpncost is now:")
									LeaderBoardFunctions.everystat.wpncost = tempval
									//console.log(LeaderBoardFunctions.everystat.wpncost)
									
									
                                    // get pilots kills
                                    if (i.hasOwnProperty('kills')) {
											if (i.kills.hasOwnProperty('Buildings'))
											{
												currentPilot.kills = currentPilot.kills + ( i.kills["Buildings"].total)
												cvalue = cvalue + i.kills["Buildings"].total
												currentPilot.buildings = currentPilot.buildings + i.kills["Buildings"].total
												LeaderBoardFunctions.everystat.kills = LeaderBoardFunctions.everystat.kills + ( i.kills["Buildings"].total)
												LeaderBoardFunctions.everystat.buildings = LeaderBoardFunctions.everystat.buildings + i.kills["Buildings"].total
											}
                                            // get AA kills
                                            if (i.kills.hasOwnProperty('Planes')) {
												if (i.kills.Planes.hasOwnProperty('Attack'))
												{
													cvalue = cvalue + (i.kills.Planes.Attack * 3);
													// console.log("Attack");
													//console.log(cvalue);
												}
												if (i.kills.Planes.hasOwnProperty('Support'))
												{
													cvalue = cvalue + (i.kills.Planes.Support * 3);
													// console.log("Support");
													//console.log(cvalue);
												}
												if (i.kills.Planes.hasOwnProperty('Bombers'))
												{
													cvalue = cvalue + (i.kills.Planes.Bombers * 3);
													// console.log("Bombers");
													//console.log(cvalue);
												}
												if (i.kills.Planes.hasOwnProperty('Fighters'))
												{
													cvalue = cvalue + (i.kills.Planes.Fighters * 5);
													// console.log("Fighters");
													//console.log(cvalue);
												}
                                                // add to pilots total kills
                                                currentPilot.kills = currentPilot.kills + i.kills.Planes.total;
												// cvalue = cvalue + (i.kills.Planes.total * 5);
                                                // add to pilots AA kills
                                                currentPilot.aaKills = currentPilot.aaKills + i.kills.Planes.total;
												
												LeaderBoardFunctions.everystat.kills = LeaderBoardFunctions.everystat.kills + i.kills.Planes.total;
												LeaderBoardFunctions.everystat.aaKills = LeaderBoardFunctions.everystat.aaKills + i.kills.Planes.total;
												

                                            }
                                            // get AG kills
                                            if (i.kills.hasOwnProperty("Ground Units")) {
												if (i.kills["Ground Units"].hasOwnProperty('AAA'))
												{
													cvalue = cvalue + (i.kills["Ground Units"].AAA * 0.75);
													// console.log("AAA");
													//console.log(cvalue);
												}
												if (i.kills["Ground Units"].hasOwnProperty('SAM'))
												{
													cvalue = cvalue + (i.kills["Ground Units"].SAM * 1);
													// console.log("SAM");
													//console.log(cvalue);
												}
												if (i.kills["Ground Units"].hasOwnProperty('EWR'))
												{
													cvalue = cvalue + (i.kills["Ground Units"].EWR * 1);
													// console.log("EWR");
													//console.log(cvalue);
												}
												if (i.kills["Ground Units"].hasOwnProperty('Arty/MLRS'))
												{
													cvalue = cvalue + (i.kills["Ground Units"]["Arty/MLRS"] * 0.5);
													// console.log("ARty");
													//console.log(cvalue);
												}
												if (i.kills["Ground Units"].hasOwnProperty('Infantry'))
												{
													cvalue = cvalue + (i.kills["Ground Units"].Infantry * 0.1);
													// console.log("Inf");
													//console.log(cvalue);
												}
												if (i.kills["Ground Units"].hasOwnProperty('Tanks'))
												{
													cvalue = cvalue + (i.kills["Ground Units"]['Tanks'] * 0.5);
													// console.log("Tanks");
													//console.log(cvalue);
												}
												if (i.kills["Ground Units"].hasOwnProperty('Unarmored'))
												{
													cvalue = cvalue + (i.kills["Ground Units"].Unarmored * 0.2);
													// console.log("Unarmored");
													//console.log(cvalue);
												}
												if (i.kills["Ground Units"].hasOwnProperty('IVF'))
												{
													cvalue = cvalue + (i.kills["Ground Units"].IVF * 0.4);
													// console.log("IVF");
													//console.log(cvalue);
												}
												if (i.kills["Ground Units"].hasOwnProperty('APC'))
												{
													cvalue = cvalue + (i.kills["Ground Units"].APC * 0.4);
													// console.log("APC");
													//console.log(cvalue);
												}
												if (i.kills["Ground Units"].hasOwnProperty('Forts'))
												{
													cvalue = cvalue + (i.kills["Ground Units"].Forts * 0.3);
													// console.log("Forts");
													//console.log(cvalue);
												}
                                                // add to pilots total kills
                                                currentPilot.kills = currentPilot.kills + ( i.kills["Ground Units"].total)
												// cvalue = cvalue + i.kills["Ground Units"].total;
                                                // add to pilots AG kills
                                                currentPilot.agKills = currentPilot.agKills + i.kills["Ground Units"].total
												
												LeaderBoardFunctions.everystat.kills = LeaderBoardFunctions.everystat.kills + ( i.kills["Ground Units"].total)
												
												LeaderBoardFunctions.everystat.agKills = LeaderBoardFunctions.everystat.agKills + i.kills["Ground Units"].total

                                            }
											 if (i.kills.hasOwnProperty("Ships")) {
												if (i.kills["Ships"].hasOwnProperty('Warships'))
												{
													cvalue = cvalue + (i.kills["Ships"].Warships * 10);													// console.log("Warships");
													//console.log(cvalue);
												}
												if (i.kills["Ships"].hasOwnProperty('Unarmed'))
												{
													cvalue = cvalue + (i.kills["Ships"].Unarmed * 1);
													// console.log("Unarmed");
													//console.log(cvalue);
												}
                                                // add to pilots total kills
                                                currentPilot.kills = currentPilot.kills + ( i.kills["Ships"].total)
												
												LeaderBoardFunctions.everystat.kills = LeaderBoardFunctions.everystat.kills + ( i.kills["Ships"].total)
												
												//cvalue = cvalue + (i.kills["Ships"].total * 10);
                                                // add to pilots AG kills
                                                currentPilot.shipKills = currentPilot.shipKills + i.kills["Ships"].total
												
												LeaderBoardFunctions.everystat.shipKills = LeaderBoardFunctions.everystat.shipKills + i.kills["Ships"].total

                                            }
											if (i.kills.hasOwnProperty("Helicopters")) {
												if (i.kills.Helicopters.hasOwnProperty('Attack'))
												{
													cvalue = cvalue + (i.kills.Helicopters.Attack * 2);
													// console.log("AH");
													//console.log(cvalue);
												}
												if (i.kills.Helicopters.hasOwnProperty('Utility'))
												{
													cvalue = cvalue + (i.kills.Helicopters.Utility * 1);
													// console.log("UH");
													//console.log(cvalue);
												}
												currentPilot.kills = (currentPilot.kills + i.kills.Helicopters.total)
												
												LeaderBoardFunctions.everystat.kills = (LeaderBoardFunctions.everystat.kills + i.kills.Helicopters.total)
												//cvalue = cvalue + i.kills.Helicopters.total * 2;

												currentPilot.heliKills = (currentPilot.heliKills + i.kills.Helicopters.total)
												
												LeaderBoardFunctions.everystat.heliKills = (LeaderBoardFunctions.everystat.heliKills + i.kills.Helicopters.total)
											}
                                        }
                                    // get PvP stats
                                    if (i.hasOwnProperty('pvp')) {
                                            if (i.pvp.hasOwnProperty('kills')) {
												if ((key == "A-10C")  ||  (key == "A-10C_2") || (key == "F-5E-3") || (key == "Su-25") || (key == "Su-25T") || (key == "AV8BNA"))
												{
													cvalue = cvalue + (i.pvp.kills * 5)
													currentPilot.kills = currentPilot.kills + (i.pvp.kills)
												}
												else if ((key == "UH-1H LG") || (key == "UH-1H RG") || (key == "UH-1H") || (key == "Mi-8MT") ||  (key == "Ka-50") || (key == "SA342L") || (key == "SA342M") || (key == "SA342Minigun") ||  (key == "SA342Mistral") ||  (key == "Mi-24P"))
												{
														cvalue = cvalue + (i.pvp.kills * 10)
														currentPilot.kills = currentPilot.kills + (i.pvp.kills)
												}
												else
												{
													// add to pilots total kills
													currentPilot.kills = currentPilot.kills + (i.pvp.kills)
													cvalue = cvalue + (i.pvp.kills * 1)
                                                }
												// add to pilots pvp Kills
												
                                                currentPilot.pvpKills = currentPilot.pvpKills + i.pvp.kills
												LeaderBoardFunctions.everystat.pvpKills = LeaderBoardFunctions.everystat.pvpKills + i.pvp.kills
                                            }
                                            if (i.pvp.hasOwnProperty('losses')) {
                                                // add to pilots total deaths
                                                 dvalue = dvalue + i.pvp.losses

                                                // add to pilots pvp deaths
                                                currentPilot.pvpLosses = currentPilot.pvpLosses + i.pvp.losses
												LeaderBoardFunctions.everystat.pvpLosses = LeaderBoardFunctions.everystat.pvpLosses + i.pvp.losses
                                            }

                                    }
                                    // get actions
                                    if (i.hasOwnProperty('actions')) {
										if (i.actions.hasOwnProperty('lostTo'))
										{
											if (i.actions.lostTo.hasOwnProperty('Ground Units'))
											{
												if (i.actions.lostTo["Ground Units"].hasOwnProperty('AAA'))
												{
													dvalue = dvalue + (i.actions.lostTo["Ground Units"].AAA * 1);
													// console.log("D AAA");
													//console.log(dvalue);
												}
												if (i.actions.lostTo["Ground Units"].hasOwnProperty('SAM'))
												{
													dvalue = dvalue + (i.actions.lostTo["Ground Units"].SAM * 1);
													// console.log("D SAM");
													//console.log(dvalue);
												}
												if (i.actions.lostTo["Ground Units"].hasOwnProperty('EWR'))
												{
													dvalue = dvalue + (i.actions.lostTo["Ground Units"].EWR * 1);
													// console.log("D EWR");
													//console.log(dvalue);
												}
												if (i.actions.lostTo["Ground Units"].hasOwnProperty('Arty/MLRS'))
												{
													dvalue = dvalue + (i.actions.lostTo["Ground Units"]["Arty/MLRS"] * 2);
													// console.log("D ARty");
													//console.log(dvalue);
												}
												if (i.actions.lostTo["Ground Units"].hasOwnProperty('Infantry'))
												{
													dvalue = dvalue + (i.actions.lostTo["Ground Units"].Infantry * 5);
													// console.log("DInf");
													//console.log(dvalue);
												}
												if (i.actions.lostTo["Ground Units"].hasOwnProperty('Tanks'))
												{
													dvalue = dvalue + (i.actions.lostTo["Ground Units"]['Tanks'] * 3);
													// console.log("D Tanks");
													//console.log(dvalue);
												}
												if (i.actions.lostTo["Ground Units"].hasOwnProperty('Unarmored'))
												{
													dvalue = dvalue + (i.actions.lostTo["Ground Units"].Unarmored * 10);
													// console.log("D Unarmored");
													//console.log(dvalue);
												}
												if (i.actions.lostTo["Ground Units"].hasOwnProperty('IVF'))
												{
													dvalue = dvalue + (i.actions.lostTo["Ground Units"].IVF * 3);
													// console.log("D IVF");
													//console.log(dvalue);
												}
												if (i.actions.lostTo["Ground Units"].hasOwnProperty('APC'))
												{
													dvalue = dvalue + (i.actions.lostTo["Ground Units"].APC * 3);
													// console.log("D APC");
													//console.log(dvalue);
												}
												if (i.actions.lostTo["Ground Units"].hasOwnProperty('Forts'))
												{
													dvalue = dvalue + (i.actions.lostTo["Ground Units"].Forts * 5);
													// console.log("Forts");
													//console.log(dvalue);
												}
											}
											if (i.actions.lostTo.hasOwnProperty('Planes'))
											{
												if (i.actions.lostTo.Planes.hasOwnProperty('Attack'))
												{
													dvalue = dvalue + (i.actions.lostTo.Planes.Attack * 3);
													// console.log("D Attack");
													//console.log(dvalue);
												}
												if (i.actions.lostTo.Planes.hasOwnProperty('Support'))
												{
													dvalue = dvalue + (i.actions.lostTo.Planes.Support * 5);
													// console.log("D Support");
													//console.log(dvalue);
												}
												if (i.actions.lostTo.Planes.hasOwnProperty('Bombers'))
												{
													dvalue = dvalue + (i.actions.lostTo.Planes.Bombers * 4);
													// console.log("D Bombers");
													//console.log(dvalue);
												}
												if (i.actions.lostTo.Planes.hasOwnProperty('Fighters'))
												{
													dvalue = dvalue + (i.actions.lostTo.Planes.Fighters * 1);
													// console.log("D Fighters");
													//console.log(dvalue);
												}
												
											}
											if (i.actions.lostTo.hasOwnProperty("Helicopters")) {
												if (i.actions.lostTo.Helicopters.hasOwnProperty('Attack'))
												{
													dvalue = dvalue + (i.actions.lostTo.Helicopters.Attack * 2);
													// console.log("D AH");
													//console.log(dvalue);
												}
												if (i.actions.lostTo.Helicopters.hasOwnProperty('Utility'))
												{
													dvalue = dvalue + (i.kills.Helicopters.Utility * 5);
													// console.log("D UH");
													//console.log(dvalue);
												}
											}
											if (i.actions.lostTo.hasOwnProperty("Ships")) {
												if (i.actions.lostTo["Ships"].hasOwnProperty('Warships'))
												{
													dvalue = dvalue + (i.actions.lostTo["Ships"].Warships * 1);													// console.log("Warships");
													//console.log(dvalue);
												}
												if (i.actions.lostTo["Ships"].hasOwnProperty('Unarmed'))
												{
													dvalue = dvalue + (i.actions.lostTo["Ships"].Unarmed * 5);
													// console.log("D Unarmed");
													//console.log(dvalue);
												}
											}
											
											
										}
										if (i.actions.hasOwnProperty('losses'))
										{
											if (i.actions.losses.hasOwnProperty('crashLanding'))
											{
												currentPilot.crashLanding = currentPilot.crashLanding + (i.actions.losses.crashLanding)
												LeaderBoardFunctions.everystat.crashLanding = LeaderBoardFunctions.everystat.crashLanding + (i.actions.losses.crashLanding)
												wvalue = wvalue + (37271473.27 * i.actions.losses.crashLanding);
												dvalue = dvalue + (i.actions.losses.crashLanding * 3)
											}
											if (i.actions.losses.hasOwnProperty('pilotError'))
											{
												currentPilot.pilotError = currentPilot.pilotError + (i.actions.losses.pilotError)
												LeaderBoardFunctions.everystat.pilotError = LeaderBoardFunctions.everystat.pilotError + (i.actions.losses.pilotError)
												if (key == "FA-18C_hornet") 
												{
													wvalue = wvalue + (37271473.27 * i.actions.losses.pilotError);
													dvalue = dvalue + (i.actions.losses.pilotError * 3)
												}
												else if (key == "F-16C_50")
												{
													wvalue = wvalue + (31045881.45  * i.actions.losses.pilotError);
													dvalue = dvalue + (i.actions.losses.pilotError * 3)
												}
												else if (key == "F-14B") 
												{
													wvalue = wvalue + (82091405.94 * i.actions.losses.pilotError);
													dvalue = dvalue + (i.actions.losses.pilotError * 3)
												}
												else if (key == "F-14B RIO")
												{
													wvalue = wvalue + (80091405.94 * i.actions.losses.pilotError);
													dvalue = dvalue + (i.actions.losses.pilotError * 3)
												}
												else if (key == "F-14A-135-GR") 
												{
													wvalue = wvalue + (80091405.94 * i.actions.losses.pilotError);
													dvalue = dvalue + (i.actions.losses.pilotError * 3)
												}
												else if (key == "F-14A-135-GR RIO")
												{
													wvalue = wvalue + (80091405.94 * i.actions.losses.pilotError);
													dvalue = dvalue + (i.actions.losses.pilotError * 3)
												}
												else if (key == "F-5E-3")
												{
													wvalue = wvalue + (4789719.19 * i.actions.losses.pilotError);
													dvalue = dvalue + (i.actions.losses.pilotError * 2)
												}
												else if (key == "F-15C") 
												{
													wvalue = wvalue + (47528342.94 * i.actions.losses.pilotError);
													dvalue = dvalue + (i.actions.losses.pilotError * 3)
												}
												else if (key == "M-2000C") 
												{
													wvalue = wvalue + (38238709.96 * i.actions.losses.pilotError);
													dvalue = dvalue + (i.actions.losses.pilotError * 3)
												}
												else if (key == "AJS37") 
												{
													wvalue = wvalue + (15515029.94 * i.actions.losses.pilotError);
													dvalue = dvalue + (i.actions.losses.pilotError * 3)
												}
												else if (key == "AV8BNA") 
												{
													wvalue = wvalue + (25000000 * i.actions.losses.pilotError);
													dvalue = dvalue + (i.actions.losses.pilotError * 3)
												}
												else if (key == "A-10C") 
												{
													wvalue = wvalue + (46300000 * i.actions.losses.pilotError);
													dvalue = dvalue + (i.actions.losses.pilotError * 3)
												}
												else if (key == "A-10C_2") 
												{
													wvalue = wvalue + (46900000 * i.actions.losses.pilotError);
													dvalue = dvalue + (i.actions.losses.pilotError * 3)
												}
												else if (key == "J-11A") 
												{
													wvalue = wvalue + (32834169.71 * i.actions.losses.pilotError);
													dvalue = dvalue + (i.actions.losses.pilotError * 3)
												}
												else if (key == "JF-17") 
												{
													wvalue = wvalue + (25000000 * i.actions.losses.pilotError);
													dvalue = dvalue + (i.actions.losses.pilotError * 3)
												}
												else if (key == "MiG-29A") 
												{
													wvalue = wvalue + (23000000 * i.actions.losses.pilotError);
													dvalue = dvalue + (i.actions.losses.pilotError * 3)
												}
												else if (key == "MiG-29S") 
												{
													wvalue = wvalue + (24468987.84 * i.actions.losses.pilotError);
													dvalue = dvalue + (i.actions.losses.pilotError * 3)
												}
												else if (key == "MiG-21Bis") 
												{
													wvalue = wvalue + (10511196.75 * i.actions.losses.pilotError);
													dvalue = dvalue + (i.actions.losses.pilotError * 3)
												}
												else if (key == "MiG-19P") 
												{
													wvalue = wvalue + (6000000 * i.actions.losses.pilotError);
													dvalue = dvalue + (i.actions.losses.pilotError * 3)
												}
												else if (key == "Su-33") 
												{
													wvalue = wvalue + (55000000 * i.actions.losses.pilotError);
													dvalue = dvalue + (i.actions.losses.pilotError * 3)
												}
												else if (key == "Su-27") 
												{
													wvalue = wvalue + (37000000 * i.actions.losses.pilotError);
													dvalue = dvalue + (i.actions.losses.pilotError * 3)
												}
												else if (key == "Su-25T") 
												{
													wvalue = wvalue + (11000000 * i.actions.losses.pilotError);
													dvalue = dvalue + (i.actions.losses.pilotError * 3)
												}
												else if (key == "Su-25") 
												{
													wvalue = wvalue + (11000000 * i.actions.losses.pilotError);
													dvalue = dvalue + (i.actions.losses.pilotError * 3)
												}
												else if ((key == "UH-1H") || (key == "Mi-8MT") ||  (key == "Ka-50") || (key == "SA342L") || (key == "SA342M") || (key == "SA342Minigun") ||  (key == "SA342Mistral") ||  (key == "Mi-24P"))
												{
													wvalue = wvalue + (8429956.57 * i.actions.losses.pilotError);
													dvalue = dvalue + (i.actions.losses.pilotError * 2)
												}
												else if ((key == "UH-1H LG") || (key == "UH-1H RG"))
												{
													wvalue = wvalue + (8429956.57 * i.actions.losses.pilotError);
													dvalue = dvalue + (i.actions.losses.pilotError * 1)
												}
												else
												{
													dvalue = dvalue + (i.actions.losses.pilotError * 3)
												}
											}
                                        //
                                        if (i.actions.losses.hasOwnProperty('pilotDeath'))
                                        {
                                          currentPilot.deaths = currentPilot.deaths + (i.actions.losses.pilotDeath)
										  LeaderBoardFunctions.everystat.deaths = LeaderBoardFunctions.everystat.deaths + (i.actions.losses.pilotDeath)
										  
										  wvalue = wvalue + (7500000 * i.actions.losses.pilotDeath);
										  if ((key == "UH-1H") || (key == "Mi-8MT") ||  (key == "Ka-50") || (key == "SA342L") || (key == "SA342M") || (key == "SA342Minigun") ||  (key == "SA342Mistral") ||  (key == "Mi-24P"))
										  {
											   dvalue = dvalue + (i.actions.losses.pilotDeath * 5 )  
										  }
										  else if ((key == "UH-1H LG") || (key == "UH-1H RG"))
										  {
											  dvalue = dvalue + (i.actions.losses.pilotDeath * 2)  
										  }
										  else if ((key == "A-10C")  ||  (key == "A-10C_2") || (key == "F-5E-3") || (key == "Su-25") || (key == "Su-25T") || (key == "AV8BNA"))
										  {
											  dvalue = dvalue + (i.actions.losses.pilotDeath * 7)
										  }
										  else if ((key == "F-14A-135-GR RIO") ||  (key == "F-14B RIO"))
										  {
											  dvalue = dvalue + (i.actions.losses.pilotDeath * 7)
										  }
										  else
										  {
											dvalue = dvalue + (i.actions.losses.pilotDeath * 7)  
										  }
                                        }
                                        if (i.actions.losses.hasOwnProperty('crash'))
                                        {
                                          currentPilot.crashes = currentPilot.crashes + (i.actions.losses.crash)
										  LeaderBoardFunctions.everystat.crashes = LeaderBoardFunctions.everystat.crashes + (i.actions.losses.crash)
										  if (key == "FA-18C_hornet") 
										  {
											  wvalue = wvalue + (37271473.27 * i.actions.losses.crash);
											  dvalue = dvalue + (i.actions.losses.crash * 3)
										  }
										  else if (key == "F-16C_50")
										  {
											  wvalue = wvalue + (31045881.45  * i.actions.losses.crash);
											  dvalue = dvalue + (i.actions.losses.crash * 3)
										  }
										  else if (key == "F-14B") 
										  {
											  wvalue = wvalue + (82091405.94 * i.actions.losses.crash);
											  dvalue = dvalue + (i.actions.losses.crash * 3)
										  }
										  else if (key == "F-14B RIO")
										  {
											  wvalue = wvalue + (80091405.94 * i.actions.losses.crash);
											  dvalue = dvalue + (i.actions.losses.crash * 3)
										  }
										  else if (key == "F-14A-135-GR") 
										  {
											  wvalue = wvalue + (80091405.94 * i.actions.losses.crash);
											  dvalue = dvalue + (i.actions.losses.crash * 3)
										  }
										  else if (key == "F-14A-135-GR RIO")
										  {
											  wvalue = wvalue + (80091405.94 * i.actions.losses.crash);
											  dvalue = dvalue + (i.actions.losses.crash * 3)
										  }
										  else if (key == "F-5E-3")
										  {
											  wvalue = wvalue + (4789719.19 * i.actions.losses.crash);
											  dvalue = dvalue + (i.actions.losses.crash * 2)
										  }
										  else if (key == "F-15C") 
										  {
											  wvalue = wvalue + (47528342.94 * i.actions.losses.crash);
											  dvalue = dvalue + (i.actions.losses.crash * 3)
										  }
										  else if (key == "M-2000C") 
										  {
											  wvalue = wvalue + (38238709.96 * i.actions.losses.crash);
											  dvalue = dvalue + (i.actions.losses.crash * 3)
										  }
										  else if (key == "AJS37") 
										  {
											  wvalue = wvalue + (15515029.94 * i.actions.losses.crash);
											  dvalue = dvalue + (i.actions.losses.crash * 3)
										  }
										  else if (key == "AV8BNA") 
										  {
											  wvalue = wvalue + (25000000 * i.actions.losses.crash);
											  dvalue = dvalue + (i.actions.losses.crash * 3)
										  }
										  else if (key == "A-10C") 
										  {
											  wvalue = wvalue + (46300000 * i.actions.losses.crash);
											  dvalue = dvalue + (i.actions.losses.crash * 3)
										  }
										  else if (key == "A-10C_2") 
										  {
											  wvalue = wvalue + (46900000 * i.actions.losses.crash);
											  dvalue = dvalue + (i.actions.losses.crash * 3)
										  }
										  else if (key == "J-11A") 
										  {
											  wvalue = wvalue + (32834169.71 * i.actions.losses.crash);
											  dvalue = dvalue + (i.actions.losses.crash * 3)
										  }
										  else if (key == "JF-17") 
										  {
											  wvalue = wvalue + (25000000 * i.actions.losses.crash);
											  dvalue = dvalue + (i.actions.losses.crash * 3)
										  }
										  else if (key == "MiG-29A") 
										  {
											  wvalue = wvalue + (23000000 * i.actions.losses.crash);
											  dvalue = dvalue + (i.actions.losses.crash * 3)
										  }
										  else if (key == "MiG-29S") 
										  {
											  wvalue = wvalue + (24468987.84 * i.actions.losses.crash);
											  dvalue = dvalue + (i.actions.losses.crash * 3)
										  }
										  else if (key == "MiG-21Bis") 
										  {
											  wvalue = wvalue + (10511196.75 * i.actions.losses.crash);
											  dvalue = dvalue + (i.actions.losses.crash * 3)
										  }
										  else if (key == "MiG-19P") 
										  {
											  wvalue = wvalue + (6000000 * i.actions.losses.crash);
											  dvalue = dvalue + (i.actions.losses.crash * 3)
										  }
										  else if (key == "Su-33") 
										  {
											  wvalue = wvalue + (55000000 * i.actions.losses.crash);
											  dvalue = dvalue + (i.actions.losses.crash * 3)
										  }
										  else if (key == "Su-27") 
										  {
											  wvalue = wvalue + (37000000 * i.actions.losses.crash);
											  dvalue = dvalue + (i.actions.losses.crash * 3)
										  }
										  else if (key == "Su-25T") 
										  {
											  wvalue = wvalue + (11000000 * i.actions.losses.crash);
											  dvalue = dvalue + (i.actions.losses.crash * 3)
										  }
										  else if (key == "Su-25") 
										  {
											  wvalue = wvalue + (11000000 * i.actions.losses.crash);
											  dvalue = dvalue + (i.actions.losses.crash * 3)
										  }
										  else if ((key == "UH-1H") || (key == "Mi-8MT") ||  (key == "Ka-50") || (key == "SA342L") || (key == "SA342M") || (key == "SA342Minigun") ||  (key == "SA342Mistral") ||  (key == "Mi-24P"))
										  {
											  wvalue = wvalue + (8429956.57 * i.actions.losses.crash);
											  dvalue = dvalue + (i.actions.losses.crash * 2)
										  }
										  else if ((key == "UH-1H LG") || (key == "UH-1H RG"))
										  {
											  wvalue = wvalue + (8429956.57 * i.actions.losses.crash);
											  dvalue = dvalue + (i.actions.losses.crash * 1)
										  }
										  else
										  {
											dvalue = dvalue + (i.actions.losses.crash * 3)
										  }
                                        }
                                        if (i.actions.losses.hasOwnProperty('eject'))
                                        {
										  LeaderBoardFunctions.everystat.ejects = LeaderBoardFunctions.everystat.ejects + (i.actions.losses.eject)
                                          if ((key == "UH-1H") || (key == "Mi-8MT") ||  (key == "Ka-50") || (key == "SA342L") || (key == "SA342M") || (key == "SA342Minigun") ||  (key == "SA342Mistral") ||  (key == "Mi-24P") || (key == "UH-1H LG") || (key == "UH-1H RG"))
										  {
											  currentPilot.ejects = currentPilot.ejects + (i.actions.losses.eject)
											  dvalue = dvalue + (i.actions.losses.eject * 2)
										  }
										  else
										  {
											  currentPilot.ejects = currentPilot.ejects + (i.actions.losses.eject)
											  dvalue = dvalue + (i.actions.losses.eject * 3)
										  }
                                        }
                                      }
                                    }
                                    // get flight time
                                    if (i.hasOwnProperty('inAir')) {
                                        currentPilot.flightHours = currentPilot.flightHours + i.inAir
                                        LeaderBoardFunctions.everystat.flightHours = LeaderBoardFunctions.everystat.flightHours + i.inAir
										
										currentPilot.flightHours_converted = converterFactory.timeConvert(currentPilot.flightHours)
										
										LeaderBoardFunctions.everystat.flightHours_converted = converterFactory.timeConvert(LeaderBoardFunctions.everystat.flightHours)
                                        // get fav aircraft
                                        if (i.inAir > currentPilot.favAircraft.flightHours) {
                                            currentPilot.favAircraft.flightHours = i.inAir
                                            currentPilot.favAircraft.flightHours_converted = currentPilot.flightHours_converted
                                            currentPilot.favAircraft.frameName = key
											if (currentPilot.favAircraft.frameName == "A-10C_2")
											{
												currentPilot.favAircraft.frameName = "A-10C"
											}
											if (currentPilot.favAircraft.frameName == "F-14A-135-GR")
											{
												currentPilot.favAircraft.frameName = "F-14"
											}
                                        }

                                    }
									var fh = ((currentPilot.flightHours /60) /60);
									//// console.log("FH is:")
									//console.log(fh);
									
									var tempdvalue = dvalue / fh;
									if (Number.isNaN(tempdvalue))
									{
										tempdvalue = 0;
									}
									console.log("Temp Death Value would be")
									console.log(tempdvalue)
									console.log("DValue Death Value would be")
									console.log(dvalue)
                                    // set pilots rank
                                    //currentPilot.ranking = currentPilot.kills - currentPilot.deaths;
									// if we are weighting with time based we use this:
									if (timeranked == true)
									{
										currentPilot.dpoints = tempdvalue.toFixed(0);
										currentPilot.ppoints = cvalue.toFixed(0);
										currentPilot.ranking = cvalue - tempdvalue;
									}
									else
									{
									//else we use this t
										currentPilot.ranking = cvalue - dvalue;
										currentPilot.dpoints = dvalue.toFixed(2);
										currentPilot.ppoints = cvalue.toFixed(2);
									}
                                })
									// we do a series of checks, if any of these are true we enter in below and set the 
									// ranking to be -1,000,000 which puts them at the bottom of the set. Ideally we'd find a way to just 
									// not include them but hey i'm lazy at the moment.
									if ((currentPilot.allStats == null) || (currentPilot.favAircraft.flightHours == 0) || (currentPilot.flightHours < (15*60) ) || (currentPilot.flightHours < 0) || (currentPilot.flightHours == null ) ||(currentPilot.flightHours_converted == "") || ((currentPilot.dpoints == 0) && (currentPilot.ppoints == 0) && (currentPilot.flightHours < (60*30)))){
										currentPilot.position = minpos
										currentPilot.ranking = -1000000
										minpos = minpos + 1
									}

									if (pilot.name.includes('Mez') || pilot.name.includes('mez') || pilot.name.includes('GOOSE')) {
                                        currentPilot.callSign = '🐱' + currentPilot.callSign + '🐱'
										
                                    }
									if (pilot.name.includes('OceanOver') || pilot.name.includes('OceanOver')) {
                                        currentPilot.callSign = '🦕' + currentPilot.callSign + '🦕'
                                    }
									if (pilot.name.includes('Sock') || pilot.name.includes('Sock')) {
                                        currentPilot.callSign = '🦕🦕' + currentPilot.callSign + '🦕🦕'
                                    }
                                    //if (pilot.name.includes('Sock')) {
                                    //    currentPilot.position = minpos
                                    //    currentPilot.ranking = -2500
                                    //    currentPilot.pvpLosses = 369
                                    //    currentPilot.aaKills = -69
                                    //    currentPilot.callSign = '🖕🖕🖕💩 Sock 💩🖕🖕🖕'
                                    //}
                                    if (pilot.name.includes('BooZer')) {
                                        currentPilot.callSign = currentPilot.callSign + '🍺'
                                    }
								LeaderBoardFunctions.everystat.wasted = LeaderBoardFunctions.everystat.wasted + wvalue;
								LeaderBoardFunctions.everystat.spent = LeaderBoardFunctions.everystat.spent + svalue;
								wvalue = wvalue / 1000000;
								svalue = svalue / 1000000;
								wpnvalue = wpnvalue / 1000000;
								currentPilot.wasted = wvalue.toFixed(2);
								currentPilot.spent = svalue.toFixed(2);
								currentPilot.wpncost = wpnvalue.toFixed(2);
								var ratio = (currentPilot.spent / currentPilot.wpncost) * 100;
								//// console.log("Ratio");
								//console.log(ratio);
								if ((ratio < 1 ) || Number.isNaN(ratio))
								{
									ratio = 0
								}
								currentPilot.wpneffect = ratio.toFixed(2);
								//console.log(currentPilot.wpneffect);
								function sortObject(obj) {
									var arr = [];
									var prop;
									for (prop in obj) {
										if (obj.hasOwnProperty(prop)) {
										arr.push({
											'key': prop,
											'value': obj[prop]
											});
										}
									}
									arr.sort(function(b, a) {
									return a.value - b.value;
									});
									return arr; // returns array
								}
								var arr = sortObject(weapons);
								currentPilot.favweapon = arr[0].key;
								
                                stats.push(currentPilot)
                                allPilot_q.resolve();

                        } else {
							if ((currentPilot.allStats == null) || (currentPilot.favAircraft.flightHours == 0) || (currentPilot.flightHours < (15*60) ) || (currentPilot.flightHours < 0) || (currentPilot.flightHours == null ) ||(currentPilot.flightHours_converted == "") || ((currentPilot.dpoints == 0) && (currentPilot.ppoints == 0) && (currentPilot.flightHours < (60*30)))){
										currentPilot.position = minpos
										currentPilot.ranking = -1000000
										minpos = minpos + 1
									}
//                            stats.push(currentPilot)
                            allPilot_q.resolve();
                        }

                    });

					LeaderBoardFunctions.everystat.wpncost = parseFloat(LeaderBoardFunctions.everystat.wpncost).toFixed(2);
					var weaponcosts = LeaderBoardFunctions.numberWithCommas(LeaderBoardFunctions.everystat.wpncost);
					LeaderBoardFunctions.everystat.wpncostformated = weaponcosts;
					// console.log("weapon Costs")
					console.log(weaponcosts)
					
					
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
							pilot.ranking = pilot.ranking.toFixed(0)
                        })
                        $q.all(sortPromise).then(function() {
                            cb(result)
                        })
					
					// console.log("Everystat")
					console.log(LeaderBoardFunctions.everystat)
                    })
            }
			// console.log("Everystat")
			console.log(LeaderBoardFunctions.everystat)

            return LeaderBoardFunctions;
      });

})();
