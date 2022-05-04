<template>
  <div class="detail-container">
    <v-btn class="ml-2 mb-10 back-button" small @click="backACB">
      Go Back
    </v-btn>

    <div v-if="trailInfo">
      <v-row>
        <v-col cols="12">
          <v-parallax
            height="300"
            max-width="100%"
            :src="
              trailInfo.primaryImage
                ? 'http://img.oastatic.com/img/' +
                  trailInfo.primaryImage.id +
                  '/.jpg'
                : 'placeholderImage.jpg'
            "
            lazy-src="https://picsum.photos/id/11/100/60"
          >
            <!--<v-overlay absolute :value="overlay">-->
            <h1 align="center" justify="center">{{ trailInfo.title }}</h1>
            <!--</v-overlay>-->
          </v-parallax>
        </v-col>
      </v-row>

      <!--src="https://cdn.vuetifyjs.com/images/parallax/material2.jpg"-->

      <v-row class="white" wrap>
        <v-col cols="6" md="3">
          <v-card class="white" flat>
            <v-img
              style="margin: auto"
              max-height="60px"
              max-width="60px"
              :src="iconOne"
            ></v-img>
            <v-card-text
              class="text-center font-weight-medium"
              v-if="trailInfo.time"
            >
              <div>Time: {{ convertTime(trailInfo.time.min) }} h</div>
            </v-card-text>
          </v-card>
        </v-col>

        <v-col cols="6" md="3">
          <v-card class="white" flat>
            <v-img
              style="margin: auto"
              max-height="60px"
              max-width="60px"
              :src="iconTwo"
            ></v-img>
            <v-card-text
              class="text-center font-weight-medium"
              v-if="trailInfo.length"
            >
              <div>Length: {{ convertDistance(trailInfo.length) }} km</div>
            </v-card-text>
          </v-card>
        </v-col>

        <v-col cols="6" md="3">
          <v-card class="white" flat>
            <v-img
              style="margin: auto"
              max-height="60px"
              max-width="60px"
              :src="iconThree"
            ></v-img>
            <v-card-text
              class="text-center font-weight-medium"
              v-if="trailInfo.elevation"
            >
              <div>Ascent: {{ trailInfo.elevation.ascent }} m</div>
            </v-card-text>
          </v-card>
        </v-col>

        <v-col cols="6" md="3">
          <v-card class="white" flat>
            <v-img
              style="margin: auto"
              max-height="60px"
              max-width="60px"
              :src="iconThree"
            ></v-img>
            <v-card-text
              class="text-center font-weight-medium"
              v-if="trailInfo.elevation"
            >
              <div>Descent: {{ trailInfo.elevation.descent }} m</div>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>

      <v-row wrap>
        <v-col cols="12" md="9">
          <v-card>
            <v-card-text v-if="trailInfo.longText">
              <h2>The Route Details</h2>
              <br />
              <div>{{ removeHTML(trailInfo.longText) }}</div>
            </v-card-text>
            <v-card-text v-else>
              <div>No description available</div>
            </v-card-text>
          </v-card>
        </v-col>

        <v-col cols="12" md="3">
          <v-card>
            <v-card-text v-if="trailInfo.rating">
              <h3>Additional Details</h3>
              <br />
              <div>Highest point: {{ trailInfo.elevation.maxAltitude }} m</div>
              <div>Lowest point {{ trailInfo.elevation.minAltitude }} m</div>
              <div>
                Difficulty: {{ getDifficulty(trailInfo.rating.difficulty) }}
              </div>
              <div>
                Quality of experience:
                <star-rating
                  :inline="true"
                  :star-size="20"
                  :read-only="true"
                  :show-rating="false"
                  v-bind:max-rating="6"
                  v-bind:rating="trailInfo.rating.qualityOfExperience"
                >
                </star-rating>
                <!--If you want to pass all the properties of an object as props, you can use v-bind without an argument-->
              </div>
              <br />
              <v-btn
                v-if="addedToFav"
                class="mx-2"
                fab
                dark
                small
                color="pink"
                @click="
                  removeFromFavACB();
                  snackbar = true;
                "
              >
                <v-icon dark>mdi-heart</v-icon>
              </v-btn>
              <v-btn
                v-else
                class="mx-2"
                fab
                dark
                small
                color="grey"
                @click="
                  addToFavACB();
                  snackbar = true;
                "
              >
                <v-icon dark>mdi-heart</v-icon>
              </v-btn>
              <v-snackbar v-model="snackbar" :timeout="timeout">
                {{ text }}

                <template v-slot:action="{ attrs }">
                  <v-btn
                    color="blue"
                    text
                    v-bind="attrs"
                    @click="snackbar = false"
                  >
                    Close
                  </v-btn>
                </template>
              </v-snackbar>
              <v-btn fab x-small dark @click="backToSearchACB"> x </v-btn>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
      <v-row wrap>
        <v-col cols="12" md="12">
          <v-card>
            <v-carousel height="300px" v-if="trailInfo.images">
              <v-carousel-item
                v-for="(item, i) in trailInfo.images.image"
                :key="i"
                reverse-transition="fade-transition"
                transition="fade-transition"
              >
                <v-img
                  :src="'http://img.oastatic.com/img/' + item.id + '/.jpg'"
                  lazy-src="https://picsum.photos/id/11/100/60"
                >
                  <template v-slot:placeholder>
                    <v-row
                      class="fill-height ma-0"
                      align="center"
                      justify="center"
                    >
                      <v-progress-circular
                        indeterminate
                        color="grey lighten-5"
                      ></v-progress-circular>
                    </v-row>
                  </template>
                </v-img>
              </v-carousel-item>
            </v-carousel>
          </v-card>
        </v-col>
      </v-row>

      <v-col cols="12" md="6">
        <VueWeather></VueWeather>
      </v-col>

      <v-row>
        <v-col cols="12" md="6">
          <p>Best time of year:</p>
          <v-card class="d-flex justify-space-around mb-6">
            <div v-for="(season, index) in trailInfo.season" :key="index">
              {{ index }}
              <div v-if="season === true" class="green--text">{{ index }}</div>
            </div>
          </v-card>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
