<template>
  <SnackBar
    @setSnackbarValue="setSnackbarValue"
    :showSnackbar="getSnackbarValue"
    :text="getSnackbarText"
  />
</template>
<script>
import SnackBar from "../components/Snackbar.vue";
import { mapGetters, mapActions } from "vuex";
export default {
  components: {
    SnackBar,
  },
  computed: {
    ...mapGetters(["getSnackbarValue", "getSnackbarText"]),
  },
  methods: {
    ...mapActions(["setSnackbarValue"]),
  },
};
</script>
