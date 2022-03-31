//test the weather API: how it works and what can we get
//search location by params.lat & params.lon (the API also provide search city by name/zip)
//response: temperater/wind/weather(with icon index)/... in the next 5 days in a step of 3 hours
//https://openweathermap.org/forecast5

function searchWeather(params,model) {
    function processWeather(allWeather, theDate) {

        function hasDateCB(hourWeather) {
            return ((hourWeather.dt_txt).includes(theDate))
        }

        const sorted = { cityName: "", weatherArray: {} };
        sorted["cityName"] = allWeather.city.name;
        sorted["weatherArray"] = allWeather.list.filter(hasDateCB);
        //console.log(sorted.weatherArray);
        return sorted;

    }

    function transformResultACB(result) {
        model.weather = processWeather(result, params.date);
        return processWeather(result, params.date);
    }

  const baseURL="https://api.openweathermap.org/data/2.5/forecast?";
  const myKey="&appid=7c2818a738ef6f68536c2bd139eaa7b0";
  return fetch(baseURL+"q="+params.q+myKey)
    .then(treatHTTPResponseACB)
    .then(transformResultACB);

}
function treatHTTPResponseACB(response) {
  if (response.status != 200) {
    throw "Invalid response";
  } else return response.json();
}



export {searchWeather};
