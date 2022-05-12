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
                : 'https://picsum.photos/id/600/1000/300?grayscale'
            "
            lazy-src="https://picsum.photos/id/11/100/300?grayscale"
          >
            <v-overlay absolute>
              <h1 align="center" justify="center">{{ trailInfo.title }}</h1>
            </v-overlay>
          </v-parallax>
        </v-col>
      </v-row>

      <!--src="https://cdn.vuetifyjs.com/images/parallax/material2.jpg"-->

      <v-row class="ml-auto mr-auto col-10">
        <v-col cols="6" md="3">
          <v-card class="white">
            <v-img
              style="margin: auto"
              max-height="60px"
              max-width="60px"
              src="https://www.iconpacks.net/icons/1/free-time-icon-968-thumb.png"
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
          <v-card class="white">
            <v-img
              style="margin: auto"
              max-height="60px"
              max-width="60px"
              src="https://static.thenounproject.com/png/2325457-200.png"
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
          <v-card class="white">
            <v-img
              style="margin: auto"
              max-height="60px"
              max-width="60px"
              src="https://static.thenounproject.com/png/209086-200.png"
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
          <v-card class="white">
            <v-img
              style="margin: auto"
              max-height="60px"
              max-width="60px"
              src="https://static.thenounproject.com/png/209086-200.png"
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

      <v-row class="ml-auto mr-auto col-10" wrap>
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
              <div class="mb-3">
                Highest point: {{ trailInfo.elevation.maxAltitude }} m
              </div>
              <div class="mt-3 mb-3">
                Lowest point: {{ trailInfo.elevation.minAltitude }} m
              </div>
              <div class="mt-3 mb-3">
                Difficulty:
                <v-chip
                  :color="
                    trailInfo.rating.difficulty == 1
                      ? 'green'
                      : trailInfo.rating.difficulty == 2
                      ? 'yellow darken-2'
                      : trailInfo.rating.difficulty == 3
                      ? 'red'
                      : 'grey darken-1'
                  "
                  dark
                  small
                >
                  {{ getDifficulty(trailInfo.rating.difficulty) }}
                </v-chip>
              </div>
              <div class="mt-3">
                Quality of experience:
                <v-rating
                  :value="trailInfo.rating.qualityOfExperience"
                  background-color="blue-grey lighten-2"
                  color="amber"
                  dense
                  half-increments
                  readonly
                  small
                >
                </v-rating>
              </div>
              <br />
              <v-btn
                v-if="addedToFav"
                class="mx-2"
                fab
                dark
                small
                color="pink"
                @click="removeFromFavACB()"
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
                @click="addToFavACB()"
              >
                <v-icon dark>mdi-heart</v-icon>
              </v-btn>
              <v-label v-if="addedToFav"> Remove from favourites </v-label>
              <v-label v-else> Add to favourites </v-label>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
      <v-row class="ml-auto mr-auto col-10" wrap>
        <v-col cols="12" md="6">
          <v-card>
            <v-carousel height="auto" v-if="trailInfo.images">
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
        <v-col cols="12" md="6">
          <v-card>
            <VueWeather></VueWeather>
          </v-card>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
import VueWeather from "../presenters/weatherPresenter.vue";
import { convertDistance, convertTime, getDifficulty } from "../utilities";

export default {
  components: {
    VueWeather,
  },
  props: {
    trail: Array,
    trailInfo: Object,
    addedToFav: Boolean,
  },

  methods: {
    convertDistance,
    convertTime,
    getDifficulty,
    backACB: function () {
      this.$emit("goBack");
    },
    addToFavACB: function () {
      this.$emit("addToFav", this.trailInfo.id);
    },
    removeFromFavACB: function () {
      this.$emit("removeFromFav", this.trailInfo.id);
    },
    removeHTML: function (str) {
      var tmp = document.createElement("DIV");
      tmp.innerHTML = str;
      return tmp.textContent || tmp.innerText || "";
    },
  },
};
</script>