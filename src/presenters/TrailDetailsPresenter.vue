<template>
  <TrailDetails @addToFav="onAddToFav" @returnToSearch="onReturn" />
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
  },
};
</script>
