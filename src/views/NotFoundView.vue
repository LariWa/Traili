<template>
  <div>
    <h2>Ooopps!</h2>
    <p>Looks like you are lost!</p>
    <button @click="goToExplore">Go back to Landing Page</button>
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
