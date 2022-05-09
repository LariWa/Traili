import { project, key } from "./APIConfig.js";
function searchHike(searchParams, category) {
  if (searchParams.location) return searchNearBy(searchParams, category);
  else return searchByKeyword(searchParams, category);
}
function searchNearBy(searchParams, category) {
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
  function threatNearByResponse(response) {
    return response.result;
  }
}
function searchByKeyword(searchParams, category) {
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
  function threatKeywordResponse(response) {
    return response.data;
  }
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
    .then(treatHikeResponse);
  function treatHikeResponse(response) {
    return response.tour;
  }
}

function getCategories() {
  return fetch(
    "https://www.outdooractive.com/api/project/" +
      project +
      "/category/tree/tour/pruned?" +
      new URLSearchParams({
        key: key,
        lang: "en",
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
  function treatCategoriesResponse(response) {
    return response.category;
  }
}

function treatHTTPResponseACB(response) {
  if (response.status != 200) throw "Invalid response";
  else return response.json();
}

export { searchHike, getHikeDetails, getCategories };
