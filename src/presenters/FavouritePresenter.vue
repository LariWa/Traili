<template>
  <div>
    <promiseNoData
      :promiseState="promiseState"
      :noDataString="'There are no favourite trails available'"
      :actionNotStartedString="'Whoops, looks like you haven’t gotten around to exploring yet! Go and search for your next adventure and save your favourite trails!'"
    >
      <TrailsOverview
        :headline="'your favourite trails'"
        :teaser="'We save all your favourite tours here so that you can experience them later.'"
        :details="promiseState.data"
        :pagination="true"
        @setCurrent="setCurrentACB"
      />
    </promiseNoData>
    <Footer></Footer>
  </div>
</template>

<script>
import TrailsOverview from "../views/TrailsOverview.vue";
import Footer from "../components/Footer.vue";
import { setCurrentTour } from "@/utilities";
import { getHikeDetails } from "@/hikeSource";
import { resolvePromise } from "../resolvePromise.js";
import promiseNoData from "../views/promiseNoData.vue";

export default {
  components: { TrailsOverview, Footer, promiseNoData },
  data() {
    return {
      promiseState: { data: null, error: null, promise: null },
    };
  },
  watch: {
    favouriteTrails() {
      if (this.favouriteTrails.length > 0)
        resolvePromise(getHikeDetails(this.favouriteTrails), this.promiseState);
      else {
        this.promiseState.data = null;
        this.promiseState.error = null;
        this.promiseState.promise = null;
      }
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
