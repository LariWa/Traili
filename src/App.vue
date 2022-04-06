<template>
  <v-app>
    <v-app-bar app color="primary" dark> <h1>Trail Planner</h1> </v-app-bar>

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

export default {
  name: "App",

  components: {
  },

  data: () => ({
    //
  }),
  mounted() {
    testFirebase();
    this.$store.dispatch("setCategories");
    this.$router.push("/SearchFormView");
  },
};
</script>
