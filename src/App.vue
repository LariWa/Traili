<template>
  <v-app>
    <NavBar />

    <v-main>
      <v-container fluid>
        <!--<SearchFormPresenter></SearchFormPresenter>-->
        <keep-alive>
          <router-view />
        </keep-alive>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import { testFirebase } from "./firebaseModel";
import NavBar from "./components/NavBar.vue";
//import SearchFormPresenter from "./presenters/SearchFormPresenter.vue";
//import TrailDetailsPresenter from "./presenters/TrailDetailsPresenter.vue";

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
    this.$store.dispatch("setCategories");
    // this.$store.dispatch("setCurrentTour");
    this.$router.push("/Search");
  },
};
</script>
