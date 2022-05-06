<template>
  <div class="no-data" v-if="!promiseState || !promiseState.promise">
    {{ actionNotStartedString }}
  </div>
  <div v-else-if="promiseState.error">
    <v-alert type="error">
      <h3>Sorry! Something went wrong loading the requested data.</h3>
      Error message: {{ promiseState.error }}
    </v-alert>
  </div>
  <div v-else-if="promiseState.data && promiseState.data.length == 0">
    <v-alert type="info">
      {{ noDataString }}
    </v-alert>
  </div>
  <!-- TODO add loading gif -->
  <div v-else-if="!promiseState.data" class="loading">Loading...</div>
  <div v-else>
    <slot />
  </div>
</template>

<script>
export default {
  props: {
    promiseState: Object,
    actionNotStartedString: String,
    noDataString: String,
  },
};
</script>
