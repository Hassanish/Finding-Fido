
// GLOBAL VARIABLES
//----------------------------------------------------------------------

// var map;
var marker;
var mapLocation;

// MAIN PROCESS
//---------------------------------------------------------------------

// function initMap() {
//     var mapLocation = {lat: -25.363, lng: 131.044};
//     var map = new google.maps.Map(document.getElementById('map'), {
//       zoom: 4,
//       center: mapLocation
//     });
//     var marker = new google.maps.Marker({
//       position: mapLocation,
//       map: map
//     });
//   }

//Reference at:  https://developers.google.com/maps/documentation/javascript/geocoding#GeocodingRequests
  var geocoder;
  var map;
  var address = "1890 Buford Ave, St Paul, MN 55108";
  function initialize() {
    geocoder = new google.maps.Geocoder();
    var latlng = new google.maps.LatLng(-34.397, 150.644);
    var mapOptions = {
      zoom: 12,
      center: latlng
    }
    map = new google.maps.Map(document.getElementById('map'), mapOptions);
    codeAddress();

}




// FUNCTIONS
// --------------------------------------------------------------------------

  function codeAddress() {
    // var address = document.getElementById('address').value;
   
    geocoder.geocode( { 'address': address}, function(results, status) {
      if (status == 'OK') {
        map.setCenter(results[0].geometry.location);
        var marker = new google.maps.Marker({
            map: map,
            position: results[0].geometry.location,
            icon: "assets/images/dog-icon.png",
            animation: google.maps.Animation.DROP,
            // reference:  https://developers.google.com/maps/documentation/javascript/examples/marker-animations
            title: "Name of Shelter"
        });
      } else {
        alert('Geocode was not successful for the following reason: ' + status);
      }
    });
  }

//<body onload="initialize()">
// <div id="map" style="width: 320px; height: 480px;"></div>
//  <div>
//    <input id="address" type="textbox" value="Sydney, NSW">
//   <input type="button" value="Encode" onclick="codeAddress()">
// </div>
//</body>



