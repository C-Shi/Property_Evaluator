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
  initChoroplethMap: function () {
    this.initMap();

    const googleMaps = window.google.maps;

    this.map.data.loadGeoJson(
      'https://lift4life-cs-theme.herokuapp.com/data.geojson', 
      { idPropertyName: 'STATE' }
    );

    // wait for the request to complete by listening for the first feature to be
    // added
    googleMaps.event.addListenerOnce(this.map.data, 'addfeature', () => {
      googleMaps.event.trigger(document.getElementById('census-variable'),
          'change');
    });


    this.map.data.forEach(function(row) {
      row.setProperty('community', undefined);
    });

    this.map.data.setStyle(function(feature){
      var color = 'gray';
      if (feature.getProperty('name') === "SUNALTA"){
        color = 'red';
      }
      return ({
        fillColor: color,
        strokeColor: "green",
        strokeWeight: 2
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
