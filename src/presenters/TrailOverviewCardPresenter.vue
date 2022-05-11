<template>
  <TrailOverviewCard 
    :details="details" 
    @setCurrent="setCurrentTour"
    :addedToFav="addedToFav"
    />
</template>

<script>
import TrailOverviewCard from "../components/TrailOverviewCard.vue";
import { addedToFav } from "../utilities.js";

export default {
  components: { TrailOverviewCard },

  computed: {
    addedToFav() {
      return addedToFav(this.$store, this.details.id);
    },
  },

  methods: {
      setCurrentTour: function (details) {
      this.$emit("setCurrent", details);
    },
  },
};
</script>