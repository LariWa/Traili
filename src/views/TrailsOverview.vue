<template>
  <div>
    <h1>{{ headline }}</h1>
    <v-row class="masonry">
      <div
        class="col-sm-12 col-md-4 col card"
        v-for="(detail, idx) in pagedAssets"
        :key="idx"
      >
        <TrailOverviewCard
          :details="detail"
          @setCurrent="setCurrentTour"
        ></TrailOverviewCard>
      </div>
    </v-row>
    <v-pagination v-model="page" :length="numPages"></v-pagination>
  </div>
</template>

<script>
import TrailOverviewCard from "../components/TrailOverviewCard.vue";
import Masonry from "masonry-layout";

export default {
  name: "TrailsOverview",
  components: { TrailOverviewCard },
  data() {
    return {
      page: 1,
      pageSize: 21,
    };
  },
  props: {
    headline: String,
    details: Array,
  },
  updated() {
    this.createMasonry();
  },
  mounted: function () {
    this.createMasonry();
  },
  computed: {
    numPages() {
      return Math.ceil(this.details.length / this.pageSize);
    },
    pagedAssets() {
      const startIndex = (this.page - 1) * this.pageSize;
      const data = [...this.details];
      return data.splice(startIndex, this.pageSize);
    },
  },
  methods: {
    setCurrentTour: function (details) {
      this.$emit("setCurrent", details);
    },
    createMasonry: function () {
      this.masonry = new Masonry(".masonry", {
        itemSelector: "[class*='col-']",
      });
    },
  },
};
</script>
