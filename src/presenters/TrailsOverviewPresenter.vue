<template>
  <div class="overview-container">
    <h2>{{ headline }}</h2>
    <p class="col-sm-12 col-md-7">{{ teaser }}</p>
    <v-row v-if="sort">
      <v-select
        :items="sortCategories"
        :value="sortByCateg"
        label="Sort by"
        @change="changeSortByACB"
        class="col-10 col-md-11 sort-select"
      >
      </v-select>
      <v-btn
        icon
        @click="changeSortingOrderACB"
        class="col-2 col-md-1 sort-icon"
      >
        <v-icon>{{ sortingIcon }}</v-icon>
      </v-btn>
    </v-row>
    <v-row>
      <div
        class="col-sm-12 col-md-4 col card-layout"
        v-for="(detail, idx) in pagedAssets"
        :key="idx"
      >
        <TrailOverviewCard
          :details="detail"
          @setCurrent="setCurrentTour"
          :addedToFav="addedToFav"
        ></TrailOverviewCard>
      </div>
    </v-row>
    <v-pagination
      v-if="pagination"
      color="blue-grey lighten-2"
      :value="page"
      :length="numPages"
      @input="changePageACB"
    ></v-pagination>
  </div>
</template>

<script>
import TrailOverviewCard from "../components/TrailOverviewCard.vue";
import {addedToFav} from "../utilities.js";

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
    sort: Boolean,
    sortingIcon: String,
    sortCategories: Array,
    sortByCateg: String,
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
    addedToFav: function() {
      return addedToFav(this.details.id);
    },

  },
  methods: {
    setCurrentTour: function (details) {
      this.$emit("setCurrent", details);
    },
    changeSortingOrderACB() {
      this.$emit("changeSortingOrder");
    },
    changeSortByACB(value) {
      this.$emit("changeSortBy", value);
    },
    changePageACB(value) {
      this.page = value;
    },
  },
};
</script>
