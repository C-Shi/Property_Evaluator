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
      'https://lift4life-cs-theme.herokuapp.com/data.geojson', 
      { idPropertyName: 'STATE' }
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
        fillOpacity: 0.8,
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


}

export default GoogleMap
