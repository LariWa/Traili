<template>
  <NotFoundView @toExplore="route2ExploreACB"> </NotFoundView>
</template>

<script>
import NotFoundView from "../views/NotFoundView.vue";

export default {
  components: {
    NotFoundView,
  },
  methods: {
    route2ExploreACB: function () {
      this.$router.push("/Explore");
    },
  },
};
</script>
