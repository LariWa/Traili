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
    <v-snackbar :value="showLogInMessage">
      Please log in to see your favourite trails!
      <template v-slot:action="{ attrs }">
        <v-btn
          color="red"
          text
          v-bind="attrs"
          @click="this.$emit('closeLogInMessage')"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>
<script>
export default {
  props: {
    showLogInMessage: Boolean,
  },
  name: "NavBar",
  emits: ["toLogin", "toSearch", "toFav", "closeLogInMessage"],
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
