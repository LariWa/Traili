import WeatherView from "../components/weatherView.js";

const Weather={
    props: ["model"],

    data() {
        //console.log(props.model);
        return (
            <WeatherView props={props.model.weather} />
        );

    },
    render() {

    }
}
export default Weather;