<template>
<div>
  <div v-if="results.data">
    <h1>Results</h1>
    <div v-for="(result, idx) in results.data" :key="idx">
        <v-card elevation="2">
            <v-img src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
                   height="200px"></v-img>
            <v-card-title @click="setCurrentACB">
                {{result}}
            </v-card-title>
            <v-card-subtitle>
                Tour Description
            </v-card-subtitle>
        </v-card>
    </div>
  </div>
</div>
</template>

<script>
import { resolvePromise } from "../resolvePromise.js";
import { getHikeDetails } from "../hikeSource.js";
export default {
  name: "SearchResultsView",
  props: {
    results: Object
  },
  data() {
    return {
      tours: {},
      promiseState: {},
    };
  },
  mounted() {
  },
  watch: {
  },
  methods: {
    getDetails: function () {
        resolvePromise(getHikeDetails(this.results.data), this.promiseState, null);
      },
      setCurrentACB: function (id) {
        const newID = (id.target.firstChild.data).replace(/[^0-9]/ig, "");
        this.$emit("clickTour", newID);

      },
  }
}

//TODO: get details of each hike and display as cards
</script>
