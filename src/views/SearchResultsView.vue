<template>
  <div>
    <br />
    <v-divider></v-divider>
    <br />
    <div v-if="results">
      <h1 v-if="Object.keys(results).length > 0">Results</h1>
      <p v-if="details == null">loading...</p>
      <div v-for="(detail, idx) in details" :key="idx">
        <TrailOverviewCard
          :details="detail"
          @setCurrent="setCurrentTour"
        ></TrailOverviewCard>
      </div>
    </div>
  </div>
</template>

<script>
import TrailOverviewCard from "../components/TrailOverviewCard.vue";

export default {
  name: "SearchResultsView",
  components: { TrailOverviewCard },
  props: {
    results: Array,
    details: Array,
  },
  methods: {
    setCurrentTour: function (id) {
      console.log("view");
      this.$emit("setCurrent", id);
    },
  },
};
</script>
