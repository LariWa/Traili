<template>
  <v-app class="app">
    <v-main>
      <NavBar />
      <v-container fluid>
        <keep-alive>
          <router-view />
        </keep-alive>
      </v-container>
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

var unsubscribe;

export default {
  name: "App",

  components: {
    NavBar,
    Footer,
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
        this.$store.dispatch("setUID", user.uid);
        this.$store.dispatch("setLoggedIn", true);
        this.$store.dispatch("setUserEmail", user.email);
      } else {
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
