//test the weather API: how it works and what can we get
//search location by params.lat & params.lon (the API also provide search city by name/zip)
//response: temperater/wind/weather(with icon index)/... in the next 5 days in a step of 3 hours
//https://openweathermap.org/forecast5

function searchWeather(params) {
  const baseURL="https://api.openweathermap.org/data/2.5/forecast?";
  const myKey="&appid=7c2818a738ef6f68536c2bd139eaa7b0";
  return fetch(baseURL+"lat="+params.lat+"&lon="+params.lon+myKey)
    .then(treatHTTPResponseACB)
    .then(transformResultACB);

}
function treatHTTPResponseACB(response) {
  if (response.status != 200) {
    throw "Invalid response";
  } else return response.json();
}
function transformResultACB(result) {
  console.log(result);
  return result.results;
}

export {searchWeather};
