<template>
  <div>
    <NavbarView
      @toFav="goToFavACB"
      @toSearch="route2SearchACB"
      @toLogin="route2LoginACB"
      @toExplore="route2ExploreACB"
    />
    <SnackBar
      @setSnackbarValue="setShowLogInMessage"
      :showSnackbar="showLogInMessage"
      :text="'Please log in to see your favourite trails'"
    />
    <logged-in-view
      @showLoggedInView="showLoggedInViewACB"
      :name="name"
      :email="email"
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
      showLoggedInView: true,
    };
  },

  computed: {
    showLogInMessage: function () {
      if (this.$store.getters.getLoggedIn) return false;
      else if (this.showingLogInMessage) return true;
      return false;
    },
    email: function () {
      return this.$store.getters.getEmail;
    },
    name: function () {
      return emailToName.process(this.email);
    },
    avatarInitials: function () {
      return this.name
        .match(/(\b\S)?/g)
        .join("")
        .toUpperCase();
    },
  },
  methods: {
    ...mapActions(["clearData"]),
    goToFavACB: function () {
      if (this.$store.getters.getLoggedIn)
        this.$router.push("/Favourites").catch(() => {});
      else {
        this.showingLogInMessage = true;
        this.$router.push("/Login").catch(() => {});
      }
    },
    route2SearchACB: function () {
      this.$router.push("/Search").catch(() => {});
    },
    route2LoginACB: function () {
      this.$router.push("/Login").catch(() => {});
    },
    route2ExploreACB: function () {
      this.showLoggedInView = true;
      this.$router.push("/Explore").catch(() => {});
    },
    logOutACB() {
      const auth = getAuth();
      signOut(auth)
        .then(() => {
          this.clearData(); //update firebase where there is a mutuation, so firebase data is deleted as well???
          this.textStatus = "sign out!";
          console.log("sign out");
          this.$router.go(-1);
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
    showLoggedInViewACB: function (value) {
      this.showLoggedInView = value;
    },
  },
};
</script>
