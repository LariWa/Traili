<template>
  <v-app-bar app color="primary" dark>
    <v-toolbar-title @click="goToSearch">Trail Planner</v-toolbar-title
    ><v-spacer></v-spacer>
    <v-btn icon @click="goToSearch">
      <v-icon>mdi-magnify</v-icon>
    </v-btn>
    <v-btn icon @click="goToFavourites"> <v-icon>mdi-heart</v-icon> </v-btn>

    <v-btn icon>
      <v-icon>mdi-account-circle </v-icon>
    </v-btn>
  </v-app-bar>
</template>
<script>
export default {
  name: "NavBar",
  methods: {
    goToFavourites: function () {
      this.$router.push("/Favourites");
    },
    goToSearch: function () {
      this.$router.push("/Search");
    },
  },
};
</script>
