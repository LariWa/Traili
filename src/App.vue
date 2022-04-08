<template>
  <v-app>
    <v-app-bar app color="primary" dark> <h1>Trail Planner</h1> </v-app-bar>

    <v-main>
      <v-container fluid>
        <loginPresenter></loginPresenter>
        <keep-alive>
          <router-view />
        </keep-alive>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
    import { testFirebase } from "./firebaseModel";
    import loginPresenter from "./presenters/loginPresenter.vue";

export default {
  name: "App",

  components: {
      loginPresenter
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
