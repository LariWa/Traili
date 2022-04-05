<template>
  <div>
  <search-form-view
    @searchTextChanged="searchTextChanged"
    @search="search"
    @categoryChanged="categoryChanged"
  />

  <search-results-view
    :results='this.promiseState.data'
  />
</div>
</template>

<script>
import SearchFormView from "@/components/SearchFormView.vue";
import SearchResultsView from "@/components/SearchResultsView.vue";
import { resolvePromise } from "../resolvePromise.js";
import { searchHike } from "../hikeSource.js";
export default {
  components: { SearchFormView, SearchResultsView },
  data() {
    return {
      searchParams: {
        q: "",
        category: "",
      },
      promiseState: {data:{}},
    };
  },
  methods: {
    searchTextChanged: function (text) {
      console.log(text);
      this.searchParams.q = text;
    },
    search: function () {
      console.log(this.$store.state.categories);
      console.log("search");
      resolvePromise(searchHike(this.searchParams), this.promiseState, null);
    },
    categoryChanged: function (category) {
      console.log("category: " + category);
      this.searchParams.category = category;
    },
  },
};
</script>
