(function() {
      angular.module("redIberia").service("MarkerFunctions", function($websocket, $q, $http, $window, $location) {

            return {
                  getMarkerImage: function(i, e, cb) {
                        var side;
                        if (i == 1) {
                              side = 'red-'
                        } else if (i == 2) {
                              side = 'blue-'
                        } else {
                              side = 'unknown-'
                        }
                        switch (e) {

                              //Air Craft
                               case 'AJS37':
                                    var data = {
                                          src: 'url("../../img/' + side + 'jet.png")',
                                          size: '20px'
                                    }
                                    cb(data);
                                    break;
								case 'AV8BNA':
                                    var data = {
                                          src: 'url("../../img/' + side + 'av8.png")',
                                          size: '18px'
                                    }
                                    cb(data);
                                    break;
								case 'A-10A':
                                    var data = {
                                          src: 'url("../../img/' + side + 'A10.png")',
                                          size: '20px'
                                    }
                                    cb(data);
                                    break;
								case 'A-10C':
                                    var data = {
                                          src: 'url("../../img/' + side + 'A10.png")',
                                          size: '20px'
                                    }
                                    cb(data);
                                    break;
								case 'A-50':
                                    var data = {
                                          src: 'url("../../img/' + side + 'A50.png")',
                                          size: '27px'
                                    }
                                    cb(data);
                                    break;
								case 'An-26B':
                                    var data = {
                                          src: 'url("../../img/' + side + 'jet.png")',
                                          size: '27px'
                                    }
                                    cb(data);
                                    break;
								case 'An-30M':
                                    var data = {
                                          src: 'url("../../img/' + side + 'jet.png")',
                                          size: '27px'
                                    }
                                    cb(data);
                                    break;

								case 'B-1B':
                                    var data = {
                                          src: 'url("../../img/' + side + 'jet.png")',
                                          size: '22px'
                                    }
                                    cb(data);
                                    break;
								case 'B-52H':
                                    var data = {
                                          src: 'url("../../img/' + side + 'jet.png")',
                                          size: '27px'
                                    }
                                    cb(data);
                                    break;
								case 'Bf-109K-4':
                                    var data = {
                                          src: 'url("../../img/' + side + 'prop.png")',
                                          size: '17px'
                                    }
                                    cb(data);
                                    break;
								case 'C-101CC':
                                    var data = {
                                          src: 'url("../../img/' + side + 'jet.png")',
                                          size: '20px'
                                    }
                                    cb(data);
                                    break;
								case 'C-101EB':
                                    var data = {
                                          src: 'url("../../img/' + side + 'jet.png")',
                                          size: '20px'
                                    }
                                    cb(data);
                                    break;
								case 'C-130':
                                    var data = {
                                          src: 'url("../../img/awacs_blue.png")',
                                          size: '22px'
                                    }
                                    cb(data);
                                    break;
								case 'C-17A':
                                    var data = {
                                          src: 'url("../../img/awacs_blue.png")',
                                          size: '27px'
                                    }
                                    cb(data);
                                    break;
								case 'E-2C':
                                    var data = {
                                          src: 'url("../../img/awacs_blue.png")',
                                          size: '27px'
                                    }
                                    cb(data);
                                    break;
								case 'E-3A':
                                    var data = {
                                          src: 'url("../../img/awacs_blue.png")',
                                          size: '27px'
                                    }
                                    cb(data);
                                    break;
								case 'F-4E':
									var data = {
										  src: 'url("../../img/' + side + 'f4.png")',
										  size: '23px'
									}
									cb(data);
									break;
								case 'F-5E-3':
                                    var data = {
                                          src: 'url("../../img/' + side + 'f5.png")',
                                          size: '20px'
                                    }
                                    cb(data);
                                    break;
								case 'F-5E':
                                    var data = {
                                          src: 'url("../../img/' + side + 'f5.png")',
                                          size: '20px'
                                    }
                                    cb(data);
                                    break;
								case 'F-14A':
                                    var data = {
                                          src: 'url("../../img/' + side + 'f14.png")',
                                          size: '22px'
                                    }
                                    cb(data);
                                    break;
								case 'F-14B':
                                          var data = {
                                                src: 'url("../../img/' + side + 'f14.png")',
                                                size: '22px'
                                          }
                                          cb(data);
                                    break;
								case 'F-15C':
                                    var data = {
                                          src: 'url("../../img/' + side + 'f15.png")',
                                          size: '22px'
                                    }
                                    cb(data);
                                    break;
								case 'F-15E':
                                    var data = {
                                          src: 'url("../../img/' + side + 'f15.png")',
                                          size: '22px'
                                    }
                                    cb(data);
                                    break;
								case 'F-16A MLU':
                                    var data = {
                                          src: 'url("../../img/' + side + 'jet.png")',
                                          size: '20px'
                                    }
                                    cb(data);
                                    break;
								case 'F-16A':
                                    var data = {
                                          src: 'url("../../img/' + side + 'jet.png")',
                                          size: '20px'
                                    }
                                    cb(data);
                                    break;
								case 'F-16C bl.50':
                                    var data = {
                                          src: 'url("../../img/' + side + 'jet.png")',
                                          size: '20px'
                                    }
                                    cb(data);
                                    break;
								case 'F-16C_50':
                                    var data = {
                                          src: 'url("../../img/' + side + 'jet.png")',
                                          size: '20px'
                                    }
                                    cb(data);
                                    break;
								case 'F-16C bl.52d':
                                    var data = {
                                          src: 'url("../../img/' + side + 'jet.png")',
                                          size: '20px'
                                    }
                                    cb(data);
                                    break;
								case 'FA-18A':
                                    var data = {
                                          src: 'url("../../img/' + side + 'f18.png")',
                                          size: '22px'
                                    }
                                    cb(data);
                                    break;
								case 'FA-18C_hornet':
                                    var data = {
                                          src: 'url("../../img/' + side + 'f18.png")',
                                          size: '22px'
                                    }
                                    cb(data);
                                    break;
								case 'F-86F Saber':
                                    var data = {
                                          src: 'url("../../img/' + side + 'saber.png")',
                                          size: '17px'
                                    }
                                    cb(data);
                                    break;
                                case 'FW-190D9':
                                    var data = {
                                          src: 'url("../../img/' + side + 'prop.png")',
                                          size: '17px'
                                    }
                                    cb(data);
                                    break;
								case 'FW-190A8':
                                    var data = {
                                          src: 'url("../../img/' + side + 'prop.png")',
                                          size: '17px'
                                    }
                                    cb(data);
                                    break;
								case 'Hawk':
                                    var data = {
                                          src: 'url("../../img/' + side + 'jet.png")',
                                          size: '20px'
                                    }
                                    cb(data);
                                    break;
								case 'IL-76MD':
                                    var data = {
                                          src: 'url("../../img/' + side + 'jet.png")',
                                          size: '27px'
                                    }
                                    cb(data);
                                    break;
								case 'IL-78M':
                                    var data = {
                                          src: 'url("../../img/' + side + 'jet.png")',
                                          size: '27px'
                                    }
                                    cb(data);
                                    break;
								case 'JF-17':
                                    var data = {
                                          src: 'url("../../img/' + side + 'jf17.png")',
                                          size: '17px'
                                    }
                                    cb(data);
                                    break;
								case 'I-16':
                                    var data = {
                                          src: 'url("../../img/' + side + 'prop.png")',
                                          size: '17px'
                                    }
                                    cb(data);
                                    break;
								case 'KC135MPRS':
                                    var data = {
                                          src: 'url("../../img/' + side + 'kc135mprs.png")',
                                          size: '27px'
                                    }
                                    cb(data);
                                    break;
								case 'KC-135':
                                    var data = {
                                          src: 'url("../../img/' + side + 'kc135.png")',
                                          size: '27px'
                                    }
                                    cb(data);
                                    break;
								case 'KC-135':
                                    var data = {
                                          src: 'url("../../img/' + side + 'kc135.png")',
                                          size: '27px'
                                    }
                                    cb(data);
                                    break;
								case 'L-39C':
                                    var data = {
                                          src: 'url("../../img/' + side + 'jet.png")',
                                          size: '20px'
                                    }
                                    cb(data);
                                    break;
								case 'L-39ZA':
                                    var data = {
                                          src: 'url("../../img/' + side + 'jet.png")',
                                          size: '20px'
                                    }
                                    cb(data);
                                    break;
								case 'M-2000C':
                                    var data = {
                                          src: 'url("../../img/' + side + 'm2000.png")',
                                          size: '22px'
                                    }
                                    cb(data);
                                    break;
								case 'Mirage 2000-5':
                                    var data = {
                                          src: 'url("../../img/' + side + 'm2000.png")',
                                          size: '22px'
                                    }
                                    cb(data);
                                    break;
								case 'MiG-15bis':
                                    var data = {
                                          src: 'url("../../img/' + side + 'saber.png")',
                                          size: '17px'
                                    }
                                    cb(data);
                                    break;
								case 'MiG-19P':
                                    var data = {
                                          src: 'url("../../img/' + side + 'jet.png")',
                                          size: '17px'
                                    }
                                    cb(data);
                                    break;
								case 'MiG-21Bis':
                                    var data = {
                                          src: 'url("../../img/' + side + 'mig21.png")',
                                          size: '22px'
                                    }
                                    cb(data);
                                    break;
								case 'MiG-23MLD':
                                    var data = {
                                          src: 'url("../../img/' + side + 'jet.png")',
                                          size: '22px'
                                    }
                                    cb(data);
                                    break;
								case 'MiG-25PD':
                                    var data = {
                                          src: 'url("../../img/' + side + 'jet.png")',
                                          size: '22px'
                                    }
                                    cb(data);
                                    break;
								case 'MiG-25RBT':
                                    var data = {
                                          src: 'url("../../img/' + side + 'jet.png")',
                                          size: '22px'
                                    }
                                    cb(data);
                                    break;
								case 'MiG-27K':
                                    var data = {
                                          src: 'url("../../img/' + side + 'jet.png")',
                                          size: '22px'
                                    }
                                    cb(data);
                                    break;
								case 'MiG-29A':
                                    var data = {
                                          src: 'url("../../img/' + side + 'jet.png")',
                                          size: '24px'
                                    }
                                    cb(data);
                                    break;
								case 'MiG-29G':
                                    var data = {
                                          src: 'url("../../img/' + side + 'jet.png")',
                                          size: '24px'
                                    }
                                    cb(data);
                                    break;
								case 'MiG-29S':
                                    var data = {
                                          src: 'url("../../img/' + side + 'jet.png")',
                                          size: '24px'
                                    }
                                    cb(data);
                                    break;
								case 'MiG-31':
                                    var data = {
                                          src: 'url("../../img/' + side + 'jet.png")',
                                          size: '24px'
                                    }
                                    cb(data);
                                    break;
								case 'RQ-1A Predator':
                                    var data = {
                                          src: 'url("../../img/' + side + 'prop.png")',
                                          size: '20px'
                                    }
                                    cb(data);
                                    break;
								case 'P-51D':
                                    var data = {
                                          src: 'url("../../img/' + side + 'prop.png")',
                                          size: '17px'
                                    }
                                    cb(data);
                                    break;
								case 'P-51D-30-NA':
                                    var data = {
                                          src: 'url("../../img/' + side + 'prop.png")',
                                          size: '17px'
                                    }
                                    cb(data);
                                    break;
								case 'S-3B':
                                    var data = {
                                          src: 'url("../../img/' + side + 'jet.png")',
                                          size: '20px'
                                    }
                                    cb(data);
                                    break;
								case 'S-3B Tanker':
                                    var data = {
                                          src: 'url("../../img/awacs_blue.png")',
                                          size: '27px'
                                    }
                                    cb(data);
                                    break;
								case 'SpitfireLFMkIX':
                                    var data = {
                                          src: 'url("../../img/' + side + 'prop.png")',
                                          size: '17px'
                                    }
                                    cb(data);
                                    break;
								case 'SpitfireLFMkIXCW':
                                    var data = {
                                          src: 'url("../../img/' + side + 'prop.png")',
                                          size: '17px'
                                    }
                                    cb(data);
                                    break;
								case 'Su-17M4':
                                    var data = {
                                          src: 'url("../../img/' + side + 'jet.png")',
                                          size: '20px'
                                    }
                                    cb(data);
                                    break;
								case 'Su-24M':
                                    var data = {
                                          src: 'url("../../img/' + side + 'jet.png")',
                                          size: '20px'
                                    }
                                    cb(data);
                                    break;
								case 'Su-24MR':
                                    var data = {
                                          src: 'url("../../img/' + side + 'jet.png")',
                                          size: '20px'
                                    }
                                    cb(data);
                                    break;
								case 'Su-25':
                                    var data = {
                                          src: 'url("../../img/' + side + 'jet.png")',
                                          size: '20px'
                                    }
                                    cb(data);
                                    break;
								case 'Su-25T':
                                    var data = {
                                          src: 'url("../../img/' + side + 'jet.png")',
                                          size: '20px'
                                    }
                                    cb(data);
                                    break;
								case 'Su-25TM':
                                    var data = {
                                          src: 'url("../../img/' + side + 'jet.png")',
                                          size: '20px'
                                    }
                                    cb(data);
                                    break;
								case 'Su-27':
                                    var data = {
                                          src: 'url("../../img/' + side + 'su27.png")',
                                          size: '22px'
                                    }
                                    cb(data);
                                    break;
								case 'Su-30':
                                    var data = {
                                          src: 'url("../../img/' + side + 'su27.png")',
                                          size: '22px'
                                    }
                                    cb(data);
                                    break;
								case 'Su-33':
                                    var data = {
                                          src: 'url("../../img/' + side + 'su27.png")',
                                          size: '22px'
                                    }
                                    cb(data);
                                    break;
								case 'Su-34':
                                    var data = {
                                          src: 'url("../../img/' + side + 'su27.png")',
                                          size: '22px'
                                    }
                                    cb(data);
                                    break;
								case 'TF-51D':
                                    var data = {
                                          src: 'url("../../img/' + side + 'prop.png")',
                                          size: '27px'
                                    }
                                    cb(data);
                                    break;
								case 'Tornado GR4':
                                    var data = {
                                          src: 'url("../../img/' + side + 'jet.png")',
                                          size: '27px'
                                    }
                                    cb(data);
                                    break;
								case 'Tornado IDS':
                                    var data = {
                                          src: 'url("../../img/' + side + 'jet.png")',
                                          size: '27px'
                                    }
                                    cb(data);
                                    break;
								case 'Tu-22M3':
                                    var data = {
                                          src: 'url("../../img/' + side + 'jet.png")',
                                          size: '27px'
                                    }
                                    cb(data);
                                    break;
								case 'Tu-95MS':
                                    var data = {
                                          src: 'url("../../img/' + side + 'e3.png")',
                                          size: '27px'
                                    }
                                    cb(data);
                                    break;
								case 'Tu-142':
                                    var data = {
                                          src: 'url("../../img/' + side + 'jet.png")',
                                          size: '27px'
                                    }
                                    cb(data);
                                    break;
								case 'Tu-160':
                                    var data = {
                                          src: 'url("../../img/' + side + 'jet.png")',
                                          size: '27px'
                                    }
                                    cb(data);
                                    break;
								case 'Yak-40':
                                    var data = {
                                          src: 'url("../../img/' + side + 'prop.png")',
                                          size: '27px'
                                    }
                                    cb(data);
                                    break;
								case 'Yak-52':
                                    var data = {
                                          src: 'url("../../img/' + side + 'prop.png")',
                                          size: '27px'
                                    }
                                    cb(data);
                                    break;
								// Rotary
								case 'AH-1W':
                                    var data = {
                                          src: 'url("../../img/' + side + 'heli.png")',
                                          size: '27px'
                                    }
                                    cb(data);
                                    break;
								case 'AH-64A':
                                    var data = {
                                          src: 'url("../../img/' + side + 'heli.png")',
                                          size: '27px'
                                    }
                                    cb(data);
                                    break;
								case 'AH-64D':
                                    var data = {
                                          src: 'url("../../img/' + side + 'heli.png")',
                                          size: '27px'
                                    }
                                    cb(data);
                                    break;
								case 'CH-47D':
                                    var data = {
                                          src: 'url("../../img/' + side + 'heli.png")',
                                          size: '27px'
                                    }
                                    cb(data);
                                    break;
								case 'CH-53E':
                                    var data = {
                                          src: 'url("../../img/' + side + 'heli.png")',
                                          size: '27px'
                                    }
                                    cb(data);
                                    break;
								case 'Ka-27':
                                    var data = {
                                          src: 'url("../../img/' + side + 'heli.png")',
                                          size: '27px'
                                    }
                                    cb(data);
                                    break;
								case 'Ka-50':
                                    var data = {
                                          src: 'url("../../img/' + side + 'heli.png")',
                                          size: '27px'
                                    }
                                    cb(data);
                                    break;
								case 'Mi-8MT':
                                    var data = {
                                          src: 'url("../../img/' + side + 'heli.png")',
                                          size: '27px'
                                    }
                                    cb(data);
                                    break;
								case 'Mi-24':
                                    var data = {
                                          src: 'url("../../img/' + side + 'heli.png")',
                                          size: '27px'
                                    }
                                    cb(data);
                                    break;
								case 'Mi-26':
                                    var data = {
                                          src: 'url("../../img/' + side + 'heli.png")',
                                          size: '27px'
                                    }
                                    cb(data);
                                    break;
								case 'Mi-28N':
                                    var data = {
                                          src: 'url("../../img/' + side + 'heli.png")',
                                          size: '27px'
                                    }
                                    cb(data);
                                    break;
								case 'OH-58D':
                                    var data = {
                                          src: 'url("../../img/' + side + 'heli.png")',
                                          size: '27px'
                                    }
                                    cb(data);
                                    break;
								case 'SA342M':
                                    var data = {
                                          src: 'url("../../img/' + side + 'heli.png")',
                                          size: '27px'
                                    }
                                    cb(data);
                                    break;
								case 'SA342L':
                                    var data = {
                                          src: 'url("../../img/' + side + 'heli.png")',
                                          size: '27px'
                                    }
                                    cb(data);
                                    break;
								case 'SA342Minigun':
                                    var data = {
                                          src: 'url("../../img/' + side + 'heli.png")',
                                          size: '27px'
                                    }
                                    cb(data);
                                    break;
								case 'SA342Mistral':
                                    var data = {
                                          src: 'url("../../img/' + side + 'heli.png")',
                                          size: '27px'
                                    }
                                    cb(data);
                                    break;
								case 'SH-60B':
                                    var data = {
                                          src: 'url("../../img/' + side + 'heli.png")',
                                          size: '27px'
                                    }
                                    cb(data);
                                    break;
								case 'UH-1H':
                                    var data = {
                                          src: 'url("../../img/' + side + 'heli.png")',
                                          size: '27px'
                                    }
                                    cb(data);
                                    break;
								case 'UH-60A':
                                    var data = {
                                          src: 'url("../../img/' + side + 'heli.png")',
                                          size: '27px'
                                    }
                                    cb(data);
                                    break;
                                    // naval
								case 'Stennis':
                                    var data = {
                                          src: 'url("../../img/carrier.png")',
                                          size: '27px'
                                    }
                                    cb(data);
                                    break;
								case 'CVN_71':
                                    var data = {
                                          src: 'url("../../img/carrier.png")',
                                          size: '30px'
                                    }
                                    cb(data);
                                    break;
								case 'CVN_72':
                                    var data = {
                                          src: 'url("../../img/carrier.png")',
                                          size: '30px'
                                    }
                                    cb(data);
                                    break;
								case 'CVN_73':
                                    var data = {
                                          src: 'url("../../img/carrier.png")',
                                          size: '30px'
                                    }
                                    cb(data);
                                    break;
								case 'CV_1143_5':
                                    var data = {
                                          src: 'url("../../img/carrier.png")',
                                          size: '30px'
                                    }
                                    cb(data);
                                    break;
								case 'USS_Arleigh_Burke_IIa':
                                    var data = {
                                          src: '',
                                          size: '24px'
                                    }
                                    cb(data);
                                    break;


							    case 'Higgins_Boat':
                                    var data = {
                                          src: '',
                                          size: '15px'
                                    }
                                    cb(data);
                                    break;
								case 'LHA_Tarawa':
                                    var data = {
                                          src: 'url("../../img/carrier.png")',
                                          size: '20px'
                                    }
                                    cb(data);
                                    break;
								case 'LST_Mk2':
                                    var data = {
                                          src: '',
                                          size: '15px'
                                    }
                                    cb(data);
                                    break;
								case 'PERRY':
                                    var data = {
                                          src: '',
                                          size: '20px'
                                    }
                                    cb(data);
                                    break;
								case 'speedboat':
                                    var data = {
                                          src: '',
                                          size: '10px'
                                    }
                                    cb(data);
                                    break;
								case 'TICONDEROG':
                                    var data = {
                                          src: '',
                                          size: '23px'
                                    }
                                    cb(data);
                                    break;
								case 'USS_Samuel_Chase':
                                    var data = {
                                          src: '',
                                          size: '25px'
                                    }
                                    cb(data);
                                    break;
								case 'VINSON':
                                    var data = {
                                          src: '',
                                          size: '27px'
                                    }
                                    cb(data);
                                    break;
								case 'ALBATROS':
                                    var data = {
                                          src: '',
                                          size: '25px'
                                    }
                                    cb(data);
                                    break;
								case 'Dry-cargo ship-1':
                                    var data = {
                                          src: '',
                                          size: '25px'
                                    }
                                    cb(data);
                                    break;
								case 'Dry-cargo ship-2':
                                    var data = {
                                          src: '',
                                          size: '25px'
                                    }
                                    cb(data);
                                    break;
								case 'ELNYA':
                                    var data = {
                                          src: '',
                                          size: '22px'
                                    }
                                    cb(data);
                                    break;
								case 'MOSCOW':
                                    var data = {
                                          src: '',
                                          size: '22px'
                                    }
                                    cb(data);
                                    break;
								case 'KILO':
                                    var data = {
                                          src: '',
                                          size: '20px'
                                    }
                                    cb(data);
                                    break;
								case 'KUZNECOW':
                                    var data = {
                                          src: 'url("../../img/' + side + 'navy.png")',
                                          size: '27px'
                                    }
                                    cb(data);
                                    break;
								case 'NEUSTRASH':
                                    var data = {
                                          src: 'url("../../img/' + side + 'snavyw.png")',
                                          size: '20px'
                                    }
                                    cb(data);
                                    break;
								case 'MOLNIYA':
                                    var data = {
                                          src: 'url("../../img/' + side + 'snavyw.png")',
                                          size: '20px'
                                    }
                                    cb(data);
                                    break;
								case 'PIOTR':
                                    var data = {
                                          src: 'url("../../img/' + side + 'snavyw.png")',
                                          size: '20px'
                                    }
                                    cb(data);
                                    break;
								case 'REZKY':
                                    var data = {
                                          src: 'url("../../img/' + side + 'snavyw.png")',
                                          size: '20px'
                                    }
                                    cb(data);
                                    break;
								case 'SOM':
                                    var data = {
                                          src: 'url("../../img/' + side + 'snavyw.png")',
                                          size: '20px'
                                    }
                                    cb(data);
                                    break;
								case 'ZWEZDNY':
                                    var data = {
                                          src: 'url("../../img/' + side + 'snavyw.png")',
                                          size: '20px'
                                    }
                                    cb(data);
                                    break;
                                    // ground
                              default:
                                    var data = {
                                          src: 'url("../../img/unknown.png")',
                                          size: '3px'
                                    }
                                    cb(data);
                                    break;
                        }

                  }
            };
      });

})();
