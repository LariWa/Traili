<template>
  <div>
    <h1>{{ headline }}</h1>
    <p v-if="results.length == 0">no data availaible</p>
    <p v-else-if="details == null">loading...</p>
    <div v-for="(detail, idx) in details" :key="idx">
      <TrailOverviewCard
        :details="detail"
        @setCurrent="setCurrentTour"
      ></TrailOverviewCard>
    </div>
  </div>
</template>

<script>
import TrailOverviewCard from "../components/TrailOverviewCard.vue";

export default {
  name: "TrailsOverview",
  components: { TrailOverviewCard },
  props: {
    headline: String,
    results: Array,
    details: Array,
  },
  methods: {
    setCurrentTour: function (id) {
      this.$emit("setCurrent", id);
    },
  },
};
</script>
