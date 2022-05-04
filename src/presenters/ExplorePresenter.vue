<template>
  <div>
    <Header></Header>
    <promiseNoData
      :promiseState="promiseState"
      :noDataString="'There are no recommended tours!'"
    >
      <TrailsOverview
        :headline="'Highlights'"
        :teaser="'Explore the trending trips which our team has carefully selected for you. Start planing and choose the trail that suits you best.'"
        :details="promiseState.data"
        :pagination="false"
        @setCurrent="setCurrentACB"
      />
    </promiseNoData>
    <Footer></Footer>
  </div>
</template>

<script>
import TrailsOverview from "../views/TrailsOverview.vue";
import Header from "../components/Header.vue";
import Footer from "../components/Footer.vue";
import { setCurrentTour } from "@/utilities";
import { getHikeDetails } from "@/hikeSource";
import { resolvePromise } from "../resolvePromise.js";
import promiseNoData from "../views/promiseNoData.vue";

export default {
  components: { TrailsOverview, Header, Footer, promiseNoData },
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
