import Vue from "vue";
import App from "./App.js";
import store from "./store";
import vuetify from '@/plugins/vuetify' // path to vuetify export


Vue.config.productionTip = false;

new Vue({
  store,
  render: (h) => h(App),
  vuetify,
}).$mount("#app");
