<!-- warning: Instance uid=1:147 not found? -->

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
        <v-expansion-panels style="max-width: 30vw">
          <v-expansion-panel>
            <v-expansion-panel-header> Filter </v-expansion-panel-header>
            <v-expansion-panel-content>
              <!-- TODO how to update slider while moving  -->
              <RangeSlider
                :range="distanceRange"
                :values="distanceValues"
                name="Distance"
                unit="km"
                @changed="distanceChanged"
              />
              <RangeSlider
                :range="durationRange"
                :values="durationValues"
                name="Duration"
                unit="h"
                @changed="durationChanged"
              />
              <RangeSlider
                :range="ascentRange"
                :values="ascentValues"
                name="Ascent"
                unit="m"
                @changed="ascentChanged"
              />
              <div v-for="difficulty in difficulties" :key="difficulty.name">
                <v-checkbox
                  :label="difficulty.name"
                  :value="difficulty.value"
                  :color="difficulty.color"
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
import RangeSlider from "./rangeSlider.vue";
export default {
  components: {
    RangeSlider,
  },
  data() {
    return {
      //TODO move to presenter?
      distanceRange: [0, 101],
      distanceValues: [0, 101],
      durationRange: [0, 13],
      durationValues: [0, 13],
      ascentRange: [0, 1501],
      ascentValues: [0, 1501],
      difficulties: [
        { name: "easy", value: 0, color: "green" },
        { name: "moderate", value: 1, color: "yellow darken-2" },
        { name: "difficult", value: 2, color: "red darken-4" },
      ],
      selectedCategories: [],
    };
  },
  watch: {
    categories() {
      console.log("changed");
      this.selectedCategories = this.categories;
    },
  },
  computed: {
    categories() {
      return this.$store.getters.getCategories.map((item) => item.name);
    },
  },
  methods: {
    onTextChangeACB: function (text) {
      this.$emit("searchTextChanged", text);
    },
    onKeyPressedACB: function (event) {
      //console.log(event);
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
      this.selectedCategories = value;
      this.$emit("categoryChanged", this.categoryNamesToIds(value));
    },
    categoryNamesToIds(names) {
      return this.$store.getters.getCategories
        .filter((category) => names.includes(category.name))
        .map((item) => item.id);
    },
    distanceChanged(value) {
      console.log(value);
      this.distanceValues = value;
    },
    durationChanged(value) {
      console.log(value);
      this.durationValues = value;
    },
    ascentChanged(value) {
      console.log(value);
      this.ascentValues = value;
    },
  },
};
</script>
