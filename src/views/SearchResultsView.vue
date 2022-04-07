<template>

  <div>
    <br />
    <v-divider></v-divider>
    <br />
    <div v-if="results">
      <h1 v-if="Object.keys(results).length > 0">Results</h1>
      <p v-if="details == null">loading...</p>
      <div v-for="(result, idx) in details" :key="idx">
        <v-card elevation="2" @click="setCurrentTour(result.id)">
          <v-img :src="
                  result.primaryImage
                    ? 'http://img.oastatic.com/img/' +
                      result.primaryImage.id +
                      '/.jpg'
                    : 'https://picsum.photos/id/600/1000/300?grayscale'
                "
                 lazy-src="https://picsum.photos/id/11/100/60"
                 height="200px">
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
            <v-rating :value="result.rating.qualityOfExperience"
                      color="amber"
                      dense
                      half-increments
                      readonly
                      small></v-rating>
            <p class="ml-3 mr-3">-</p>
            <p> Time: {{ convertTime(result.time.min) }} h</p>
            <p class="ml-3 mr-3">-</p>
            <p> Length: {{ convertDistance(result.length) }} km</p>
            <p class="ml-3 mr-3">-</p>
            <v-chip :color="result.rating.difficulty == 1 ? 'green' : result.rating.difficulty == 2 ? 'yellow darken-2' : result.rating.difficulty == 3 ? 'red' : 'grey darken-1'"
                    dark
                    small>
              {{ getDifficulty(result.rating.difficulty) }}
            </v-chip>
          </v-card-text>
          <v-card-actions class="mb-8">
            <v-btn text
                   color="blue darken-2"
                   @click="setCurrentTour(result.id)">
              Show More
            </v-btn>
          </v-card-actions>
        </v-card>
      </div>
    </div>
  </div>

</template>

<script>

  import { convertDistance, convertTime, getDifficulty } from '../utilities'
  export default {
    name: 'SearchResultsView',
    props: {
      results: Array,
      details: Array
    },
    methods: {
      convertDistance,
      convertTime,
      getDifficulty,

      setCurrentTour: function(id) {
        this.$emit('setCurrent', id)
      }
    }
  }

</script>
