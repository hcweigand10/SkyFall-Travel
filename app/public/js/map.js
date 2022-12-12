//Initialize a map instance.
var map = new atlas.Map('map', {

    view: "Auto",
  
    //Add your Azure Maps subscription client ID to the map SDK.
    authOptions: {
      authType: "anonymous",
      clientId: "04ec075f-3827-4aed-9975-d56301a2d663", //Your Azure Maps account Client ID is required to access your Azure Maps account.
  
      getToken: function (resolve, reject, map) {
        //URL to your authentication service that retrieves an Azure Active Directory Token.
        var tokenServiceUrl = "https://azuremapscodesamples.azurewebsites.net/Common/TokenService.ashx";
  
        fetch(tokenServiceUrl).then(r => r.text()).then(token => resolve(token));
      }
    }
  });
  var marker;
  
  //Wait until the map resources are ready.
  map.events.add('ready', function () {
  
    marker = new atlas.HtmlMarker({
      htmlContent: '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30" height="37" viewBox="0 0 30 37" xml:space="preserve"><rect x="0" y="0" rx="8" ry="8" width="30" height="30" fill="{color}"/><polygon fill="{color}" points="10,29 20,29 15,37 10,29"/><text x="15" y="20" style="font-size:16px;font-family:arial;fill:#ffffff;" text-anchor="middle">{text}</text></svg>',
      color: 'Purple',
      text: '2',
      position: [0, 0]
    });
  
    //Create a HTML marker and add it to the map.
    map.markers.add(marker);
  });
  
  function UpdateMarkerOptions() {
    //Update the marker options with a random color and text value.
    marker.setOptions({
      color: 'rgb(' + (Math.random() * 255) + ',' + (Math.random() * 255) + ',' + (Math.random() * 255) + ')',
      text: Math.round(Math.random() * 100) + ''
    });
  }