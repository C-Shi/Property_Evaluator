/** toggles a class on the map element that applies css animations
* this function should also be responsible for calling a resize on the google.map object.
*/
function mapAnimator() {
  document.getElementById('map').classList.add("map-move");
};

export default mapAnimator;
