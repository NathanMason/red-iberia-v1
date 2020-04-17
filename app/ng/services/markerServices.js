(function() {
      angular.module("redIberia").factory("MarkerFunctions", function($websocket, $q, $http, $window, $location) {

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

                              //jets
                              case 'F-16C_50':
                                    var data = {
                                          src: 'url("../../img/' + side + 'jet.png")',
                                          size: '30px'
                                    }
                                    cb(data);
                                    break;
                              case 'FA-18C_hornet':
                                    var data = {
                                          src: 'url("../../img/' + side + 'f18.png")',
                                          size: '27px'
                                    }
                                    cb(data);
                                    break;
                              case 'A-10A':
                                    var data = {
                                          src: 'url("../../img/' + side + 'A10.png")',
                                          size: '27px'
                                    }
                                    cb(data);
                                    break;
                              case 'AJS37':
                                    var data = {
                                          src: 'url("../../img/' + side + 'jet.png")',
                                          size: '27px'
                                    }
                                    cb(data);
                                    break;
                              case 'AV8BNA':
                                    var data = {
                                          src: 'url("../../img/' + side + 'av8.png")',
                                          size: '27px'
                                    }
                                    cb(data);
                                    break;
                              case 'A-50':
                                    var data = {
                                          src: 'url("../../img/' + side + 'jet.png")',
                                          size: '27px'
                                    }
                                    cb(data);
                                    break;
                              case 'A-10C':
                                    var data = {
                                          src: 'url("../../img/' + side + 'A10.png")',
                                          size: '27px'
                                    }
                                    cb(data);
                                    break;
                              case 'F-14A':
                                    var data = {
                                          src: 'url("../../img/' + side + 'f14.png")',
                                          size: '27px'
                                    }
                                    cb(data);
                                    break;
                              case 'F-15E':
                                    var data = {
                                          src: 'url("../../img/' + side + 'jet.png")',
                                          size: '27px'
                                    }
                                    cb(data);
                                    break;
                              case 'An-26B':
                                    var data = {
                                          src: 'url("../../img/' + side + 'A10.png")',
                                          size: '27px'
                                    }
                                    cb(data);
                                    break;
                              case 'An-30M':
                                    var data = {
                                          src: 'url("../../img/' + side + 'A10.png")',
                                          size: '27px'
                                    }
                                    cb(data);
                                    break;
                              case 'B-1B':
                                    var data = {
                                          src: 'url("../../img/' + side + 'A10.png")',
                                          size: '27px'
                                    }
                                    cb(data);
                                    break;
                              case 'B-52H':
                                    var data = {
                                          src: 'url("../../img/' + side + 'A10.png")',
                                          size: '27px'
                                    }
                                    cb(data);
                                    break;
                              case 'Bf-109K-4':
                                    var data = {
                                          src: 'url("../../img/' + side + 'A10.png")',
                                          size: '27px'
                                    }
                                    cb(data);
                                    break;
                              case 'C-101CC':
                                    var data = {
                                          src: 'url("../../img/' + side + 'A10.png")',
                                          size: '27px'
                                    }
                                    cb(data);
                                    break;
                              case 'E-3A':
                                    var data = {
                                          src: 'url("../../img/' + side + 'e3.png")',
                                          size: '27px'
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
                                    // naval
                              case 'Stennis':
                                    var data = {
                                          src: 'url("../../img/blue-navy.png")',
                                          size: '27px'
                                    }
                                    cb(data);
                                    break;
                              case 'Dry-cargo ship-1':
                                    var data = {
                                          src: 'url("../../img/red-snavy.png")',
                                          size: '27px'
                                    }
                                    cb(data);
                                    break;
                              case 'MOSCOW':
                                    var data = {
                                          src: 'url("../../img/red-snavy.png")',
                                          size: '27px'
                                    }
                                    cb(data);
                                    break;
                              case 'ELNYA':
                                    var data = {
                                          src: 'url("../../img/red-snavy.png")',
                                          size: '27px'
                                    }
                                    cb(data);
                                    break;
                              case 'ALBATROS':
                                    var data = {
                                          src: 'url("../../img/red-snavy.png")',
                                          size: '27px'
                                    }
                                    cb(data);
                                    break;
                              case 'KILO':
                                    var data = {
                                          src: 'url("../../img/red-snavy.png")',
                                          size: '27px'
                                    }
                                    cb(data);
                                    break;
                              case 'KUZNECOW':
                                    var data = {
                                          src: 'url("../../img/red-snavy.png")',
                                          size: '27px'
                                    }
                                    cb(data);
                                    break;
                              case 'NEUSTRASH':
                                    var data = {
                                          src: 'url("../../img/red-snavy.png")',
                                          size: '27px'
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
