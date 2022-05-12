<template>
  <v-app class="app">
    <v-main>
      <NavBar />
      <v-container fluid>
        <keep-alive>
          <router-view />
        </keep-alive>
      </v-container>
      <snackbar-presenter />
    </v-main>
    <Footer />
  </v-app>
</template>

<script>
import NavBar from "./presenters/navBarPresenter.vue";
import Footer from "./components/Footer.vue";
import SnackbarPresenter from "./presenters/SnackbarPresenter.vue";

export default {
  name: "App",

  components: {
    NavBar,
    Footer,
    SnackbarPresenter,
  },
};
</script>
<style>
@import "./assets/styles/main.min.css";
</style>
