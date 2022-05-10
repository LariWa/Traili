<template>
  <div>
    <NavbarView
      @toFav="goToFavACB"
      @toSearch="route2SearchACB"
      @toExplore="route2ExploreACB"
      :loggedIn="loggedIn"
    />
    <SnackBar
      @setSnackbarValue="setSnackbarValueACB"
      :showSnackbar="showSnackbar"
      :text="snackbarText"
    />
    <v-spacer />
  </div>
</template>

<script>
import NavbarView from "../views/NavbarView.vue";
import SnackBar from "../components/Snackbar.vue";

export default {
  components: {
    NavbarView,
    SnackBar,
  },

  data() {
    return {
      showSnackbar: false,
      snackbarText: "",
    };
  },
  computed: {
    loggedIn: function () {
      return this.$store.getters.getLoggedIn;
    },
  },

  methods: {
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
