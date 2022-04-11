<template>
    <div>
        <NavBar @toFav="route2FavACB"
                @toSearch="route2SearchACB"
                @toLogin="route2LoginACB"
                
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
    return {};
  },

  computed: {
  },
  methods: {
      route2FavACB: function () {
          this.$router.push("/Favourites");
      },
      route2SearchACB: function () {
          this.$router.push("/Search");
      },
      route2LoginACB: function () {
        this.$router.push("/Login");
      },
  },
};
</script>
