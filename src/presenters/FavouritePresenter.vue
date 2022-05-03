<template>
  <div>
    <promiseNoData :promiseState="promiseState" :noDataString="'No favourites'">
      <TrailsOverview
        :headline="'your favourite trails'"
        :details="promiseState.data"
        :results="results"
        @setCurrent="setCurrentACB"
      />
    </promiseNoData>
  </div>
</template>

<script>
import TrailsOverview from "../views/TrailsOverview.vue";
import { setCurrentTour } from "@/utilities";
import { getHikeDetails } from "@/hikeSource";
import { resolvePromise } from "../resolvePromise.js";
import promiseNoData from "../views/promiseNoData.vue";

export default {
  components: { TrailsOverview, promiseNoData },
  data() {
    return {
      promiseState: { data: [] },
    };
  },
  watch: {
    favouriteTrails() {
      console.log("favouriteTrailChanged");
      if (this.favouriteTrails.length > 0)
        resolvePromise(getHikeDetails(this.favouriteTrails), this.promiseState);
    },
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
