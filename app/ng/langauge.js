
          (function() {
                angular.module("redIberia").factory("LanguageFactory", function() {

                var Data = {};

                Data.getUnitTitle = function(o) {

                    switch (o) {

                            case 'sam':
                                return 'SEAD';
                            break;

                            case 'scud':
                                return 'Scud Hunting';
                            break;
                            case 'struc':
                                return 'Strike';
                            break;
                            case 'ew':
                                return 'Radar Contact';
                            break;
                    }

                }

                Data.getUnitDescription = function(o) {

                    switch (o) {
                            case 'sam':
                                return 'SEAD';
                            break;

                            case 'scud':
                                return 'Recon Reports of an Iranian SCUD platform detected within this vicinity';
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
