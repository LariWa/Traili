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
        v-for="(detail, idx) in details"
        :key="idx"
      >
        <TrailOverviewCardPresenter :details="detail" />
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
import TrailOverviewCardPresenter from "../presenters/TrailOverviewCardPresenter.vue";

export default {
  components: { TrailOverviewCardPresenter },
  name: "TrailsOverview",

  props: {
    headline: String,
    teaser: String,
    pagination: Boolean,
    sort: Boolean,
    sortingIcon: String,
    sortCategories: Array,
    sortByCateg: String,
    details: Array,
    page: Number,
    numPages: Number,
    addedToFav: Boolean,
  },

  methods: {
    changeSortingOrderACB() {
      this.$emit("changeSortingOrder");
    },
    changeSortByACB(value) {
      this.$emit("changeSortBy", value);
    },
    changePageACB(value) {
      this.$emit("changePage", value);
    },
  },
};
</script>
