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
      />
    </v-app-bar>
  </div>
</template>
<script>
import loginView from "./loginView.vue";

export default {
  components: { loginView },
  name: "NavbarView",
  data: function () {
    return {
      showDropdown: false,
    };
  },
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
  },

  computed: {
    userEmail: function () {
      console.log(" userEmail " + this.$store.state.userEmail);
      return this.$store.state.userEmail;
    },
    /*have to put this into presenter*/
    /*in presenter sth like :textStatus="textStatus" */
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
    getLoggedIn: function () {
      var loggedIn = this.$store.state.loggedIn;

      if (!loggedIn) {
        this.goToLogin();
      } else {
        this.showDropdown = true;
      }
    },
    onLogOutACB: function () {
      this.$emit("onLogOut");
      this.showDropdown = false;
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
      this.snackbar = false;
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
