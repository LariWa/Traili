
class RouteModel {
    constructor(routeArray = []) {
        this.weather = { "cityName": "", "weatherArray": [] };
        this.routeArray = routeArray;
    }
}

export default RouteModel;