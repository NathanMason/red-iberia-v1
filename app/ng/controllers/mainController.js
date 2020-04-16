(function() {

  angular.module('redIberia')

    .controller('mainController', ['$scope', '$rootScope', 'SocketFactory',
      function($scope, $rootScope, SocketFactory) {

          SocketFactory.launchSocket( function(socket){
              var collection = [];

              socket.onMessage(function(message) {
                    collection.push(JSON.parse(message.data));
                    var data = JSON.parse(message.data);

                    // create markers
                    angular.forEach(data.units, function(unit) {
                        console.log(unit);
                    })

              });

              socket.onOpen(function(message) {
                    console.log(message);
              });
          });

          $scope.map = {
              zoom: 8,
              center: [ 42, 42 ]
          };

      }
    ]);
}());
