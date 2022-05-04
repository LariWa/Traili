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
    onAddToFav: function (id) {
      console.log("onAddToFav " + id);
      if (checkLogin()) {
        this.addToFav(id);
      } else this.$router.push("/Login");
    },
    onReturn: function () {
      this.$router.go(-1);
    },

    onRemoveFromFav: function (id) {
      this.removeFromFav(id);
    },
  },
};
</script>
