// 'ngRaven',
(function() {
      angular.module('redIberia', ['ngRoute', 'ngWebSocket'])

            // =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
            // Routes
            // =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
            .config(function($routeProvider, $locationProvider, $httpProvider) {

                  $locationProvider.html5Mode(true);
                  $locationProvider.hashPrefix('');
                  $routeProvider

                        .when('/', {
                              templateUrl: "/ng/templates/mainTemplate.html",
                              controller: "mainController",
                              activePage: "welcome"
                        })

                        .otherwise({
                              redirectTo: '/'
                        });

            })

}());
