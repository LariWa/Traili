<template>
  <div>
    <NavbarView
      @toFav="goToFavACB"
      @toSearch="route2SearchACB"
      @toLogin="route2LoginACB"
      @onLogOut="logOutACB"
    />
    <SnackBar
      @setSnackbarValue="setShowLogInMessage"
      :showSnackbar="showLogInMessage"
      :text="'Please log in to see your favourite trails'"
    />
  </div>
</template>

<script>
import NavbarView from "../views/NavbarView.vue";
import SnackBar from "../components/Snackbar.vue";
import {
        getAuth,
        signOut
    }
    from "firebase/auth";

export default {
  components: {
    NavbarView,
    SnackBar,
  },

  data() {
    return {
      showingLogInMessage: false,
    };
  },

  computed: {
    showLogInMessage: function () {
      if (this.$store.getters.getLoggedIn) return false;
      else if (this.showingLogInMessage) return true;
      return false;
    },
  },
  methods: {
    goToFavACB: function () {
      if (this.$store.getters.getLoggedIn) this.$router.push("/Favourites");
      else {
        this.showingLogInMessage = true;
        this.$router.push("/Login");
      }
    },
    route2SearchACB: function () {
      this.$router.push("/Search");
    },
    route2LoginACB: function () {
      this.$router.push("/Login");
    },
    logOutACB() {
        const auth = getAuth();
        signOut(auth).then(() => {
            this.$store.commit("setUID", "");
            this.$store.commit("setFav", []);
            this.$store.commit("setLoggedIn", false);
            this.textStatus = "sign out!";
            console.log("sign out");
            this.$router.go(-1);
        }).catch((error) => {
            const errorMessage = error.message;
            this.textStatus = errorMessage;
            console.error("log out error: " + errorMessage);
        });
    },
    setShowLogInMessage: function (value) {
      this.showingLogInMessage = value;
    }
  },
};
</script>
