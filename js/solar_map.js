
var selectedArea;
var selectedAreaSize;

function initMap() {
  // Initialize map over Boston.
  var bostonCoordinates = {lat: 42.3583333, lng: -71.0602778};
  var mapDiv = document.getElementById('map')
  var mapOptions = {
    zoom: 14,
    center: bostonCoordinates,
    mapTypeId: 'satellite',
  }

  map = new google.maps.Map(
      mapDiv,
      mapOptions
  );

  // set up drawing manager for creating polygons.
  drawingManager = new google.maps.drawing.DrawingManager({
    drawingModes: ['rectangle', 'polygon'],
    map: map
  });

  // Upon completing a new overlay, remove any existing ones.
  google.maps.event.addListener(drawingManager, 'overlaycomplete', function(e) {
    if (selectedArea) {
      // Delete the existing overlay.
      selectedArea.overlay.setMap(null);
    }
    selectedArea = e;
    selectedAreaSize = getArea(selectedArea);
    nominalPower = getNominalPower(selectedAreaSize);
    $('#selected-area-span').html(selectedAreaSize + " Meters");
    $('#nominal-power-span').html(nominalPower + " kW");
  });
}

function getArea(selectedArea) {
  /* So I was unable to get any of this code working.

  Return a random number for the sake of building rest of application
  */
  // rec = new google.maps.Rectangle(selectedArea.overlay);
  // neLat = rec.getBounds().getNorthEast().lat();
  // neLng = rec.getBounds().getNorthEast().lng();
  // swLat = rec.getBounds().getSouthWest().lat();
  // swLng = rec.getBounds().getSouthWest().lng(); 
  
  // mvcArray = new google.maps.MVCArray([
  //   {
  //     'lat': neLat,
  //     'lng': neLng
  //   },
  //   {
  //     'lat': swLat,
  //     'lng': swLng
  //   }
  // ]);
  // return google.maps.geometry.spherical.computeArea(mvcArray);
  return Math.round(Math.random() * 100);
}

function getNominalPower(sqMetersOfPanel){
  /* Should calculate how much energy is created using x square meters of solar panel

  For now is an arbitrary number  
  */
  rate = 50 // 50 kW of energy per 1 square meter of solar panels. Accurate?
  return rate * sqMetersOfPanel;
}