<template>
  <div>
    <br />
    <v-divider></v-divider>
    <br />
    <div v-if="results">
      <h1 v-if="Object.keys(results).length > 0">Results</h1>
      <p v-if="this.promiseState.data == null">loading...</p>
      <div v-for="(result, idx) in this.promiseState.data" :key="idx">
        <v-card elevation="2" @click="setCurrentTour(result.id)">
          <v-img
            :src="
              result.primaryImage
                ? 'http://img.oastatic.com/img/' +
                  result.primaryImage.id +
                  '/.jpg'
                : 'https://picsum.photos/id/600/1000/300?grayscale'
            "
            lazy-src="https://picsum.photos/id/11/100/60"
            height="200px"
          >
            <template v-slot:placeholder>
              <v-row class="fill-height ma-0" align="center" justify="center">
                <v-progress-circular
                  indeterminate
                  color="grey lighten-5"
                ></v-progress-circular>
              </v-row>
            </template>
          </v-img>
          <v-card-title>
            {{ result.title }}
          </v-card-title>
          <v-card-subtitle>
            {{ result.shortText }}
          </v-card-subtitle>
          <v-card-text class="d-flex flex-wrap">
            Rating:
            <v-rating
              :value="result.rating.qualityOfExperience"
              color="amber"
              dense
              half-increments
              readonly
              small
            ></v-rating>
          </v-card-text>
          <v-card-actions class="mb-8">
            <v-btn
              text
              color="blue darken-2"
              @click="setCurrentTour(result.id)"
            >
              Show More
            </v-btn>
          </v-card-actions>
        </v-card>
      </div>
    </div>
  </div>
</template>

<script>
import { resolvePromise } from "../resolvePromise.js";
import { getHikeDetails } from "../hikeSource.js";
// import { set } from "vue/types/umd";
export default {
  name: "SearchResultsView",
  props: {
    results: Array,
  },
  data() {
    return {
      tours: [],
      promiseState: { data: [] },
    };
  },
  watch: {
    results() {
      if (this.results) {
        resolvePromise(
          getHikeDetails(this.results.map((item) => item.id)),
          this.promiseState,
          null
        );
      }
    },
  },
  methods: {
    setCurrentTour: function (id) {
      this.$store.commit("setCurrentTourID", id);
      this.$store.dispatch("setCurrentTour");
      console.log("new: " + this.$store.getters.getCurrentTourID);
    },
  },
};
</script>
