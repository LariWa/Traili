<template>
  <div class="search-container">
    <v-row>
      <v-col class="col-12 col-md-6">
        <h3>What adventure are you looking for?</h3>
        <v-combobox
          :value="selectedCategories"
          :items="categories"
          multiple
          chips
          @change="onDropDownChangeACB"
        >
          <template v-slot:selection="{ attrs, item, parent, selected, index }">
            <v-chip
              v-if="index < 3"
              v-bind="attrs"
              :color="`${item.color} lighten-3`"
              :input-value="selected"
            >
              <span class="pr-2">
                {{ item }}
              </span>
              <v-icon small @click="parent.selectItem(item)"> $delete </v-icon>
            </v-chip>
            <span v-if="index === 3" class="grey--text">
              (+{{ selectedCategories.length - 4 }} others)
            </span>
          </template> </v-combobox
        ><v-checkbox
          class="clear"
          :input-value="allCategSet"
          @change="allCategChangedACB"
          :label="'Clear/Select all categories'"
          color="blue-grey lighten-2"
        ></v-checkbox>
      </v-col>
      <v-col class="col-12 col-md-6">
        <h3 class="search-label">Where do you want to do it?</h3>
        <gmap-autocomplete
          class="introInput"
          @place_changed="getAddressDataACB"
          :options="{
            fields: ['geometry', 'formatted_address'],
            componentRestrictions: { country: 'swe' },
          }"
        >
          >
          <template v-slot:default="slotProps">
            <v-text-field
              label="Search for a location..."
              ref="input"
              :value="searchText"
              color="blue-grey lighten-2"
              v-on:listeners="slotProps.listeners"
              v-on:attrs="slotProps.attrs"
              @change="onTextChangeACB"
              @keypress="onKeyPressedACB"
            >
              >
            </v-text-field>
          </template>
        </gmap-autocomplete>
      </v-col>
    </v-row>
    <v-row>
      <v-col class="col-12">
        <v-expansion-panels>
          <v-expansion-panel>
            <v-expansion-panel-header> Filter </v-expansion-panel-header>
            <v-expansion-panel-content>
              <v-btn icon @click="clearFiltersACB">
                <v-icon>mdi-replay</v-icon>
              </v-btn>
              <div v-for="slider in this.rangeSliders" :key="slider.name">
                <RangeSlider
                  :range="slider.range"
                  :values="slider.sliderValues"
                  :name="slider.sliderName"
                  :unit="slider.unit"
                  @changed="rangeSliderChangedACB"
                />
              </div>
              <p>Trail Difficulty</p>
              <div v-for="difficulty in difficulties" :key="difficulty.name">
                <v-checkbox
                  :label="difficulty.name"
                  :color="difficulty.color"
                  :input-value="difficulty.selected"
                  @change="checkBoxChangedACB($event, difficulty.name)"
                ></v-checkbox>
              </div>
              <div>
                <span>{{ radiusSlider.name }} </span>
                <span class="text-caption">in {{ radiusSlider.unit }}</span>
                <span class="float-right">
                  {{ radiusSlider.value + radiusSlider.unit }}
                </span>
                <v-slider
                  :max="radiusSlider.max"
                  :min="radiusSlider.min"
                  :value="radiusSlider.value"
                  @input="radiusSliderChangedACB"
                ></v-slider>
              </div>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-col>

      <v-col class="col-12">
        <v-btn id="searchBtn" class="col-12" @click="onSearchACB" color="amber"
          >Search!</v-btn
        >
      </v-col>
    </v-row>
  </div>
</template>

<script>
import RangeSlider from "../components/rangeSlider.vue";

export default {
  components: {
    RangeSlider,
  },
  props: {
    searchText: String,
    rangeSliders: Array,
    difficulties: Array,
    selectedCategories: Array,
    categories: Array,
    allCategSet: Boolean,
    radiusSlider: Object,
  },

  emits: [
    "searchTextChanged",
    "search",
    "categoriesChanged",
    "rangeSliderChanged",
    "difficultiesChanged",
    "clearFilters",
    "setAllCategories",
    "placeChanged",
    "radiusValueChanged",
  ],
  methods: {
    onTextChangeACB: function (text) {
      this.$emit("searchTextChanged", text);
    },
    onKeyPressedACB: function (event) {
      if (event.keyCode === 13) {
        //Enter
        this.$emit("searchTextChanged", event.target.value);
        this.onSearchACB();
      }
    },
    onSearchACB: function () {
      this.$emit("search");
    },
    onDropDownChangeACB: function (value) {
      this.$emit("categoriesChanged", value);
    },
    rangeSliderChangedACB(value, name) {
      this.$emit("rangeSliderChanged", value, name);
    },
    checkBoxChangedACB(value, name) {
      this.$emit("difficultiesChanged", value, name);
    },
    clearFiltersACB() {
      this.$emit("clearFilters");
    },
    allCategChangedACB(value) {
      this.$emit("setAllCategories", value);
    },

    getAddressDataACB(place) {
      if (place.formatted_address) {
        //valid place
        this.$emit("placeChanged", place);
        this.onTextChangeACB(place.formatted_address);
      }
    },
    radiusSliderChangedACB(value) {
      this.$emit("radiusValueChanged", value);
    },
  },
};
</script>
