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
            <span v-if="index === 3" class="grey--text text-caption">
              (+{{ selectedCategories.length - 4 }} others)
            </span>
          </template>
        </v-combobox>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-expansion-panels style="max-width: 30vw" :value="openPanels">
          <v-expansion-panel>
            <v-expansion-panel-header> Filter </v-expansion-panel-header>
            <v-expansion-panel-content>
              <!-- TODO how to update slider while moving?  -->
              <div v-for="slider in this.sliders" :key="slider.name">
                <RangeSlider
                  :range="slider.range"
                  :values="slider.sliderValues"
                  :name="slider.sliderName"
                  :unit="slider.unit"
                  @changed="sliderChangedACB"
                />
              </div>

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
  },
};
</script>
