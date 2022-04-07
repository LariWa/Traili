<template>
  <div>
    <v-btn class="ml-2 mb-10" small @click="backToSearchACB">
      Go Back to Search
    </v-btn>

    <v-container v-if="trailInfo">
      <h1 class="mb-5">{{ trailInfo.title }}</h1>
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
              style="color: #2196f3"
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
              style="color: #2196f3"
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
              style="color: #2196f3"
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
              style="color: #2196f3"
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
              <v-btn rounded small id="addToFav" @click="addToFavACB">
                Add to Fav
              </v-btn>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
      <v-row wrap>
        <v-col cols="12" md="6">
          <VueWeather></VueWeather>
        </v-col>

        <v-col cols="12" md="6">
          <v-card>
            <v-carousel height="300px" v-if="trailInfo.images">
              <v-carousel-item
                v-for="(item, i) in trailInfo.images.image"
                :key="i"
                :src="'http://img.oastatic.com/img/' + item.id + '/.jpg'"
                reverse-transition="fade-transition"
                transition="fade-transition"
              ></v-carousel-item>
            </v-carousel>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<!--:src="item.src"-->

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
    };
  },
  components: {
    VueWeather,
    StarRating,
  },

  props: ["trail"],
  computed: {
    trailInfo() {
      return this.$store.getters.getCurrentTour;
    },
  },

  methods: {
    convertDistance,
    convertTime,
    getDifficulty,

    backToSearchACB: function () {
      this.$emit("returnToSearch");
    },
    addToFavACB: function () {
      this.$emit("addToFav", this.trailInfo);
    },

    /*strippedContent: function(string) {
                return string.replace(/<\/?[^>]+(>|$)/g, "");
            },*/

    removeHTML: function (str) {
      var tmp = document.createElement("DIV");
      tmp.innerHTML = str;
      return tmp.textContent || tmp.innerText || "";
    },
  },
};
</script>

<!--<style scoped lang="scss">
    .details {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    }
</style>-->

<!--<div v-if="trail" class="trail-details">

        <h3 class="sth">{{trail.name}}</h3>

        <p class="desciption">Description: {{trail.desciption}}</p>

        <button class="view-product-button" @click="Semit('view-product', product)">View</button>

    </div>

    computed: {
        description() {
        return this.product.description.substring(0, 150)
        }
    }


    <div v-for="(element, index) in trailInfo.wayType.elements" :key="index">
        {{ element.title }}
        </div>

    {{trailInfo.wayType.elements[0].title}}
    -->
