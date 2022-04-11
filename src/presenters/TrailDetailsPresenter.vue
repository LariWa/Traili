<template>
  <TrailDetails @addToFav="onAddToFav" @returnToSearch="onReturn" @removeFromFav="onRemoveFromFav" />
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
      this.$router.push("/SearchFormView");
    },

    onRemoveFromFav: function (trail) {
      this.$store.commit("removeFromFav", trail);
    },
  },
};
</script>
