import { project, key } from "./hikeAPIConfig.js";
function searchHike(searchParams, category) {
  if (searchParams.location) return searchNearBy(searchParams, category);
  else return searchByKeyword(searchParams, category);
}
function searchNearBy(searchParams, category) {
  console.log(searchParams.sortedBy);
  return fetch(
    "https://www.outdooractive.com/api/project/" +
      project +
      "/nearby/tour?" +
      new URLSearchParams({
        category: category,
        key: key,
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
  )
    .then(treatHTTPResponseACB)
    .then(threatNearByResponse);
}
function searchByKeyword(searchParams, category) {
  console.log("key" + searchParams.q);
  return fetch(
    "https://www.outdooractive.com/api/project/" +
      project +
      "/filter/tour?" +
      new URLSearchParams({
        category: category,
        key: key,
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
  )
    .then(treatHTTPResponseACB)
    .then(threatKeywordResponse);
}

function getHikeDetails(id) {
  return fetch(
    "https://www.outdooractive.com/api/project/" +
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
    "https://www.outdooractive.com/api/project/" +
      project +
      "/category/tree/tour/pruned?" +
      new URLSearchParams({
        key: key,
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
function threatNearByResponse(response) {
  return response.result;
}
function threatKeywordResponse(response) {
  return response.data;
}
function treatCategoriesResponse(response) {
  return response.category;
}
function treatHikeResponse(response) {
  return response.tour;
}
export { searchHike, getHikeDetails, getCategories };
