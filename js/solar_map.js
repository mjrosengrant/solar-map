
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
    $('#selected-area-span').html(selectedAreaSize + " m" + "2".sup());
    $('#nominal-power-span').html(nominalPower + " kWh");
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

  E = A * r * H * PR 
  E = Energy (kWh) 
  A = Total solar panel Area (m2) 
  r = solar panel yield or efficiency(%) 
  H = Annual average solar radiation on tilted panels (shadings not included)
  PR = Performance ratio, coefficient for losses (range between 0.5 and 0.9, default value = 0.75) 
  Source: http://photovoltaic-software.com/PV-solar-energy-calculation.php
  */
  // Values based on Source: http://photovoltaic-software.com/PV-solar-energy-calculation.php
  efficiencyYield = 0.156  // percentage
  solarRadiation = 2600 // kWh/m2
  performanceRatio = 0.75 // coeffecient
  return Math.round(sqMetersOfPanel * efficiencyYield * solarRadiation * performanceRatio);
}