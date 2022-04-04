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

    <!-- <search-results-view :results="this.promiseState.data" /> -->
  </div>
</template>

<script>
import SearchFormView from "@/components/SearchFormView.vue";
// import SearchResultsView from "@/components/SearchResultsView.vue";
import { resolvePromise } from "../resolvePromise.js";
import { searchHike } from "../hikeSource.js";
export default {
  components: { SearchFormView },
  data() {
    return {
      promiseState: { data: [] },
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
  },
  computed: {
    searchParams: function () {
      return {
        q: "",
        category: this.categoryNamesToIds(this.selectedCategories),
        dif_d: this.difficulties[0].selected,
        dif_m: this.difficulties[1].selected,
        dif_e: this.difficulties[2].selected,
        asc_s: this.getSliderValue("Ascent", 0),
        asc_e: this.getSliderValue("Ascent", 1),
        tim_s: this.getSliderValue("Duration", 0),
        tim_e: this.getSliderValue("Duration", 1),
        len_s: this.getSliderValue("Distance", 0),
        len_e: this.getSliderValue("Distance", 1),
      };
    },
    categories() {
      return this.$store.getters.getCategories.map((item) => item.name);
    },
  },
  methods: {
    searchTextChanged: function (text) {
      this.searchParams.q = text;
    },
    search: function () {
      resolvePromise(searchHike(this.searchParams), this.promiseState, null);
    },
    categoriesChanged: function (categories) {
      this.selectedCategories = categories;
    },
    sliderChangedACB: function (value, name) {
      var slider = this.sliders.find((element) => element.sliderName == name);
      slider.sliderValues = value;
    },
    getSliderValue(name, index) {
      var slider = this.sliders.find((element) => element.sliderName == name);
      if (index == 0) return slider.sliderValues[0];
      else {
        if (slider.sliderValues[1] == slider.range[1]) return "";
        else return slider.sliderValues[1];
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
  },
};
</script>
