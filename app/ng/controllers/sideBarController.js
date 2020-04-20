(function() {

      angular.module('redIberia')

            .controller('sideBarController', ['$scope', '$rootScope', '$timeout', 'markerFactory', 'markerFilters',
                  function($scope, $rootScope, $timeout, markerFactory, markerFilters) {

                        $scope.toggleFilter = function(i){
                            console.log('toggle');
                            markerFilters.setUnitFilter(i)

                        }


                  }
            ]);
}());
