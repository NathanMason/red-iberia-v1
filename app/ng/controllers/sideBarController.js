(function() {

      angular.module('redIberia')

            .controller('sideBarController', ['$scope', '$rootScope', '$timeout', 'UnitMarkerFactory', 'markerFilters',
                  function($scope, $rootScope, $timeout, UnitMarkerFactory, markerFilters) {

                        $scope.toggleFilter = function(i){
                            console.log('toggle');
                            markerFilters.setUnitFilter(i)

                        }


                  }
            ]);
}());
