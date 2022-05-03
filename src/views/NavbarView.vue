<template>
  <div>
    <v-app-bar app color="primary" dark>
      <v-toolbar-title @click="goToSearch">Trail Planner</v-toolbar-title
      ><v-spacer></v-spacer>
      <v-btn icon @click="goToSearch">
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
      <v-btn icon @click="goToFavourites"> <v-icon>mdi-heart</v-icon> </v-btn>

      <v-btn icon @click="goToLogin">
        <v-icon>mdi-account-circle </v-icon>
      </v-btn>
    </v-app-bar>
  </div>
</template>
<script>
export default {
  name: "NavbarView",
  emits: ["toLogin", "toSearch", "toFav"],
  methods: {
    goToFavourites: function () {
      this.$emit("toFav");
    },
    goToSearch: function () {
      this.$emit("toSearch");
    },
    goToLogin: function () {
      this.$emit("toLogin");
    },      
  },
};
</script>
