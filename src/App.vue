<template>
  <v-app class="app">
    <NavBar />

    <v-main>
      <v-container fluid>
        <keep-alive>
          <router-view />
        </keep-alive>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import {
  testFirebase,
  updateModelFromFirebase,
  updateFirebaseFromModel,
} from "./firebaseModel";
import NavBar from "./presenters/navBarPresenter.vue";
import store from "./store/index.js";
var unsubscribe;

export default {
  name: "App",

  components: {
    NavBar,
    /*SearchFormPresenter,*/
    /*TrailDetailsPresenter,*/
  },

  data: () => ({
    //
  }),

  mounted() {
    testFirebase();
    unsubscribe = store.subscribe((mutation, state) => {
      console.log("subscribe: ");
      console.log(state);
      console.log("mutation: ");
      console.log(mutation);
      if (mutation.type === "setUID") updateModelFromFirebase(state);
      if (mutation.type === "addToFav" || mutation.type === "removeFromFav")
        updateFirebaseFromModel(state);
    });
    this.$store.dispatch("setCategories");
    this.$router.push("/Explore").catch(() => {});
  },

  destroyed() {
    unsubscribe();
  },
};
</script>
<style>
@import "./assets/styles/main.min.css";
</style>
