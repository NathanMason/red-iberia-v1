################################################################################
Map and Stats backend and front end for TGW Persia Aflame and other servers.
Primary Coder: Nathan "Boozer" Mason.
Lua/DCS Coder: Rob Graham.

Be aware that if you use this server set you will need to customise the dcslink.lua
to match whatever settings you have set up.

You need NODEJS installed and running.
You will also need SLMOD for the stats server and use SLSC to send the stats through
or you can always just write a .json convertor yourself and the like.

Currently the way this works is that information is sent in packets through the DCS link
and what ever you want to display is shown based on those packets.

Basic support can be found on the TGW Discord but really this is use at your own risk as 
we really haven't gotten any of this to the point were it's a public 'share' its very much
just something we do in our free time to improve the server.

-Rob.

################################################################################
Aircraft Images
################################################################################
Aircraft images are set within
app/ng/services/markerServices.js -- line 5
to add a new image to the app name the image to match the Key named type from the object sent to the client from DCS.
then place the image inside the  app/img folder
Ensure the image has 3 variants
 red, blue, unknown.
