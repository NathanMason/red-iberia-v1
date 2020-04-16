// 'ngRaven',
(function() {
      angular.module('redIberia', ['ngRoute', 'ngWebSocket', 'angularMapbox'])

            // =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
            // Routes
            // =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
            .config(function($routeProvider, $locationProvider, $httpProvider, angularMapboxConfigProvider) {

                angularMapboxConfigProvider.config({
                                accessToken: 'pk.eyJ1IjoiYm9vemVyIiwiYSI6ImNrOHpidzU3bzA0eGMza29sdTJ6cmdmcXMifQ.iNvCN8OHOmQr95a_OkNLUQ'
                            });
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
