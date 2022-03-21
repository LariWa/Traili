import Vue from "vue";
import App from "./App.js";
import store from "./store";
import { h } from "vue";

// needed for View JSX. In a Vue project you can use import {h} from "vue"
window.React = { createElement: h };
Vue.config.productionTip = false;

new Vue({
  store,
  render: (h) => h(App),
}).$mount("#app");
