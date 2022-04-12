<template>
  <TrailDetails @addToFav="onAddToFav" @goBack="onReturn" @removeFromFav="onRemoveFromFav" />
</template>

<script>
import TrailDetails from "../views/TrailDetailsView.vue";

export default {
  components: { TrailDetails },
  data() {
    return {};
  },
  methods: {
    onAddToFav: function (trail) {
      //console.log("onAddToFav " + trail);
      this.$store.commit("addToFav", trail);
    },
    onReturn: function () {
      this.$router.go(-1);
    },

    onRemoveFromFav: function (trail) {
      this.$store.commit("removeFromFav", trail);
    },
  },
};
</script>
