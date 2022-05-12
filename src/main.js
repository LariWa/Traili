import Vue from "vue";
import App from "./App.vue";
import store from "./store";
import vuetify from "@/plugins/vuetify"; // path to vuetify export
import VueRouter from "vue-router";
import router from "./router";
import * as GmapVue from "gmap-vue";
import { gmapKey } from "./APIConfig.js";
import {
    updateModelFromFirebase,
    updateFirebaseFromModel,
} from "./firebaseModel";

import { getAuth, onAuthStateChanged } from "firebase/auth";
var unsubscribe;

Vue.use(GmapVue, {
  load: {
    key: gmapKey,
    libraries: "places", // This is required if you use the Autocomplete plugin
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
  mounted() {
        //persistence
        const auth = getAuth();
        onAuthStateChanged(auth, (user) => {
            if (user) {
                //save user info
                this.$store.dispatch("initData", user);
            } else {
                if (unsubscribe) {
                    this.$store.dispatch("clearData");
                }
            }
        });

        unsubscribe = store.subscribe((mutation) => {
            if (mutation.type === "setUID") updateModelFromFirebase(store);
            if (mutation.type === "addToFav" || mutation.type === "removeFromFav")
                updateFirebaseFromModel(store);
        });
        this.$router.push("/Explore").catch(() => { });
    },

    beforeDestroyed() {
        unsubscribe();
    },
}).$mount("#app");
