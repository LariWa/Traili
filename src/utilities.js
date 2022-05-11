// convert m into km
function convertDistance(m) {
  let km = m / 1000;
  return km.toFixed(1);
}

// convert min into hh:mm
function convertTime(min) {
  var hours = min / 60;
  var h = Math.floor(hours);
  var minutes = (hours - h) * 60;
  var m = Math.floor(minutes);

  return `${twoDigits(h)}:${twoDigits(m)}`;
}

// format 2 digit numbers
function twoDigits(num) {
  return num.toString().padStart(2, "0");
}

// retun difficulty of hike
function getDifficulty(value) {
  if (value == 1) {
    return "easy";
  } else if (value == 2) {
    return "intermediate";
  } else if (value == 3) {
    return "difficult";
  } else {
    return "difficulty unknown";
  }
}
function setCurrentTour(tour, component) {
  // component.$store.commit("setCurrentTourID", id);
  component.$store.dispatch("setCurrentTour", tour);
  component.$router.push("/TrailDetails");
}

function addedToFav(store, id) {
  return store.getters.getFavourites.includes(parseInt(id));
}

export {
  convertDistance,
  convertTime,
  twoDigits,
  getDifficulty,
  setCurrentTour,
  addedToFav,
};
