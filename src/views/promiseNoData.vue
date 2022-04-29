<template>
  <div v-if="!promiseState || !promiseState.promise">{{ noDataString }}</div>
  <div v-else-if="promiseState.error">{{ promiseState.error }}</div>
  <!-- TODO add loading gif -->
  <div v-else-if="!promiseState.data">Loading</div>
  <div v-else>
    <slot />
  </div>
</template>

<script>
export default {
  props: { promiseState: Object, noDataString: String },
};
</script>
