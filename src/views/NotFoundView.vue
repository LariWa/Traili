<template>
  <div class="not-found">
    <h2>Ooopps!</h2>
    <p>Looks like you are lost!</p>
    <v-btn @click="goToExplore">Go back to Landing Page</v-btn>
  </div>
</template>
<script>
export default {
  name: "NotFound",
  emits: ["toExplore"],
  methods: {
    goToExplore: function () {
      this.$emit("toExplore");
    },
  },
};
</script>
