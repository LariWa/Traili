<template>
  <div>
    <search-form-view
      @searchTextChanged="searchTextChanged"
      @search="search"
      @categoryChanged="categoryChanged"
    />

    <search-results-view :results="this.promiseState.data" />
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
      promiseState: { data: [] },
      durationRange: [0, 13],
      durationValuesSlider: [0, 13],
      distanceRange: [0, 101],
      distanceValuesSlider: [0, 101],
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
    };
  },
  computed: {
    searchParams: function () {
      return {
        q: "",
        category: "",
        dif_d: true,
        dif_m: true,
        dif_e: true,
        asc_s: this.getSliderValue("Ascent", 0),
        asc_e: this.getSliderValue("Ascent", 1),
        tim_s: this.getSliderValue("Duration", 0),
        tim_e: this.getSliderValue("Duration", 1),
        len_s: this.getSliderValue("Distance", 0),
        len_e: this.getSliderValue("Distance", 1),
      };
    },
  },
  methods: {
    searchTextChanged: function (text) {
      this.searchParams.q = text;
    },
    search: function () {
      resolvePromise(searchHike(this.searchParams), this.promiseState, null);
    },
    categoryChanged: function (category) {
      this.searchParams.category = category;
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
  },
};
</script>
