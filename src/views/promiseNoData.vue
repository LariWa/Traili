<template>
  <div v-if="!promiseState || !promiseState.promise" class="no-data">
    {{ noDataString }}
  </div>
  <div v-else-if="promiseState.error" class="error">
    {{ promiseState.error }}
  </div>
  <!-- TODO add loading gif -->
  <div v-else-if="!promiseState.data" class="loading">Loading...</div>
  <div v-else>
    <slot />
  </div>
</template>

<script>
export default {
  props: { promiseState: Object, noDataString: String },
};
</script>
