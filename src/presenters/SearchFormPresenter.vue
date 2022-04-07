<template>
  <div>
    <search-form-view
      @searchTextChanged="searchTextChanged"
      @search="search"
      :categories="categories"
      :selectedCategories="selectedCategories"
      @categoriesChanged="categoriesChanged"
      @sliderChanged="sliderChangedACB"
      :sliders="sliders"
      :difficulties="difficulties"
      @checkboxChanged="difficultiesChangedACB"
    />

    <search-results-view
      :results="searchResults"
      :details="promiseStateDetails.data"
      @setCurrent="setCurrentACB"
    />
  </div>
</template>

<script>
import SearchFormView from "../views/SearchFormView.vue";
import SearchResultsView from "../views/SearchResultsView.vue";
import { resolvePromise } from "../resolvePromise.js";
import { searchHike, getHikeDetails } from "../hikeSource.js";
export default {
  components: { SearchFormView, SearchResultsView },
  data() {
    return {
      searchText: "",
      promiseState: { data: [] },
      promiseStateDetails: { data: [] },
      sliders: [
        {
          sliderValues: [0, 13],
          range: [0, 13],
          sliderName: "Duration",
          unit: "h",
        },
        {
          sliderValues: [0, 101],
          range: [0, 101],
          sliderName: "Distance",
          unit: "km",
        },
        {
          sliderValues: [0, 1501],
          range: [0, 1501],
          sliderName: "Ascent",
          unit: "m",
        },
      ],
      difficulties: [
        { name: "easy", color: "green", selected: true },
        {
          name: "moderate",
          color: "yellow darken-2",
          selected: true,
        },
        { name: "difficult", color: "red darken-4", selected: true },
      ],
      selectedCategories: [],
    };
  },
  watch: {
    categories() {
      this.selectedCategories = this.categories; //select all categories at start
    },
    searchResults() {
      if (this.searchResults) {
        resolvePromise(
          getHikeDetails(this.searchResults.map((item) => item.id)),
          this.promiseStateDetails,
          null
        );
      }
    },
  },
  computed: {
    searchResults: function () {
      if (this.promiseState && this.promiseState.data)
        return this.promiseState.data;
      else return [];
    },
    searchParams: function () {
      return {
        q: this.searchText,
        dif_e: this.difficulties[0].selected,
        dif_m: this.difficulties[1].selected,
        dif_d: this.difficulties[2].selected,
        asc_s: this.getSliderValue("Ascent", 0), //in meter
        asc_e: this.getSliderValue("Ascent", 1),
        tim_s: this.getSliderValue("Duration", 0, 60), //in minutes
        tim_e: this.getSliderValue("Duration", 1, 60),
        len_s: this.getSliderValue("Distance", 0, 1000),
        len_e: this.getSliderValue("Distance", 1, 1000),
      };
    },
    categoryIds: function () {
      return this.categoryNamesToIds(this.selectedCategories);
    },
    categories() {
      return this.$store.getters.getCategories.map((item) => item.name);
    },
  },
  methods: {
    searchTextChanged: function (text) {
      this.searchText = text;
    },
    search: function () {
      resolvePromise(this.searchPromise(), this.promiseState, null);
    },
    searchPromise: function () {
      const component = this;
      return searchAllCategories();
      //search for each category
      function searchAllCategories() {
        const searchPromiseArray = component.categoryIds.map((category) =>
          searchHike(component.searchParams, category)
        );
        return Promise.all(searchPromiseArray).then((res) => mergeResults(res));
        function mergeResults(res) {
          return res
            .filter((item) => item.data)
            .map((item) => item.data)
            .flat(1);
        }
      }
    },
    categoriesChanged: function (categories) {
      this.selectedCategories = categories;
    },
    sliderChangedACB: function (value, name) {
      var slider = this.sliders.find((element) => element.sliderName == name);
      slider.sliderValues = value;
    },
    getSliderValue(name, index, convertVal) {
      if (!convertVal) convertVal = 1;
      var slider = this.sliders.find((element) => element.sliderName == name);
      if (index == 0) return slider.sliderValues[0] * convertVal;
      else {
        if (slider.sliderValues[1] == slider.range[1]) return "";
        else return slider.sliderValues[1] * convertVal;
      }
    },
    difficultiesChangedACB(value, name) {
      var difficulty = this.difficulties.find(
        (element) => element.name == name
      );
      difficulty.selected = value;
    },
    categoryNamesToIds(names) {
      return this.$store.getters.getCategories
        .filter((category) => names.includes(category.name))
        .map((item) => item.id);
    },
    setCurrentACB(id) {
      this.$store.commit("setCurrentTourID", id);
      this.$store.dispatch("setCurrentTour");
      this.$router.push("/TrialDetails");
    },
  },
};
</script>
