<template>
  <TrailsOverview
    :headline="headline"
    :teaser="teaser"
    :sort="sort"
    :pagination="pagination"
    :sortingIcon="sortingIcon"
    :sortCategories="sortCategories"
    :sortByCateg="sortByCateg"
    @changeSortBy="changeSortByACB"
    @changeSortingOrder="changeSortingOrderACB"
    :details="pagedAssets"
    :numPages="numPages"
    :page="page"
    @changePage="changePageACB"
  />
</template>
<script>
import TrailsOverview from "../views/TrailsOverview.vue";
export default {
  components: {
    TrailsOverview,
  },
  data() {
    return {
      page: 1,
      pageSize: 21,
      sortAsc: true,
      sortCategories: ["most relevant", "title", "length"],
      sortByCateg: "most relevant",
      sortingIcon: "mdi-sort-ascending",
    };
  },
  props: {
    headline: String,
    teaser: String,
    details: Array,
    pagination: Boolean,
    sort: Boolean,
  },
  computed: {
    numPages() {
      return Math.ceil(this.detailsSorted.length / this.pageSize);
    },
    pagedAssets() {
      if (!this.pagination) return this.detailsSorted; //no pages
      const startIndex = (this.page - 1) * this.pageSize;
      const data = [...this.detailsSorted];
      return data.splice(startIndex, this.pageSize);
    },
    detailsSorted() {
      if (this.sort) return this.sortResults();
      else return this.details;
    },
  },
  methods: {
    changeSortByACB(value) {
      this.sortByCateg = value;
    },
    changeSortingOrderACB() {
      this.sortAsc = !this.sortAsc;
      this.sortingIcon = this.sortAsc
        ? "mdi-sort-ascending"
        : "mdi-sort-descending";
    },
    sortResults() {
      var sorted = [...this.details];
      if (this.details.length > 0 && this.sortByCateg != "most relevant") {
        sorted.sort((a, b) => compare(a, b, this.sortByCateg));
      }
      if (!this.sortAsc) sorted.reverse();
      return sorted;
      function compare(a, b, sortBy) {
        if (a[sortBy] < b[sortBy]) return -1;
        if (a[sortBy] > b[sortBy]) return 1;
        return 0;
      }
    },

    changePageACB(value) {
      this.page = value;
    },
  },
};
</script>
