const GoogleMap = {
  initMap: function() {
    const googleMaps = window.google.maps;
    const location = { lat: 51.044270 , lng: -114.062019};
    this.map = new googleMaps.Map(document.getElementById('choropleth-map'), {
      zoom: 15,
      center: location,
      mapTypeControlOptions: {
        mapTypeIds: ['roadmap', 'satellite', 'hybrid', 'terrain']
      },
    });
  },

  // this function will load geojson data
  initChoroplethMap: function (data, colorSet) {
    this.initMap();

    const googleMaps = window.google.maps;

    this.map.data.loadGeoJson(
      'https://data.calgary.ca/resource/surr-xmvs.geojson'
    );

    this.map.data.setStyle(function(feature){
      let color;
      const communityName = feature.getProperty('name')

      if (data[communityName] === 0) {
        color = colorSet.none
      } else if (data[communityName] < 20) {
        color = colorSet.few
      } else if (data[communityName] < 50) {
        color = colorSet.some
      } else if (data[communityName] < 800) {
        color = colorSet.average
      } else if (data[communityName] < 100) {
        color = colorSet.many
      } else if (data[communityName] > 100) {
        color = colorSet.most
      } else {
        color = "transparent"
      }

      return ({
        fillColor: color,
        strokeColor: "green",
        fillOpacity: 0.7,
        strokeWeight: 1
      });
    });

  },

  // this function will enable autocomplete
  autocomplete: function () {
    const googleMaps = window.google.maps;
    const autocomplete = new googleMaps.places.Autocomplete(document.getElementById('searchBox'));

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        const circle = new googleMaps.Circle({
          center: {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          },
          radius: position.coords.accuracy
        });
        autocomplete.setBounds(circle.getBounds());
      });
    }
  },

  loadChoropleth: function(controlDiv, map) {
    // Set CSS for the control border.
    var controlUI = document.createElement('div');
    controlUI.style.backgroundColor = '#fff';
    controlUI.style.border = '2px solid #fff';
    controlUI.style.borderRadius = '3px';
    controlUI.style.boxShadow = '0 2px 6px rgba(0,0,0,.3)';
    controlUI.style.cursor = 'pointer';
    controlUI.style.marginBottom = '22px';
    controlUI.style.textAlign = 'center';
    controlUI.title = 'Click to recenter the map';
    controlDiv.appendChild(controlUI);

    // Set CSS for the control interior.
    var controlText = document.createElement('div');
    controlText.style.color = 'rgb(25,25,25)';
    controlText.style.fontFamily = 'Roboto,Arial,sans-serif';
    controlText.style.fontSize = '16px';
    controlText.style.lineHeight = '38px';
    controlText.style.paddingLeft = '5px';
    controlText.style.paddingRight = '5px';
    controlText.innerHTML = 'Center Map';
    controlUI.appendChild(controlText);

    // Setup the click event listeners: simply set the map to Chicago.
    controlUI.addEventListener('click', function() {

    });
  }

}

export default GoogleMap
