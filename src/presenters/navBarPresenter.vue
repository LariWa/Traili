<template>
  <div>
    <NavbarView
      @toFav="goToFavACB"
      @toSearch="route2SearchACB"
      @toExplore="route2ExploreACB"
      :loggedIn="loggedIn"
      @setShowLoggedInView="setShowLoggedInViewACB"
    />
    <SnackBar
      @setSnackbarValue="setSnackbarValueACB"
      :showSnackbar="showSnackbar"
      :text="snackbarText"
    />
    <logged-in-view
      @showLoggedInView="setShowLoggedInViewACB"
      :name="name"
      :email="userEmail"
      :avatarInitials="avatarInitials"
      :showLoggedInView="showLoggedInView"
      @onLogOut="logOutACB"
    />
    <v-spacer />
  </div>
</template>

<script>
import NavbarView from "../views/NavbarView.vue";
import SnackBar from "../components/Snackbar.vue";

import { getAuth, signOut } from "firebase/auth";
import { mapActions } from "vuex";
import LoggedInView from "@/views/loggedInView.vue";
import emailToName from "email-to-name";
export default {
  components: {
    NavbarView,
    SnackBar,
    LoggedInView,
  },

  data() {
    return {
      showingLogInMessage: false,
      showLoggedInView: false,
      email: "",
      showSnackbar: false,
      snackbarText: "",
    };
  },

  computed: {
    userEmail: function () {
      return this.$store.getters.getEmail;
    },
    name: function () {
      return emailToName.process(this.userEmail);
    },
    avatarInitials: function () {
      return this.name
        .match(/(\b\S)?/g)
        .join("")
        .toUpperCase();
    },
    loggedIn: function () {
      return this.$store.getters.getLoggedIn;
    },
  },
  methods: {
    ...mapActions(["setUID", "setLoggedIn", "clearData", "setUserEmail"]),
    goToFavACB: function () {
      if (this.loggedIn) this.$router.push("/Favourites").catch(() => {});
      else {
        this.setSnackbarSettings(
          true,
          "Please log in to see your favourite trails!"
        );
        this.showLogInPopUp = true;
      }
    },

    route2SearchACB: function () {
      this.$router.push("/Search").catch(() => {});
    },
    route2ExploreACB: function () {
      this.$router.push("/Explore").catch(() => {});
    },

    logOutACB() {
      const auth = getAuth();
      signOut(auth)
        .then(() => {
          this.clearData();
          this.textStatus = "sign out!";
          console.log("sign out");
          this.showLoggedInView = false;
          this.setSnackbarSettings(true, "You are now logged out!");
        })
        .catch((error) => {
          const errorMessage = error.message;
          this.textStatus = errorMessage;
          console.error("log out error: " + errorMessage);
        });
    },
    setShowLogInMessage: function (value) {
      this.showingLogInMessage = value;
    },
    setShowLoggedInViewACB: function (value) {
      this.showLoggedInView = value;
    },
    setSnackbarValueACB: function (value) {
      this.showSnackbar = value;
    },
    setSnackbarSettings(visibility, text) {
      this.showSnackbar = visibility;
      this.snackbarText = text;
    },
  },
};
</script>
