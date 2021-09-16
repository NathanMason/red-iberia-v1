
          (function() {
                angular.module("redIberia").factory("LanguageFactory", function() {

                var Data = {};

                Data.getUnitTitle = function(o) {

                    switch (o) {

                            case 'sam':
                                return 'SEAD Mission';
                            break;
                            case 'scud':
                                return 'Battlefrield Air Interdiction';
                            break;
                            case 'struc':
                                return 'Strategic Strike';
                            break;
                            case 'ew':
                                return 'Radar Contact';
                            break;
                    }

                }

                Data.getUnitDescription = function(o) {

                    switch (o) {
                            case 'sam':
                                return 'Reports of enemy SAM system within this vicinity. ';
                            break;

                            case 'scud':
                                return 'Recon Reports of an Iranian forces detected within this vicinity';
                            break;
                            case 'struc':
                                return 'Strategic strike to assist in disabling the Iranian IADs system';
                            break;
                            case 'ew':
                                return 'Unknown enemy air contact reported by AWACS';
                            break;
                    }

                }

                return Data;

        });

})();
