<template>
  <div class="overview-container">
    <h2>{{ headline }}</h2>
    <p class="col-sm-12 col-md-7">{{ teaser }}</p>
    <v-row>
      <div
        class="col-sm-12 col-md-4 col card-layout"
        v-for="(detail, idx) in pagedAssets"
        :key="idx"
      >
        <TrailOverviewCard
          :details="detail"
          @setCurrent="setCurrentTour"
        ></TrailOverviewCard>
      </div>
    </v-row>
    <v-pagination
      v-if="pagination"
      color="blue-grey lighten-2"
      v-model="page"
      :length="numPages"
    ></v-pagination>
  </div>
</template>

<script>
import TrailOverviewCard from "../components/TrailOverviewCard.vue";

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
    teaser: String,
    details: Array,
    pagination: Boolean,
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
  },
};
</script>
