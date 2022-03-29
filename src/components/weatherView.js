function WeatherView(props) {

    //choose what format of time to display
    function displayTime(fullTime,choice) {
        const len = fullTime.length;
        //display date
        const startIndex = 5;
        const endIndex = 10;
        if (choice === "hour") {
            //display hour
            startIndex = len - 8;
            endIndex = len - 3;
        }
        const shortTime = fullTime.substring(startIndex, endIndex);
        return shortTime;
    }
    // display one result: time period, temperature, weather, wind
    // for now, it's just text->will be graphic
    function weatherTableRowCB(hourWeather) {
        return (
            <tr key={hourWeather.dt}>
                <td>{displayTime(hourWeather.dt_txt,"hour")}</td>
                <td>{hourWeather.weather[0].descrption}</td>
                <td class="alignRight">
                    {(hourWeather.main.temp-273.15).toFixed(0)}
                </td>
                <td> {ingr.unit} </td>
            </tr>
        );
    }

    return (
        <div>
            <span>{props.cityName},{displayTime(props.weatherArray[0].dt_txt),"day"}</span>
            <table>
                <thead>
                    <tr>
                        <th>Time</th>
                        <th>Weather</th>
                        <th>Temperature</th>
                        <th>Wind</th>
                    </tr>
                </thead>
                <tbody>
                    {(props.weatherArray).map(weatherTableRowCB)}
                </tbody>
            </table>
         </div>
            )
}


export default WeatherView;
