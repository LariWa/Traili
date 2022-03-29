//test the display of weatherView
// acts like a presenter

import { searchWeather } from "../resolveWeather.js";
import WeatherView from "../src/components/weatherView.js";

function search() {
    const location = { lon: "59.18", lat:"18.10" };//stockholm
    const theDate = "03-29";//in the presenter, it will be a dropdown menu chooing from 1-4 days after today
    const allWeather=searchWeather(location);
    const sortedWeather = processWeather(allWeather, theDate);
    return (<WeatherView
        props={sortedWeather}
    />)
}

function processWeather(allWeather, theDate) {

    function hasDateCB(hourWeather) {
        return ((hourWeather.dt_txt).includes(theDate))
    }

    const sorted = { cityName: "", weatherArray: {} };
    sorted["cityName"] = allWeather.city.name;
    sorted["weatherArray"] = allWeather.list.filter(hasDateCB);

    return sorted;

}