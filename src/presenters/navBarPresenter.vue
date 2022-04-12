<template>
  <div>
    <NavBar
      @toFav="route2FavACB"
      @toSearch="route2SearchACB"
      @toLogin="route2LoginACB"
      @closeLogInMessage="closeLogInMessage"
      :showLogInMessage="showLogInMessage"
    />
  </div>
</template>

<script>
//import loginPresenter from "../presenters/loginPresenter.vue";
import NavBar from "../components/NavBar.vue";

export default {
  components: {
    NavBar,
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
    route2FavACB: function () {
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
    closeLogInMessage: function () {
      this.showingLogInMessage = false;
    },
  },
};
</script>
