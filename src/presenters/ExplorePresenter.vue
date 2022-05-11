<template>
  <div>
    <Header />
    <promiseNoData
      :promiseState="promiseState"
      :noDataString="'There are no recommended tours!'"
    >
      <trails-overview-presenter
        :headline="'Highlights'"
        :teaser="'Explore the trending trips which our team has carefully selected for you. Start planing and choose the trail that suits you best.'"
        :details="promiseState.data"
        :pagination="false"
        :sort="false"
      />
    </promiseNoData>
  </div>
</template>

<script>
import Header from "../components/Header.vue";
import { setCurrentTour } from "@/utilities";
import { getHikeDetails } from "@/hikeSource";
import { resolvePromise } from "../resolvePromise.js";
import promiseNoData from "../views/promiseNoData.vue";
import TrailsOverviewPresenter from "../presenters/TrailsOverviewPresenter.vue";
export default {
  components: { TrailsOverviewPresenter, Header, promiseNoData },
  data() {
    return {
      highlights: [117425031, 156278167, 153219273],
      promiseState: { data: [] },
    };
  },
  mounted: function () {
    if (this.highlights.length > 0)
      return resolvePromise(getHikeDetails(this.highlights), this.promiseState);
    else return [];
  },
  methods: {
    setCurrentACB(id) {
      setCurrentTour(id, this);
    },
  },
};
</script>
