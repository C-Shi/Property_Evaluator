const GoogleMap = {
  initMap: function(zoom, style) {
    const googleMaps = window.google.maps;
    const location = { lat: 51.044270 , lng: -113.862019};
    this.map = new googleMaps.Map(document.getElementById('choropleth-map'), {
      zoom: zoom,
      center: location,
      styles: style,
      zoomControl: false,
      mapTypeControl: false,
      streetViewControl: false,
      fullscreenControl: false,
    });
  },

  // this function will load geojson data
  initChoroplethMap: function (data, style, colorSet) {
    // data is the object of community - number pair for different style
    // style is the mapping style, here is the gray
    // colorSet is the intenstiy based on community
    let total = 0;
    let outlineWeight = 1;
    Object.keys(data).forEach(function(community){
      total += data[community];
    })

    const average = total / Object.keys(data).length

    this.initMap(10.5, style);

    this.map.data.loadGeoJson(
      'https://data.calgary.ca/resource/surr-xmvs.geojson'
    );

    // create a button on the google map, and add event listener to go to choropleth map
    const mapDiv =  document.getElementById('choropleth-map');
    const infoDiv = document.createElement("div")
    infoDiv.setAttribute("id", "info-div")
    infoDiv.setAttribute("class", "alert")
    infoDiv.setAttribute("class", "alert-secondary")
    mapDiv.appendChild(infoDiv);

    // create legend label
    // const legendDiv = document.createElement("div")
    // legendDiv.setAttribute("id", "legend-div")
    // mapDiv.appendChild(legendDiv)
    
    // SET COLOR FOR EACH POLYGON
    this.map.data.setStyle(function(feature){
      let color;
      const communityName = feature.getProperty('name')
      if (data[communityName] === 0) {
        color = colorSet.none
      } else if (data[communityName] < 0.5 * average) {
        color = colorSet.few
      } else if (data[communityName] < average) {
        color = colorSet.some
      } else if (data[communityName] < 1.5 * average) {
        color = colorSet.average
      } else if (data[communityName] < 2 * average) {
        color = colorSet.many
      } else if (data[communityName] >= 2 * average) {
        color = colorSet.most
      } else {
        color = "transparent"
      }

      return ({
        fillColor: color,
        strokeColor: "gray",
        fillOpacity: 1,
        strokeWeight: outlineWeight,
      });
    });
    this.map.data.addListener('mouseover', mouseOverDataItem);

    function mouseOverDataItem(e) {
      const communityName = e.feature.getProperty('name');
      const cases = data[e.feature.getProperty('name')] || "N/A";
      const info = communityName + ": " + cases
      document.getElementById("info-div").textContent = info
    }

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
