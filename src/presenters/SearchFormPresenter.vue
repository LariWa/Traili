<template>
    <search-form-view @searchTextChanged="searchTextChanged"
                      @search="search"
                      @categoryChanged="categoryChanged"
                      @dateChanged="dateChanged" />
</template>

<script>
import SearchFormView from "@/components/SearchFormView.vue";
import { resolvePromise } from "../resolvePromise.js";
import { searchWeather } from "../resolveWeather.js";
import { searchHike } from "../hikeSource.js";

export default {
  props: ["model"],
  components: { SearchFormView},
  data() {
    return {
      searchParams: {
        q: "",
        category: "",
        date: "",
      },

      promiseState: {},
      promiseStateWeather: {},
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
      resolvePromise(searchWeather(this.searchParams,this.props.model), this.promiseStateWeather, null);

    },
    categoryChanged: function (category) {
      console.log("category: " + category);
      this.searchParams.category = category;
      },
    dateChanged: function (date) {
          console.log("date: " + date);
          this.searchParams.date = date;
      },
  },
};
</script>
