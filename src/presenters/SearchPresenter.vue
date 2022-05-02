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
      :sliders="sliders"
      :difficulties="difficulties"
      @checkboxChanged="difficultiesChangedACB"
      @clearFilters="clearFiltersACB"
      @setAllCategories="setAllCategoriesACB"
      :allCategSet="allCategSet"
      @changeSortingOrder="changeSortingOrderACB"
      :sortingIcon="sortingIcon"
      :sortCateg="sortCateg"
      @changeSortBy="changeSortByACB"
      @placeChanged="placeChangedACB"
    />
    <br />
    <v-divider></v-divider>
    <br />

    <promiseNoData
      :promiseState="promiseStateDetails"
      :noDataString="'Sorry! No trails were found matching your search criteria.'"
    >
      <TrailsOverview
        :headline="'Results'"
        :results="searchResults"
        :details="promiseStateDetails.data"
        @setCurrent="setCurrentACB"
      />
    </promiseNoData>
  </div>
</template>

<script>
import SearchFormView from "../views/SearchFormView.vue";
import TrailsOverview from "../views/TrailsOverview.vue";
import { resolvePromise } from "../resolvePromise.js";
import { searchHike, getHikeDetails } from "../hikeSource.js";
import { setCurrentTour } from "@/utilities";
import promiseNoData from "../views/promiseNoData.vue";
export default {
  components: { SearchFormView, TrailsOverview, promiseNoData },
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
      allCategSet: true,
      sortingIcon: "mdi-sort-ascending",
      sortAsc: true,
      sortCateg: ["title", "distance"],
      sortByCateg: "",
      place: {},
    };
  },
  watch: {
    categories() {
      this.selectedCategories = this.categories; //select all categories at start
    },
    searchResults() {
      if (this.searchResults) {
        var ids = this.searchResults.map((item) => item.id);
        if (ids && ids.length > 0) {
          /*for (let id in ids) {
          this.details.push(resolvePromise(getHikeDetails(id), this.promiseStateDetails, null));
        }

        Promise.all(this.details).then(result => {
          console.log({result});
        });*/
          resolvePromise(
            getHikeDetails(ids), //avoid too many ids for api needs to be fixed
            this.promiseStateDetails,
            null
          );
        }
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
        sortedBy: this.getSortedByValue(),
        radius: 5000,
        location: this.getLocation(),
        limit: 1000,
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
          return res.filter((item) => item).flat(1);
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
    setCurrentACB(tour) {
      setCurrentTour(tour, this);
    },
    clearFiltersACB() {
      //reset sliders
      this.sliders.forEach((slider) => (slider.sliderValues = slider.range));
      //reset checkboxes
      this.difficulties.forEach((difficulty) => (difficulty.selected = true));
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
    getSortedByValue() {
      if (this.sortByCateg == "") return "";
      var sortBy = this.sortByCateg;
      if (
        this.searchText == this.place.formatted_address &&
        this.sortByCateg == "title"
      )
        //api uses name instead of title for nearBy call
        sortBy = "name";
      if (this.sortAsc) return sortBy + " asc";
      else return sortBy + " desc";
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
  },
};
</script>
