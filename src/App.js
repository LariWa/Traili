import { testFirebase } from "./firebaseModel";
//import SearchFormPresenter from "./presenters/SearchFormPresenter.vue";
//import weather from "./presenters/weatherPresenter.vue";
import TrailDetails from "./components/products/TrailDetails.vue"

const App = {
  data() {
    return {};
  },
  mounted() {
    testFirebase();
    //setCategories(this.$store);
    this.$store.dispatch("setCategories");
    this.$store.dispatch("setCurrentTour");
  },
  unmounted() {},
  render() {
    return (
      <div>
        <h1>Trail Planner</h1>
        {/*<SearchFormPresenter></SearchFormPresenter>*/}
        {/*<weather></weather>*/}
        <TrailDetails></TrailDetails>
      </div>
    );
  },
};

export default App;
