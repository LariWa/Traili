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
import {
  updateModelFromFirebase,
  updateFirebaseFromModel,
} from "./firebaseModel";
import NavBar from "./presenters/navBarPresenter.vue";
import Footer from "./components/Footer.vue";
import store from "./store/index.js";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import SnackbarPresenter from "./presenters/SnackbarPresenter.vue";

var unsubscribe;

export default {
  name: "App",

  components: {
    NavBar,
    Footer,
    SnackbarPresenter,
  },

  data: () => ({
    //
  }),

  mounted() {
    //persistence
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        //save user info
        //@Yawen maybe create one action in the store login, which does all the methods
        this.$store.dispatch("setUID", user.uid);
        this.$store.dispatch("setLoggedIn", true);
        this.$store.dispatch("setUserEmail", user.email);
        this.$store.dispatch("setSnackbar", "You are logged in!");
        this.$store.dispatch("setShowLogInPopUp", false);
      } else {
        if (unsubscribe) {
          this.$store.dispatch("setSnackbar", "You are logged out!");
        }
        console.log("no user in on auth state change");
      }
    });

    unsubscribe = store.subscribe((mutation) => {
      //console.log("subscribe: ");
      //console.log(state);
      //console.log("mutation: ");
      //console.log(mutation);
      if (mutation.type === "setUID") updateModelFromFirebase(store);
      if (mutation.type === "addToFav" || mutation.type === "removeFromFav")
        updateFirebaseFromModel(store);
    });
    this.$router.push("/Explore").catch(() => {});
  },

  beforeDestroyed() {
    unsubscribe();
  },
};
</script>
<style>
@import "./assets/styles/main.min.css";
</style>