//import trailData from "./TourDetailsExample.json";
import VueWeather from "../presenters/weatherPresenter.vue";
import StarRating from "vue-star-rating";
import { convertDistance, convertTime, getDifficulty } from "../utilities";

export default {
  data() {
    return {
      //trailInfo: trailData.tour[0],
      //trailInfo: this.$store.state.currentTour,
      iconOne: "https://www.iconpacks.net/icons/1/free-time-icon-968-thumb.png",
      iconTwo: "https://static.thenounproject.com/png/2325457-200.png",
      iconThree: "https://static.thenounproject.com/png/209086-200.png",
      snackbar: false,
      text: "",
      timeout: 2000,
    };
  },
  components: {
    VueWeather,
    StarRating,
  },
  props: {
    trail: Array,
  },

  computed: {
    trailInfo() {
      return this.$store.getters.getCurrentTour;
    },
    addedToFav() {
      // var found = this.$store.state.favourites.includes(this.trailInfo.id);
      /* it goes to indej.js in store to favourites -> find an element and compare id with the current id*/

      if (this.$store.state.favourites.includes(parseInt(this.trailInfo.id))) {
        return true;
      }
      return false;
    },
  },

  methods: {
    convertDistance,
    convertTime,
    getDifficulty,

    backACB: function () {
      this.$emit("goBack");
    },
    addToFavACB: function () {
      this.text = "Trail added to favourites";
      this.$emit("addToFav", this.trailInfo.id);
    },
    removeFromFavACB: function () {
      this.text = "Trail removed from favourites";
      this.$emit("removeFromFav", this.trailInfo.id);
    },
    removeHTML: function (str) {
      var tmp = document.createElement("DIV");
      tmp.innerHTML = str;
      return tmp.textContent || tmp.innerText || "";
    },
    dificulty: function (value) {
      if (value == 1) {
        return "easy";
      } else if (value == 2) {
        return "moderate";
      } else if (value == 3) {
        return "difficult";
      } else {
        return "difficulty unknown";
      }
    },
  },
};
</script>

<!--
    <div v-for="(element, index) in trailInfo.wayType.elements" :key="index">
        {{ element.title }}
        </div>

    {{trailInfo.wayType.elements[0].title}}
//splice() method changes the contents of an array by removing or replacing existing elements
//indexOf() method returns the first index at which a given element can be found in the array, or -1 if it is not present.
if (this.$store.state.favourites.indexOf(found) != -1)

state.favourites.splice(state.favourites.indexOf(found), 1); => remove one element
    -->
