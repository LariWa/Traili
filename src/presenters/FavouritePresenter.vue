<template>
  <div>
    <TrailsOverview
      :headline="'your favourite trails'"
      :details="favouriteTrails"
      :results="results"
      @setCurrent="setCurrentACB"
    />
  </div>
</template>

<script>
import TrailsOverview from "../views/TrailsOverview.vue";
import { setCurrentTour } from "@/utilities";

export default {
  components: { TrailsOverview },
  data() {
    return {};
  },

  computed: {
    favouriteTrails: function () {
      return this.$store.getters.getFavourites;
    },
    results: function () {
      if (this.favouriteTrails.length > 0) return ["hasData"];
      else return [];
    },
  },
  methods: {
    setCurrentACB(id) {
      setCurrentTour(id, this);
    },
  },
};
</script>
