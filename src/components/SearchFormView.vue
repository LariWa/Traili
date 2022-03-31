<template>
  <div>
    <v-text-field
      label="search for locations.."
      hide-details="auto"
      @change="onTextChangeACB"
      @keypress="onKeyPressedACB"
    ></v-text-field>
    <v-combobox
      :value="categories"
      :items="categories"
      label="Categories"
      multiple
      chips
      @change="onDropDownChangeACB"
    >
      <template v-slot:selection="{ attrs, item, parent, selected }">
        <v-chip
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
      </template>
    </v-combobox>
    <v-expansion-panels>
      <v-expansion-panel>
        <v-expansion-panel-header> Filter </v-expansion-panel-header>
        <v-expansion-panel-content>
          <!-- TODO how to update slider while moving  -->
          <!-- warning: Instance uid=1:147 not found? -->
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
          <v-checkbox
            label="easy"
            color="red"
            value="0"
            hide-details
          ></v-checkbox>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>

    <v-btn id="searchBtn" @click="onSearchACB">Search!</v-btn>
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
      difficulties: ["easy", "moderate", "difficult"],
    };
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
      console.log(event);
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
