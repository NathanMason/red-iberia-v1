// rightSideBarController
(function() {

      angular.module('redIberia')

            .controller('rightSideBarController', ['$scope', '$rootScope',
                  function($scope, $rootScope) {

                        $rootScope.selectedUnit = [];

                        console.log($rootScope.selectedUnit.length);
                  }
            ]);
}());
