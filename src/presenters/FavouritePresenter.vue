<template>
  <div>
    <promiseNoData
      :promiseState="promiseState"
      :noDataString="'There are no favourite trails available'"
      :actionNotStartedString="'Whoops, looks like you haven’t gotten around to exploring yet! Go and search for your next adventure and save your favourite trails!'"
    >
      <trails-overview-presenter
        headline="your favourite trails"
        teaser="We save all your favourite tours here so that you can experience them later."
        :details="promiseState.data"
        :pagination="false"
        :sort="true"
      />
    </promiseNoData>
  </div>
</template>

<script>
import TrailsOverviewPresenter from "../presenters/TrailsOverviewPresenter.vue";
import { getHikeDetails } from "@/hikeSource";
import { resolvePromise } from "../resolvePromise.js";
import promiseNoData from "../views/promiseNoData.vue";

export default {
  components: { TrailsOverviewPresenter, promiseNoData },
  data() {
    return {
      promiseState: { data: null, error: null, promise: null },
    };
  },
  mounted() {
    this.loadFavourites();
  },
  watch: {
    favouriteTrails() {
      this.loadFavourites();
    },
  },
  computed: {
    favouriteTrails: function () {
      return this.$store.getters.getFavourites;
    },
  },
  methods: {
    loadFavourites() {
      if (this.favouriteTrails.length > 0)
        resolvePromise(getHikeDetails(this.favouriteTrails), this.promiseState);
      else {
        this.promiseState.data = null;
        this.promiseState.error = null;
        this.promiseState.promise = null;
      }
    },
  },
};
</script>
