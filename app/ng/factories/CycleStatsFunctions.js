(function() {
      angular.module("redIberia").factory("CycleStatsFunctions", function($rootScope, $q, converterFactory, $filter) {

            var CyclesStatsFunctions = {};
			var minpos = 999;

            CyclesStatsFunctions.sortPilotStats = function(obj, cb) {
                    // create the pilot object
                    var stats = [];
                    var allPilotpromises = [];
                    // calculate leaderboard positions

                    var keyChecker = function(key){
                        if (!key) {key = 0} else {key = key}
                        return key
                    }
					var allstats = {
						totaltime: 0,
						totalpilots: 0,
						totaldeaths: 0,
						totalcrashes: 0,
						totalejects: 0,
						totalpilotError: 0,
						totalkills:0,
						totalbuildings:0,
						totalaakills:0,
						totalhelikills:0,
						totalshipkills:0,
						totalpvpkills:0,
						totalpvplosses:0,
						totalwasted:0,
						totalspent:0,
						totalwpncost:0,
						totalwpneffect:0,
						
						
						
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
										console.log(pilot.name);
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
											weapons.JSOW_A = weapons.JSOW_A + shot;
											
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
											weapons.AIM54 = weapons.AIM54 + shot;
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
											weapons.AIM54 = weapons.AIM54 + shot;
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
											weapons.AIM54 = weapons.AIM54 + shot;
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
											if (i.kills.hasOwnProperty('Buildings'))
											{
												currentPilot.kills = currentPilot.kills + ( i.kills["Buildings"].total)
												cvalue = cvalue + i.kills["Buildings"].total
												currentPilot.buildings = currentPilot.buildings + i.kills["Buildings"].total
											}
                                            // get AA kills
                                            if (i.kills.Planes) {

                                                // add to pilots total kills
                                                currentPilot.kills = currentPilot.kills + i.kills.Planes.total;
												cvalue = cvalue + (i.kills.Planes.total * 5);
                                                // add to pilots AA kills
                                                currentPilot.aaKills = currentPilot.aaKills + i.kills.Planes.total;

                                            }
                                            // get AG kills
                                            if (i.kills["Ground Units"]) {

                                                // add to pilots total kills
                                                currentPilot.kills = currentPilot.kills + ( i.kills["Ground Units"].total)
												cvalue = cvalue + i.kills["Ground Units"].total;
                                                // add to pilots AG kills
                                                currentPilot.agKills = currentPilot.agKills + i.kills["Ground Units"].total

                                            }
											 if (i.kills["Ships"]) {

                                                // add to pilots total kills
                                                currentPilot.kills = currentPilot.kills + ( i.kills["Ships"].total)
												cvalue = cvalue + (i.kills["Ships"].total * 10);
                                                // add to pilots AG kills
                                                currentPilot.shipKills = currentPilot.shipKills + i.kills["Ships"].total

                                            }
											if (i.kills.Helicopters) {
												currentPilot.kills = (currentPilot.kills + i.kills.Helicopters.total)
												cvalue = cvalue + i.kills.Helicopters.total * 2;

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
										if (i.actions.losses.hasOwnProperty('crashLanding'))
										{
											currentPilot.crashLanding = currentPilot.crashLanding + 1
										}
										if (i.actions.losses.hasOwnProperty('pilotError'))
										{
											currentPilot.pilotError = currentPilot.pilotError + 1
										}
                                        //
                                        if (i.actions.losses.hasOwnProperty('pilotDeath'))
                                        {
                                          currentPilot.deaths = currentPilot.deaths + (i.actions.losses.pilotDeath)
										  wvalue = wvalue + (7500000 * i.actions.losses.pilotDeath);
										  if (key == "UH-1H") 
										  {
											  dvalue = dvalue + (i.actions.losses.pilotDeath * 10 )  
										  }
										  else if (key == "Mi-8MT")
										  {
											  dvalue = dvalue + (i.actions.losses.pilotDeath * 10 )  
										  }
										  else if (key == "Ka-50")
										  {
											   dvalue = dvalue + (i.actions.losses.pilotDeath * 10 )  
										  }
										  else if (key == "SA342L")
										  {
											   dvalue = dvalue + (i.actions.losses.pilotDeath * 10 )  
										  }
										  else if (key == "SA342M")
										  {
											   dvalue = dvalue + (i.actions.losses.pilotDeath * 10 )  
										  }
										  else if (key == "SA342Minigun")
										  {
											   dvalue = dvalue + (i.actions.losses.pilotDeath * 10 )  
										  }
										  else if (key == "SA342Mistral")
										  {
											   dvalue = dvalue + (i.actions.losses.pilotDeath * 10 )  
										  }
										  else if (key == "Mi-24P")
										  {
											   dvalue = dvalue + (i.actions.losses.pilotDeath * 10 )  
										  }
										  else if ((key == "UH-1H LG") || (key == "UH-1H RG"))
										  {
											  dvalue = dvalue + (i.actions.losses.pilotDeath * 5 )  
										  }
										  else if ((key == "A-10C")  ||  (key == "A-10C_2") || (key == "F-5E-3") || (key == "Su-25") || (key == "Su-25T") || (key == "AV8BNA"))
										  {
											  dvalue = dvalue + (i.actions.losses.pilotDeath * 35)
										  }
										  else if (key == "F-14A-135-GR RIO")
										  {
											  dvalue = dvalue + (i.actions.losses.crash * 35)
										  }
										  else if (key == "F-14B RIO")
										  {
											  dvalue = dvalue + (i.actions.losses.crash * 35)
										  }
										  else
										  {
											dvalue = dvalue + (i.actions.losses.pilotDeath * 50 )  
										  }
                                        }
                                        if (i.actions.losses.hasOwnProperty('crash'))
                                        {
                                          currentPilot.crashes = currentPilot.crashes + (i.actions.losses.crash)
										  if (key == "FA-18C_hornet") 
										  {
											  wvalue = wvalue + (37271473.27 * i.actions.losses.crash);
											  dvalue = dvalue + (i.actions.losses.crash * 20)
										  }
										  else if (key == "F-16C_50")
										  {
											  wvalue = wvalue + (31045881.45  * i.actions.losses.crash);
											  dvalue = dvalue + (i.actions.losses.crash * 20)
										  }
										  else if (key == "F-14B") 
										  {
											  wvalue = wvalue + (82091405.94 * i.actions.losses.crash);
											  dvalue = dvalue + (i.actions.losses.crash * 20)
										  }
										  else if (key == "F-14B RIO")
										  {
											  wvalue = wvalue + (80091405.94 * i.actions.losses.crash);
											  dvalue = dvalue + (i.actions.losses.crash * 15)
										  }
										  else if (key == "F-14A-135-GR") 
										  {
											  wvalue = wvalue + (80091405.94 * i.actions.losses.crash);
											  dvalue = dvalue + (i.actions.losses.crash * 20)
										  }
										  else if (key == "F-14A-135-GR RIO")
										  {
											  wvalue = wvalue + (80091405.94 * i.actions.losses.crash);
											  dvalue = dvalue + (i.actions.losses.crash * 15)
										  }
										  else if (key == "F-5E-3")
										  {
											  wvalue = wvalue + (4789719.19 * i.actions.losses.crash);
											  dvalue = dvalue + (i.actions.losses.crash * 20)
										  }
										  else if (key == "F-15C") 
										  {
											  wvalue = wvalue + (47528342.94 * i.actions.losses.crash);
											  dvalue = dvalue + (i.actions.losses.crash * 20)
										  }
										  else if (key == "M-2000C") 
										  {
											  wvalue = wvalue + (38238709.96 * i.actions.losses.crash);
											  dvalue = dvalue + (i.actions.losses.crash * 20)
										  }
										  else if (key == "AJS37") 
										  {
											  wvalue = wvalue + (15515029.94 * i.actions.losses.crash);
											  dvalue = dvalue + (i.actions.losses.crash * 20)
										  }
										  else if (key == "AV8BNA") 
										  {
											  wvalue = wvalue + (25000000 * i.actions.losses.crash);
											  dvalue = dvalue + (i.actions.losses.crash * 15)
										  }
										  else if (key == "A-10C") 
										  {
											  wvalue = wvalue + (46300000 * i.actions.losses.crash);
											  dvalue = dvalue + (i.actions.losses.crash * 15)
										  }
										  else if (key == "A-10C_2") 
										  {
											  wvalue = wvalue + (46900000 * i.actions.losses.crash);
											  dvalue = dvalue + (i.actions.losses.crash * 15)
										  }
										  else if (key == "J-11A") 
										  {
											  wvalue = wvalue + (32834169.71 * i.actions.losses.crash);
											  dvalue = dvalue + (i.actions.losses.crash * 20)
										  }
										  else if (key == "JF-17") 
										  {
											  wvalue = wvalue + (25000000 * i.actions.losses.crash);
											  dvalue = dvalue + (i.actions.losses.crash * 20)
										  }
										  else if (key == "MiG-29A") 
										  {
											  wvalue = wvalue + (23000000 * i.actions.losses.crash);
											  dvalue = dvalue + (i.actions.losses.crash * 20)
										  }
										  else if (key == "MiG-29S") 
										  {
											  wvalue = wvalue + (24468987.84 * i.actions.losses.crash);
											  dvalue = dvalue + (i.actions.losses.crash * 20)
										  }
										  else if (key == "MiG-21Bis") 
										  {
											  wvalue = wvalue + (10511196.75 * i.actions.losses.crash);
											  dvalue = dvalue + (i.actions.losses.crash * 20)
										  }
										  else if (key == "MiG-19P") 
										  {
											  wvalue = wvalue + (6000000 * i.actions.losses.crash);
											  dvalue = dvalue + (i.actions.losses.crash * 20)
										  }
										  else if (key == "Su-33") 
										  {
											  wvalue = wvalue + (55000000 * i.actions.losses.crash);
											  dvalue = dvalue + (i.actions.losses.crash * 20)
										  }
										  else if (key == "Su-27") 
										  {
											  wvalue = wvalue + (37000000 * i.actions.losses.crash);
											  dvalue = dvalue + (i.actions.losses.crash * 20)
										  }
										  else if (key == "Su-25T") 
										  {
											  wvalue = wvalue + (11000000 * i.actions.losses.crash);
											  dvalue = dvalue + (i.actions.losses.crash * 15)
										  }
										  else if (key == "Su-25") 
										  {
											  wvalue = wvalue + (11000000 * i.actions.losses.crash);
											  dvalue = dvalue + (i.actions.losses.crash * 15)
										  }
										  else if (key == "Ka-50") 
										  {
											  wvalue = wvalue + (8429956.57 * i.actions.losses.crash);
											  dvalue = dvalue + (i.actions.losses.crash * 10)
										  }
										  else if (key == "UH1-H") 
										  {
											  wvalue = wvalue + (4700000 * i.actions.losses.crash);
											  dvalue = dvalue + (i.actions.losses.crash * 10)
										  }
										  else if (key == "Mi-8MT") 
										  {
											  wvalue = wvalue + (5000000 * i.actions.losses.crash);
											  dvalue = dvalue + (i.actions.losses.crash * 10)
										  }
										  else if (key == "SA342L") 
										  {
											  wvalue = wvalue + (1158368.21 * i.actions.losses.crash);
											  dvalue = dvalue + (i.actions.losses.crash * 10)
										  }
										  else if (key == "SA342M") 
										  {
											  wvalue = wvalue + (1258368.21 * i.actions.losses.crash);
											  dvalue = dvalue + (i.actions.losses.crash * 10)
										  }
										  else if (key == "SA342Minigun") 
										  {
											  wvalue = wvalue + (1358368.21 * i.actions.losses.crash);
											  dvalue = dvalue + (i.actions.losses.crash * 10)
										  }
										  else if (key == "SA342Mistral") 
										  {
											  wvalue = wvalue + (1288368.21 * i.actions.losses.crash);
											  dvalue = dvalue + (i.actions.losses.crash * 10)
										  }
										  else if (key == "Mi-24P") 
										  {
											  wvalue = wvalue + (12000000 * i.actions.losses.crash);
											  dvalue = dvalue + (i.actions.losses.crash * 10)
										  }
										  else
										  {
											dvalue = dvalue + (i.actions.losses.crash * 25)
										  }
                                        }
                                        if (i.actions.losses.hasOwnProperty('eject'))
                                        {
                                          currentPilot.ejects = currentPilot.ejects + (i.actions.losses.eject)
										  dvalue = dvalue + (i.actions.losses.eject * 10)
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
								var ratio = (currentPilot.spent / currentPilot.wpncost) * 100;
								currentPilot.wpneffect = ratio.toFixed(2);
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
							if ((currentPilot.allStats == null) || (currentPilot.favAircraft.flightHours == 0) || (currentPilot.flightHours < 60 ) || (currentPilot.flightHours < 0) || (currentPilot.flightHours == null ) ||(currentPilot.flightHours_converted == "")){
										currentPilot.wpneffect = 0
										currentPilot.position = minpos
										currentPilot.ranking = -250000
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


            return CyclesStatsFunctions;
      });

})();
