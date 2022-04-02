import { testFirebase } from "./firebaseModel";
import SearchFormPresenter from "./presenters/SearchFormPresenter.vue";
import weather from "./presenters/weatherPresenter.vue";
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
      <v-app>
        <v-content>
          <h1>Trail Planner</h1>
        </v-content>

        <SearchFormPresenter></SearchFormPresenter>
        <weather></weather>
      </v-app>
    );
  },
};

export default App;
