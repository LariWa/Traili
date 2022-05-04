<template>
  <div>
    <h1>{{ headline }}</h1>
    <p v-if="results.length == 0 && searchText == ''">Are you looking for your next adventure?</p>
    <p v-else-if="results.length == 0 && searchText !='' && state.data == null">loading...</p>
    <p v-else-if="results.length == 0">no data availaible</p>
    <p v-else-if="details == null">loading...</p>
    <v-row v-if="details != null && results.length != 0" class="masonry">
    <div class="col-sm-12 col-md-4 col card" v-for="(detail, idx) in pagedAssets" :key="idx">
      <TrailOverviewCard
        :details="detail"
        @setCurrent="setCurrentTour"
      ></TrailOverviewCard>   
    </div>
    </v-row>
    <v-pagination
      v-model="page"
      :length="numPages"
    ></v-pagination>
  </div>
</template>

<script>
import TrailOverviewCard from "../components/TrailOverviewCard.vue";
import Masonry from 'masonry-layout'

export default {
  name: "TrailsOverview",
  components: { TrailOverviewCard },
  data () {
      return {
        page: 1,
        pageSize: 21,
      }
    },
  props: {
    headline: String,
    results: Array,
    details: Array,//display doesn't change with props, don't know why?????????
    searchText: String,
    state: Object,
  },
  updated() {
    this.createMasonry();
  },
  mounted: function () {
      this.createMasonry();
  },
  computed: {
    numPages() {
      return Math.ceil(this.details.length / this.pageSize);
    },
    pagedAssets() {
      const startIndex = (this.page - 1) * this.pageSize;
      const data = [...this.details];
      return data.splice(startIndex, this.pageSize);
    },
  },
  methods: {
    setCurrentTour: function (details) {
      this.$emit("setCurrent", details);
    },
    createMasonry: function () {
      this.masonry = new Masonry( '.masonry', {
        itemSelector: "[class*='col-']",
      });
    },
  },
};
</script>
