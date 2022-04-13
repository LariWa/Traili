<template>
  <div>
    <span>{{ name }} </span>
    <span class="text-caption">in {{ unit }}</span>
    <span class="float-right">
      {{ getValueText() }}
    </span>
    <v-range-slider
      :max="range[1]"
      :min="range[0]"
      :value="values"
      @input="changed"
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
    changed(value) {
      this.$emit("changed", value, this.name);
    },
    getValueText() {
      if (this.values.toString() == this.range.toString()) return "any";
      else if (this.values[0] == this.values[1]) {
        if (this.values[0] == this.range[1])
          return this.range[1] - 1 + "+" + this.unit;
        else return this.values[0] + this.unit;
      } else {
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
