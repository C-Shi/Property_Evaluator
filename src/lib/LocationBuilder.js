const LocationBuilder = {
  buildInitialPropertyInfo: function (newLocation, data){
      newLocation.address = data[0].address;
      newLocation.comm_code= data[0].comm_code;
      newLocation.comm_name= data[0].comm_name;
      newLocation.lat= data[0].latitude;
      newLocation.lng= data[0].longitude;
      newLocation.value= [];
      data.forEach(location => {
          newLocation.value.push({
          year: location.roll_year,
          price: location.assessed_value
          })
      })
  },

  addCommunityPopulationToLocation: function (newLocation, data){
    newLocation.comm_population = [];
    data.forEach((community) => {
        newLocation.comm_population.push({
            year: community.census_year.slice(0, 4),
            population: community.population
        })
    })
  },

  addCommunityCrimeToLocation: function (newLocation, data){
    newLocation.crime = {}
    data.forEach((crime) => {
        if (newLocation.crime[crime.category]) {
            newLocation.crime[crime.category] += Number(crime.count)
        } else {
            newLocation.crime[crime.category] = Number(crime.count)
        }
    })
  }

}

export default LocationBuilder