<template>
  <div>
    <span class="font-weight-bold">{{ name }} </span>
    <span class="float-right">
      {{ getValueText() }}
    </span>
    <v-range-slider
      :max="range[1]"
      :min="range[0]"
      :value="values"
      @change="distanceChanged"
    ></v-range-slider>
  </div>
</template>
<script>
export default {
  props: {
    range: Array,
    values: Array,
    name: String,
    unit: String,
  },

  methods: {
    distanceChanged(value) {
      this.$emit("changed", value);
    },
    getValueText() {
      if (this.values.toString() == this.range.toString()) return "any";
      else {
        var text = " from " + this.values[0] + this.unit + " to ";
        if (this.values[1] > this.range[1] - 1) text += this.range[1] - 1 + "+";
        else text += this.values[1];
        text += this.unit;
        return text;
      }
    },
  },
};
</script>
