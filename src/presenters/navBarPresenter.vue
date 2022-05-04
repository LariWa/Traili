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
  </div>
</template>

<script>
//import loginPresenter from "../presenters/loginPresenter.vue";
import NavbarView from "../views/NavbarView.vue";
import SnackBar from "../components/Snackbar.vue";
export default {
  components: {
    NavbarView,
    SnackBar,
    //loginPresenter
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
      this.$router.push("/Explore").catch(() => {});
    },
    setShowLogInMessage: function (value) {
      this.showingLogInMessage = value;
    },
  },
};
</script>
