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

      <login-view
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

      <div v-if="showDropdown" class="sign-out-dropdown">
        <v-card>
          <v-navigation-drawer permanent expand-on-hover>
            <v-list-item link>
              <v-list-item-content>
                {{ userEmail }}
                <br />
                <v-btn @click="onLogOutACB">Sign out</v-btn>
              </v-list-item-content>
            </v-list-item>
          </v-navigation-drawer>
        </v-card>
      </div>
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
    "onLogin",
    "onQuit",
    "onLogOut",
    "toSearch",
    "toFav",
  ],

  props: {
    showLogInPopUp: Boolean,
    email: String,
    emailRules: Array,
    password: String,
    passwordRules: Array,
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
  },
};
</script>
