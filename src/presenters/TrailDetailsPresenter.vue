<template>
  <div>
    <TrailDetails
      @addToFav="onAddToFav"
      @goBack="onReturn"
      @removeFromFav="onRemoveFromFav"
      :trailInfo="trailInfo"
      :addedToFav="addedToFav"
    />
    <SnackBar
      @setSnackbarValue="setSnackbarValueACB"
      :showSnackbar="showSnackbar"
      :text="snackbarText"
    />
  </div>
</template>

<script>
import TrailDetails from "../views/TrailDetailsView.vue";
import { mapActions } from "vuex";
import SnackBar from "../components/Snackbar.vue";
import { addedToFav } from "../utilities.js";

export default {
  components: { TrailDetails, SnackBar },
  data() {
    return {
      showSnackbar: false,
      snackbarText: "",
    };
  },

  computed: {
    trailInfo() {
      return this.$store.getters.getCurrentTour;
    },
    addedToFav: function () {
      return addedToFav(this.$store, this.trailInfo.id);
    },
  },

  methods: {
    ...mapActions(["addToFav", "removeFromFav"]),
    onAddToFav: function (id) {
      if (this.$store.getters.getLoggedIn) {
        this.addToFav(id);
        this.setSnackbarSettings(true, "Trail added to favourites");
      } else this.$router.push("/Login");
    },
    onReturn: function () {
      this.$router.go(-1);
    },
    onRemoveFromFav: function (id) {
      this.removeFromFav(id);
      this.setSnackbarSettings(true, "Trail removed from favourites");
    },
    setSnackbarValueACB: function (value) {
      this.showSnackbar = value;
    },
    setSnackbarSettings(visibility, text) {
      this.showSnackbar = visibility;
      this.snackbarText = text;
    },
  },
};
</script>
