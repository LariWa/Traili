<template>
  <v-card elevation="2" @click="setCurrentTour(details)">
    <v-img
      :src="
        details.primaryImage
          ? 'http://img.oastatic.com/img/' + details.primaryImage.id + '/.jpg'
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
      {{ details.title }}
    </v-card-title>
    <v-card-subtitle v-html="details.shortText">
      <!-- {{ details.shortText }} -->
    </v-card-subtitle>
    <v-card-text class="d-flex flex-wrap">
      Rating:
      <v-rating
        :value="details.rating.qualityOfExperience"
        color="amber"
        dense
        half-increments
        readonly
        small
      ></v-rating>
      <p class="ml-3 mr-3">-</p>
      <p>Time: {{ convertTime(details.time.min) }} h</p>
      <p class="ml-3 mr-3">-</p>
      <p>Length: {{ convertDistance(details.length) }} km</p>
      <p class="ml-3 mr-3">-</p>
      <v-chip
        :color="
          details.rating.difficulty == 1
            ? 'green'
            : details.rating.difficulty == 2
            ? 'yellow darken-2'
            : details.rating.difficulty == 3
            ? 'red'
            : 'grey darken-1'
        "
        dark
        small
      >
        {{ getDifficulty(details.rating.difficulty) }}
      </v-chip>
    </v-card-text>
    <v-card-actions class="mb-8">
      <v-btn text color="blue darken-2"> Show More </v-btn>
    </v-card-actions>
  </v-card>
</template>
<script>
import { convertDistance, convertTime, getDifficulty } from "../utilities";
export default {
  name: "TrailOverviewCard",
  props: {
    details: Object,
  },
  methods: {
    convertDistance,
    convertTime,
    getDifficulty,

    setCurrentTour: function (details) {
      this.$emit("setCurrent", details);
    },
  },
};
</script>
