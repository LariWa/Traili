<template>
  <TrailDetails
    @addToFav="onAddToFav"
    @goBack="onReturn"
    @removeFromFav="onRemoveFromFav"
  />
</template>

<script>
import TrailDetails from "../views/TrailDetailsView.vue";
import { checkLogin } from "../authen/sign";
import { mapActions } from "vuex";
export default {
  components: { TrailDetails },
  data() {
    return {};
  },
  methods: {
    ...mapActions(["addToFav", "removeFromFav"]),
    onAddToFav: function (trail) {
      //console.log("onAddToFav " + trail);
      if (checkLogin()) {
        this.addToFav(trail);
      } else this.$router.push("/Login");
    },
    onReturn: function () {
      this.$router.go(-1);
    },

    onRemoveFromFav: function (trail) {
      this.removeFromFav(trail);
    },
  },
};
</script>
