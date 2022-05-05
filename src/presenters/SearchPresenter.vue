<template>
  <div>
    <search-form-view
      :searchText="searchText"
      @searchTextChanged="searchTextChanged"
      @search="search"
      :categories="categories"
      :selectedCategories="selectedCategories"
      @categoriesChanged="categoriesChanged"
      @sliderChanged="sliderChangedACB"
      :rangeSliders="rangeSliders"
      :difficulties="difficulties"
      @checkboxChanged="difficultiesChangedACB"
      @clearFilters="clearFiltersACB"
      @setAllCategories="setAllCategoriesACB"
      :allCategSet="allCategSet"
      @changeSortingOrder="changeSortingOrderACB"
      :sortingIcon="sortingIcon"
      :sortCateg="sortCateg"
      :sortByCateg="sortByCateg"
      @changeSortBy="changeSortByACB"
      @placeChanged="placeChangedACB"
      :radiusSlider="radiusSlider"
      @radiusValueChanged="changeRadiusValueACB"
    />
    <br />
    <v-divider></v-divider>
    <br />
    <p class="no-data" v-if="searchText == ''">
      There are so many unexplored adventures waiting for you! The first step is
      to search for a place.
    </p>
    <promiseNoData
      v-if="searchText != ''"
      :promiseState="promiseState"
      :noDataString="'Sorry! No trails were found matching your search criteria.'"
      :actionNotStartedString="'Click search to find trails matching your criteria.'"
    >
      <TrailsOverview
        :headline="'Results'"
        :teaser="
          'We found ' +
          detailsResultsSorted.length +
          ' tours that might interest you!'
        "
        :details="detailsResultsSorted"
        :pagination="true"
        @setCurrent="setCurrentACB"
      />
    </promiseNoData>
    <Footer></Footer>
  </div>
</template>

<script>
import SearchFormView from "../views/SearchFormView.vue";
import TrailsOverview from "../views/TrailsOverview.vue";
import Footer from "../components/Footer.vue";
import { resolvePromise } from "../resolvePromise.js";
import { searchHike, getHikeDetails } from "../hikeSource.js";
import { setCurrentTour } from "@/utilities";
import promiseNoData from "../views/promiseNoData.vue";
export default {
  components: { SearchFormView, TrailsOverview, Footer, promiseNoData },
  data() {
    return {
      searchText: "",
      promiseState: { data: null, error: null, promise: null },
      rangeSliders: [
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
      allCategSet: true,
      sortingIcon: "mdi-sort-ascending",
      sortAsc: true,
      sortCateg: ["most relevant", "title", "length", "ranking"],
      sortByCateg: "most relevant",
      place: {},
      detailsResultsSorted: [],
      radiusSlider: {
        name: "Search radius",
        unit: "km",
        min: 5,
        max: 100,
        value: 50,
      },
    };
  },
  watch: {
    categories() {
      this.selectedCategories = this.categories; //select all categories at start
    },

    detailsResults() {
      this.detailsResultsSorted = [...this.detailsResults];
      if (
        this.detailsResults.length > 0 &&
        this.sortByCateg != "most relevant"
      ) {
        this.detailsResultsSorted.sort(this.compare);
        if (!this.sortAsc) this.detailsResultsSorted.reverse();
      }
    },
  },
  computed: {
    detailsResults: function () {
      if (
        this.promiseState &&
        this.promiseState.data &&
        this.promiseState.data.length > 0
      )
        return this.promiseState.data[0];
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
        radius: this.radiusSlider.value * 1000,
        location: this.getLocation(),
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
      resolvePromise(
        this.searchPromise().then(this.getDetails),
        this.promiseState,
        null
      );
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
          return res.filter((item) => item).flat(1);
        }
      }
    },
    categoriesChanged: function (categories) {
      this.selectedCategories = categories;
    },
    sliderChangedACB: function (value, name) {
      var slider = this.rangeSliders.find(
        (element) => element.sliderName == name
      );
      slider.sliderValues = value;
    },
    getSliderValue(name, index, convertVal) {
      if (!convertVal) convertVal = 1;
      var slider = this.rangeSliders.find(
        (element) => element.sliderName == name
      );
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
    setCurrentACB(tour) {
      setCurrentTour(tour, this);
    },
    clearFiltersACB() {
      //reset rangeSliders
      this.rangeSliders.forEach(
        (slider) => (slider.sliderValues = slider.range)
      );
      //reset checkboxes
      this.difficulties.forEach((difficulty) => (difficulty.selected = true));
      //reset search radius
      this.radiusSlider.value = 50;
    },
    setAllCategoriesACB(select) {
      if (select) {
        this.selectedCategories = this.categories;
      } else this.selectedCategories = [];
    },
    changeSortingOrderACB() {
      this.sortAsc = !this.sortAsc;
      this.sortingIcon = this.sortAsc
        ? "mdi-sort-ascending"
        : "mdi-sort-descending";
    },
    changeSortByACB(value) {
      this.sortByCateg = value;
    },
    placeChangedACB(place) {
      this.place = place;
    },
    getLocation() {
      if (this.searchText == this.place.formatted_address)
        return (
          this.place.geometry.location.lng() +
          "," +
          this.place.geometry.location.lat()
        );
      return "";
    },
    compare(a, b) {
      if (a[this.sortByCateg] < b[this.sortByCateg]) {
        return -1;
      }
      if (a[this.sortByCateg] > b[this.sortByCateg]) {
        return 1;
      }
      return 0;
    },
    changeRadiusValueACB(value) {
      this.radiusSlider.value = value;
    },
    getDetails(searchResults) {
      var ids = searchResults.map((item) => item.id);
      if (ids && ids.length > 0) {
        var steps = 500; //avoid breaking the API
        var promises = [];
        for (let i = 0; i < ids.length; i += steps) {
          promises.push(getHikeDetails(ids.slice(i, i + steps)));
        }
        return Promise.all(promises);
      }
    },
  },
};
</script>
