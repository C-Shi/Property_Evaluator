/** toggles a class on the map element that applies css animations
* this function should also be responsible for calling a resize on the google.map object.
*/
const mapAnimator = {
  mapForwardsAnimator: function() {
      document.getElementById('map').classList.add("map-move");
  },

  mapBackwardsAnimator: function() {
    document.getElementById('map').classList.remove("map-move");
  }
}

export default mapAnimator;
