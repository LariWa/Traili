<template>
  <TrailDetails @addToFav="onAddToFav" @goBack="onReturn" @removeFromFav="onRemoveFromFav" />
</template>

<script>
import TrailDetails from "../views/TrailDetailsView.vue";
import { checkLogin } from "../authen/sign"
export default {
  components: { TrailDetails },
  data() {
    return {};
  },
  methods: {
    onAddToFav: function (trail) {
      //console.log("onAddToFav " + trail);
          if (checkLogin()) {
              this.$store.commit("addToFav", trail);
          }
          else
              this.$router.push("/Login");
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
