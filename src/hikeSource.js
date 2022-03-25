import { project, key } from "./hikeAPIConfig.js";
function searchHike(searchParams) {
  return fetch(
    "http://www.outdooractive.com/api/project/api-dev-oa/filter/tour?" +
      new URLSearchParams(searchParams, {
        key: key,
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
  ).then(treatHTTPResponseACB);
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
  ).then(treatHTTPResponseACB);
}
function setCategories(store) {
  fetch(
    "http://www.outdooractive.com/api/project/" +
      project +
      "/category/tree/tour/pruned?" +
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
    .then((res) => {
      console.log(res);
      store.commit("setCategories", res.category);
    });
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
export { searchHike, getHikeDetails, setCategories };
