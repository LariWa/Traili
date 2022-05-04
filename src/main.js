import Vue from "vue";
import App from "./App.vue";
import store from "./store";
import vuetify from "@/plugins/vuetify"; // path to vuetify export
import VueRouter from "vue-router";
import router from "./router";
import * as GmapVue from "gmap-vue";

Vue.use(GmapVue, {
  load: {
    key: "AIzaSyBVE6Fe5uNpAJ_urLXLV52rH1SosNdmK2I",
    libraries: "places", // This is required if you use the Autocomplete plugin
    // OR: libraries: 'places,drawing'
    // OR: libraries: 'places,drawing,visualization'
    // (as you require)

    //// If you want to set the version, you can do so:
    // v: '3.26',
  },
  installComponents: true,
});
Vue.config.productionTip = false;
Vue.use(VueRouter);

new Vue({
  store,
  vuetify,
  router,
  render: (h) => h(App),
}).$mount("#app");
