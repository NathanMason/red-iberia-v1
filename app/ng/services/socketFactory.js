(function() {
      angular.module("redIberia").factory("SocketFactory", function($websocket) {

            var Socket = {};

            Socket.launchSocket = function(cb) {

                  var wsURL = "";
                  if (window.location.protocol === "https:")
                        wsURL += "wss://";
                  else
                        wsURL += "ws://";
                  wsURL += window.location.hostname;
                  wsURL += ":" + 8081;
                  wsURL += window.location.pathname;

                  console.log("Connecting to \"" + wsURL + "\"");

                  var dataStream = $websocket(wsURL);

                  cb(dataStream)

            }

            return Socket;

      });

})();
