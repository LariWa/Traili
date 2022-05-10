<template>
  <v-card elevation="4" @click="setCurrentTour(details)" class="card">
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
    <v-icon v-if="addedToFav" class="mx-3 mb-3 heart" color="pink"
      >mdi-heart</v-icon
    >
    <v-icon v-else class="mx-3 mb-3 heart" color="grey">mdi-heart</v-icon>
    <v-card-title class="card-title">
      {{ details.title }}
    </v-card-title>
    <v-card-text class="d-flex flex-wrap card-text">
      <v-chip
        class="difficulty"
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
      <v-card-text>Time: {{ convertTime(details.time.min) }} h</v-card-text>
      <v-card-text
        >Length: {{ convertDistance(details.length) }} km</v-card-text
      >
      <v-card-text
        >Rating:
        <v-rating
          :value="details.rating.qualityOfExperience"
          background-color="blue-grey lighten-2"
          color="amber"
          dense
          half-increments
          readonly
          small
        ></v-rating>
      </v-card-text>
    </v-card-text>
    <hr />
    <v-card-actions class="mb-8">
      <v-btn text color="blue-grey lighten-2"> Show More </v-btn>
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

  computed: {
    addedToFav() {
      return this.$store.state.favourites.includes(parseInt(this.details.id));
    },
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
