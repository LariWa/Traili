<template>
  <div>
    <div v-if="results.data" >
    <div v-for="(result, idx) in results.data.data" :key="idx">
      <p>{{result}}</p>
    </div>
  </div>
  </div>
</template>

<script>
  export default {
    name: "SearchResultsView",
    props: {
      results: Object
    },
  }

  //TODO: get details of each hike and display as cards

</script>
