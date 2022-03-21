import { project, key } from "./hikeAPIConfig.js";
function searchHike(searchText) {
  return fetch(
    "http://www.outdooractive.com/api/search/?" +
      new URLSearchParams({
        key: key,
        q: searchText,
        project: project,
        lang: "en",
        fallback: false,
      }),

    {
      method: "GET", // HTTP method
      headers: {
        Accept: "application/json",
      },
    }
  )
    .then(treatHTTPResponseACB)
    .then((res) => console.log(res));
}
function getHikeDetails(id) {
  fetch(
    "http://www.outdooractive.com/api/project/" +
      project +
      "/oois/" +
      id +
      "?" +
      new URLSearchParams({
        key: key,
        project: project,
        lang: "en",
        fallback: false,
      }),
    {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    }
  )
    .then(treatHTTPResponseACB)
    .then((res) => console.log(res));
}

function treatHTTPResponseACB(response) {
  console.log(response);
  /*TODO throw if the HTTP response is not 200, otherwise return response.json()*/
  if (response.status != 200) {
    throw "Invalid response";
  } else {
    return response.json();
  }
}
export { searchHike, getHikeDetails };
