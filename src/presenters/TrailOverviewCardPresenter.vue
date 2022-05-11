<template>
  <TrailOverviewCard
    :details="details"
    @setCurrent="setCurrentACB"
    :addedToFav="addedToFav"
  />
</template>

<script>
import TrailOverviewCard from "../components/TrailOverviewCard.vue";
import { addedToFav } from "../utilities.js";
import { setCurrentTour } from "@/utilities";

export default {
  props: {
    details: Object,
  },
  components: { TrailOverviewCard },

  computed: {
    addedToFav() {
      return addedToFav(this.$store, this.details.id);
    },
  },
  methods: {
    setCurrentACB() {
      setCurrentTour(this.details, this);
    },
  },
};
</script>
