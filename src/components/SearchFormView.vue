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
          <p>
            Distance from {{ distanceValues[0] }} to
            {{ distanceValues[1] > 100 ? "any" : distanceValues[1] }}
          </p>
          <v-range-slider
            :max="distanceRange[1]"
            :min="distanceRange[0]"
            :value="distanceValues"
            @end="distanceChanged"
          ></v-range-slider>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>

    <v-btn id="searchBtn" @click="onSearchACB">Search!</v-btn>
  </div>
</template>

<script>
export default {
  data() {
    return { distanceRange: [0, 101], distanceValues: [0, 101] };
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
  },
};
</script>
