(function() {
      angular.module("redIberia").factory("markerFilters", function($rootScope) {

            var MarkerFilter = {};

            // returns a list of

            MarkerFilter.getFilterStatus = function(category, cb) {

                    var filterGroup = $rootScope.keyData.filters[category];

                    cb(filterGroup)


            }
            // edits a units filter status
            MarkerFilter.setUnitFilter = function(e, val) {
                $rootScope.keyData.filters[e] = $rootScope.keyData.filters[e]  ? false : true;

                var el = document.querySelectorAll('.' + e);
                console.log(el);
                el.forEach(element => {
                  element.classList.toggle('hideEl');
                });

            }

            return MarkerFilter;





      });

})();
