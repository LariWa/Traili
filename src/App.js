import { testFirebase } from "./firebaseModel";
import SearchFormPresenter from "./presenters/SearchFormPresenter.vue";

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
      </v-app>
    );
  },
};

export default App;
