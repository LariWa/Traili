<template>
  <div>
    <v-container v-if="trailInfo">
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
              <div>Length: {{ conversion(trailInfo.length) }} km</div>
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
            <v-card-text v-else>
              <div>No description</div>
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
                Difficulty: {{ dificulty(trailInfo.rating.difficulty) }}
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

              <v-btn v-if="addedToFav" class="mx-2" fab dark small color="pink" @click="removeFromFavACB(); snackbar = true">
                <v-icon dark>mdi-heart</v-icon>
              </v-btn>
              <v-btn v-else class="mx-2" fab dark small color="grey" @click="addToFavACB(); snackbar = true">
                <v-icon dark>mdi-heart</v-icon>
              </v-btn>

              <v-snackbar
                v-model="snackbar"
                :timeout="timeout"
              >
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

              <!--if added color="pink" if taken out grey-->
              <!--if taken out display pop-up trail taken out-->

              <v-btn fab x-small dark @click="backToSearchACB"> x </v-btn>
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
              >
              
               <!-- <template v-slot:placeholder>
              <v-row class="fill-height ma-0" align="center" justify="center">
                <v-progress-circular
                  indeterminate
                  color="grey lighten-5"
                ></v-progress-circular>
              </v-row>
            </template>-->
             

              </v-carousel-item>
            </v-carousel>
          </v-card>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12">
          <v-card>
            <div v-for="(season, index) in trailInfo.season" :key="index">{{ index }}</div>
          </v-card>
        </v-col>
      </v-row>

    </v-container>
  </div>
</template>

<script>
//import trailData from "./TourDetailsExample.json";
import VueWeather from "../presenters/weatherPresenter.vue";
import StarRating from "vue-star-rating";

export default {
  data() {
    return {
      //trailInfo: trailData.tour[0],
      //trailInfo: this.$store.state.currentTour,
      iconOne: "https://www.iconpacks.net/icons/1/free-time-icon-968-thumb.png",
      iconTwo: "https://static.thenounproject.com/png/2325457-200.png",
      iconThree: "https://static.thenounproject.com/png/209086-200.png",
      snackbar: false,
      text: '',
      timeout: 1000,
    };
  },
  components: {
    VueWeather,
    StarRating,
  },

  //props: ["trail"],
  props: {
    trail: Array,
  },
  
  computed: {
    trailInfo() {
      return this.$store.getters.getCurrentTour;
    },
    addedToFav() {
      var found = this.$store.state.favourites.find(element => element.id === this.trailInfo.id);
      /*state: {
          favourites: [], //array of objects
          currentTourID: "",
          categoriesPromiseState: { data: [] },
          currentTourPromiseState: { data: [] },
        }, 
        in index.js*/
      
      if (this.$store.state.favourites.indexOf(found) != -1) {
        return true;
      }

      return false;
    }
  },

  methods: {
    conversion: function (length) {
      var formattedNumber = length / 1000;
      return formattedNumber.toFixed(1);
    },
    convertTime: function (min) {
      var hours = min / 60;
      var h = Math.floor(hours);
      var minutes = (hours - h) * 60;
      var m = Math.floor(minutes);

      return `${this.twoDigits(h)}:${this.twoDigits(m)}`;
    },
    twoDigits: function (num) {
      return num.toString().padStart(2, "0");
    },

    backToSearchACB: function () {
      this.$emit("returnToSearch");
    },
    addToFavACB: function () {
      this.text = 'Trail added to favourites';
      this.$emit("addToFav", this.trailInfo);
    },

    removeFromFavACB: function() {
      this.text = 'Trail removed from favourites';
      this.$emit("removeFromFav", this.trailInfo);
    },

    /*strippedContent: function(string) {
            return string.replace(/<\/?[^>]+(>|$)/g, "");
        },*/

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
    -->
