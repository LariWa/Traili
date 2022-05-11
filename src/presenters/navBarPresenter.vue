<template>
  <div>
    <NavbarView
      @toFav="goToFavACB"
      @toSearch="route2SearchACB"
      @toExplore="route2ExploreACB"
      :loggedIn="getLoggedIn"
    />
    <v-spacer />
  </div>
</template>

<script>
import NavbarView from "../views/NavbarView.vue";
import { mapGetters, mapActions } from "vuex";

export default {
  components: {
    NavbarView,
  },

  computed: {
    ...mapGetters(["getLoggedIn", "getShowLogInPopUp"]),
  },

  methods: {
    ...mapActions(["setShowLogInPopUp", "setSnackbar"]),

    goToFavACB: function () {
      if (this.getLoggedIn) this.$router.push("/Favourites").catch(() => {});
      else {
        this.setSnackbar("Please log in to see your favourite trails!");

        this.setShowLogInPopUp(true);
      }
    },
    route2SearchACB: function () {
      this.$router.push("/Search").catch(() => {});
    },
    route2ExploreACB: function () {
      this.$router.push("/Explore").catch(() => {});
    },
  },
};
</script>
