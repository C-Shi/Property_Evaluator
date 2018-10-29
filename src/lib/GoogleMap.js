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
    const googleMaps = window.google.maps;
    var infoWindow = new googleMaps.InfoWindow({
      content: ""
    });
    // data is the object of community - number pair for different style
    // style is the mapping style, here is the gray
    // colorSet is the intenstiy based on community
    let total = 0;
    let type = "";
    Object.keys(data).forEach(function(community){
      total += data[community];

    })

    const average = total / Object.keys(data).length
    this.initMap(10.5, style);

    this.initMap(10, style);

    this.map.data.loadGeoJson(
      'https://data.calgary.ca/resource/surr-xmvs.geojson'
    );

    // create a button on the google map, and add event listener to go to choropleth map
    const mapDiv =  document.getElementById('choropleth-map');


    let legendBar;
    switch (colorSet.most) {
      case "#b30000":
        legendBar = "legend-div-search"
        type = "Search"
      break
      case "#08519c":
        legendBar = "legend-div-population"
        type = "Population"
      break
      case "#54278f":
        legendBar = "legend-div-crime"
        type = "Cases"
      break
      default :
        legendBar = "legend-div-search"
        type = "Search"
    }



    // create legend label
    // const legendDiv = document.createElement("div")
    // legendDiv.setAttribute("id", "legend-div")
    // mapDiv.appendChild(legendDiv)

    const legendDiv = document.createElement("div")
    legendDiv.setAttribute("class", "legend")
    legendDiv.setAttribute("id", legendBar)
    const none = document.createElement("p")
    none.textContent = "None"
    const ave = document.createElement("p")
    ave.textContent = "Some"
    ave.setAttribute("class", "bar-middle")
    const most = document.createElement("p")
    most.textContent = "Most"
    most.setAttribute("class", "bar-bottom")
    legendDiv.appendChild(none)
    legendDiv.appendChild(ave)
    legendDiv.appendChild(most)
    mapDiv.appendChild(legendDiv)

    // SET COLOR FOR EACH POLYGON
    this.map.data.setStyle(function(feature){
      let color;
      let outlineWeight = 0.7;
      let zIndex = 1;
      let strokeColor = "gray";
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

      if (feature.getProperty('state') === 'hover') {
        outlineWeight = zIndex = 2;
      }

      return ({
        fillColor: color,
        strokeColor: strokeColor,
        fillOpacity: 1,
        zIndex: zIndex,
        strokeWeight: outlineWeight,
      });
    });

    this.map.data.addListener("mouseover", (e) => {
      e.feature.setProperty('state', 'hover');
      const communityName = e.feature.getProperty('name');
      const cases = data[e.feature.getProperty('name')] || "N/A";
      infoWindow.setContent(
        '<div style="line-height:1.00;overflow:hidden;white-space:nowrap;" class="infoWindow">' +
        'Community: ' + communityName + '<br><br>' + type + ': ' +
        cases + '</div>');
      var anchor = new googleMaps.MVCObject();
      anchor.set("position", e.latLng);
      infoWindow.open(this.map, anchor);
    })

    this.map.data.addListener('mouseout', (e) => {
      e.feature.setProperty('state', 'normal');
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
