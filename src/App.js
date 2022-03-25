import { testFirebase } from "./firebaseModel";
import SearchFormPresenter from "./presenters/SearchFormPresenter.vue";
import { setCategories } from "./hikeSource.js";

const App = {
  data() {
    return {};
  },
  mounted() {
    testFirebase();
    setCategories(this.$store);
  },
  unmounted() {},
  render() {
    return (
      <div>
        <h1>Trail Planner</h1>
        <SearchFormPresenter></SearchFormPresenter>
      </div>
    );
  },
};

export default App;
