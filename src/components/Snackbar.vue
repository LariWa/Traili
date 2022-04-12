<template>
  <v-snackbar :value="showSnackbar" @input="updateValue">
    {{ text }}
    <template v-slot:action="{ attrs }">
      <v-btn color="red" text v-bind="attrs" @click="updateValue(false)">
        Close
      </v-btn>
    </template>
  </v-snackbar>
</template>
<script>
export default {
  name: "SnackBar",
  props: {
    showSnackbar: Boolean,
    text: String,
  },
  emits: ["setSnackbarValue"],
  methods: {
    updateValue(value) {
      this.$emit("setSnackbarValue", value);
    },
  },
};
</script>
