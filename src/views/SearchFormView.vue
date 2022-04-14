<template>
  <div>
    <v-row>
      <v-col>
        <v-text-field
          label="search for locations.."
          hide-details="auto"
          @change="onTextChangeACB"
          @keypress="onKeyPressedACB"
        ></v-text-field>
      </v-col>
      <v-col>
        <v-combobox
          :value="selectedCategories"
          :items="categories"
          label="Categories"
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
              label
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
          :input-value="allCategSet"
          @change="allCategChangedACB"
        ></v-checkbox>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-expansion-panels style="max-width: 30vw" :value="openPanels">
          <v-expansion-panel>
            <v-expansion-panel-header> Filter </v-expansion-panel-header>
            <v-expansion-panel-content>
              <v-btn icon @click="clearFiltersACB">
                <v-icon>mdi-replay</v-icon>
              </v-btn>
              <div v-for="slider in this.sliders" :key="slider.name">
                <RangeSlider
                  :range="slider.range"
                  :values="slider.sliderValues"
                  :name="slider.sliderName"
                  :unit="slider.unit"
                  @changed="sliderChangedACB"
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
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-col>
      <v-col>
        <v-select :items="sortCateg" label="Sort by" @change="changeSortByACB">
        </v-select>
      </v-col>
      <v-col>
        <v-btn icon @click="changeSortingOrderACB">
          <v-icon>{{ sortingIcon }}</v-icon>
        </v-btn>
      </v-col>
      <v-col>
        <v-btn id="searchBtn" @click="onSearchACB">Search!</v-btn>
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
    sliders: Array,
    difficulties: Array,
    selectedCategories: Array,
    categories: Array,
    allCategSet: Boolean,
    sortingIcon: String,
    sortCateg: Array,
  },
  data() {
    return {
      openPanels: [],
    };
  },
  emits: [
    "searchTextChanged",
    "search",
    "categoriesChanged",
    "sliderChanged",
    "checkboxChanged",
    "clearFilters",
    "changeSortingOrder",
    "changeSortBy",
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
      this.openPanels = [];
      this.$emit("search");
    },
    onDropDownChangeACB: function (value) {
      this.$emit("categoriesChanged", value);
    },
    sliderChangedACB(value, name) {
      this.$emit("sliderChanged", value, name);
    },
    checkBoxChangedACB(value, name) {
      this.$emit("checkboxChanged", value, name);
    },
    clearFiltersACB() {
      this.$emit("clearFilters");
    },
    allCategChangedACB(value) {
      this.$emit("setAllCategories", value);
    },
    changeSortingOrderACB() {
      this.$emit("changeSortingOrder");
    },
    changeSortByACB(value) {
      this.$emit("changeSortBy", value);
    },
  },
};
</script>
