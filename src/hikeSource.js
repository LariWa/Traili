import { project, key } from "./hikeAPIConfig.js";
function searchHike(searchParams, category) {
  return fetch(
    "http://www.outdooractive.com/api/project/api-dev-oa/filter/tour?" +
      new URLSearchParams({
        category: category,
        key: key,
        project: project,
        lang: "en",
        fallback: false,
      }) +
      "&" +
      new URLSearchParams(searchParams),
    {
      method: "GET", // HTTP method
      headers: {
        Accept: "application/json",
      },
    }
  ).then(treatHTTPResponseACB);
}

function getHikeDetails(id) {
  return fetch(
    "http://www.outdooractive.com/api/project/" +
      project +
      "/oois/" +
      id +
      "?" +
      new URLSearchParams({
        key: key,
        project: project,
        lang: "en",
        fullyTranslatedLangus: "en",

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
    .then(treatHikeResponse);
}
function getCategories() {
  return fetch(
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
    .then(treatCategoriesResponse);
}

function treatHTTPResponseACB(response) {
  /*TODO throw if the HTTP response is not 200, otherwise return response.json()*/
  if (response.status != 200) {
    throw "Invalid response";
  } else {
    return response.json();
  }
}
function treatCategoriesResponse(response) {
  return response.category;
}
function treatHikeResponse(response) {
  // if (response.tour.length == 1) return response.tour[0];
  return response.tour;
}
export { searchHike, getHikeDetails, getCategories };
