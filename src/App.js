import { testFirebase } from "./firebaseModel";
import { setCategories } from "./hikeSource.js";
//import WeatherView from "../src/components/weatherView.js";
import SearchFormPresenter from "./presenters/SearchFormPresenter.vue";
import Weather from "./presenters/weatherPresenter.js";
import RouteModel from "./RouteModel.js";

const App = {
  data() {
        return { rootModel: new RouteModel() };
  },
  mounted() {
    testFirebase();
    setCategories(this.$store);
  },
  unmounted() {},
    render() {
    const component = this;
    return (
      <div>
        <h1>Trail Planner</h1>
            <SearchFormPresenter model={component.rootModel}></SearchFormPresenter>
            <Weather model={component.rootModel}>{console.log("model "+component.rootModel)}</Weather>
      </div>
    );
  },
};

export default App;
