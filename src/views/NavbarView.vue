<template>
  <div>
    <v-app-bar class="nav-bar" app color="primary" dark>
      <v-toolbar-title class="nav-bar-title" @click="goToExplore"
        ><img src="../assets/logo.svg" />Traili</v-toolbar-title
      ><v-spacer></v-spacer>
      <v-btn icon @click="goToSearch">
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
      <v-btn icon @click="goToFavourites">
        <v-icon>mdi-heart</v-icon>
      </v-btn>

      <login-presenter v-if="!loggedIn" />
      <logout-presenter v-if="loggedIn" />
    </v-app-bar>
  </div>
</template>
<script>
import loginPresenter from "../presenters/loginPresenter.vue";
import logoutPresenter from "../presenters/logoutPresenter.vue";

export default {
  components: { loginPresenter, logoutPresenter },
  name: "NavbarView",
  emits: ["toSearch", "toFav", "toExplore"],

  props: {
    loggedIn: Boolean,
  },

  methods: {
    goToFavourites: function () {
      this.$emit("toFav");
    },
    goToSearch: function () {
      this.$emit("toSearch");
    },
    goToExplore: function () {
      this.$emit("toExplore");
    },
  },
};
</script>
