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

      <v-btn v-if="loggedIn" icon @click="setShowLoggedInViewACB(true)">
        <v-icon>mdi-account-circle </v-icon>
      </v-btn>
      <login-view
        v-if="!loggedIn"
        @emailTextChanged="onEmailChangeACB"
        @pswTextChanged="onPswChangeACB"
        @onCreate="onCreateACB"
        @onLogin="onLoginACB"
        @setShowLogIn="setShowLogInACB"
        @onLogOut="onLogOutACB"
        :textStatus="''"
        :showLogInPopUp="showLogInPopUp"
        :email="email"
        :emailRules="emailRules"
        :password="password"
        :passwordRules="passwordRules"
        :errorAlert="errorAlert"
      />
    </v-app-bar>
  </div>
</template>
<script>
import loginView from "./loginView.vue";

export default {
  components: { loginView },
  name: "NavbarView",
  emits: [
    "emailTextChanged",
    "pswTextChanged",
    "onCreate",
    "toLogin",
    "onQuit",
    "onLogOut",
    "toSearch",
    "toFav",
    "showLoggedInView",
  ],

  props: {
    showLogInPopUp: Boolean,
    email: String,
    emailRules: Array,
    password: String,
    passwordRules: Array,
    loggedIn: Boolean,
    errorAlert: String,
  },

  computed: {
    userEmail: function () {
      console.log(" userEmail " + this.$store.state.userEmail);
      return this.$store.state.userEmail;
    },
  },

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
    onLogOutACB: function () {
      this.$emit("onLogOut");
    },
    goToExplore: function () {
      this.$emit("toExplore");
    },
    onEmailChangeACB: function (text) {
      this.$emit("emailTextChanged", text);
    },
    onPswChangeACB: function (text) {
      this.$emit("pswTextChanged", text);
    },
    onCreateACB: function () {
      this.$emit("onCreate");
    },
    onLoginACB: function () {
      this.$emit("onLogin");
    },
    setShowLogInACB: function (value) {
      this.$emit("setShowLogIn", value);
    },
    setShowLoggedInViewACB(value) {
      this.$emit("setShowLoggedInView", value);
    },
  },
};
</script>
