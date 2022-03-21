import { testFirebase } from "./firebaseModel";

const App = {
  data() {
    return {};
  },
  mounted() {
    testFirebase();
  },
  unmounted() {},
  render() {
    return <h1>Trail Planner</h1>;
  },
};

export default App;
