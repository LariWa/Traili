<template>
  <div>
    <NavbarView
      @toFav="goToFavACB"
      @toSearch="route2SearchACB"
      @toLogin="route2LoginACB"
      @toExplore="route2ExploreACB"
      @emailTextChanged="emailChangedACB"
      @pswTextChanged="pswChangedACB"
      @onCreate="createACB"
      @onLogin="loginACB"
      @setShowLogIn="setShowLogInACB"
      :textStatus="''"
      :showLogInPopUp="showLogInPopUp"
      :email="email"
      :emailRules="emailRules"
      :password="password"
      :passwordRules="passwordRules"
      :loggedIn="loggedIn"
      @setShowLoggedInView="setShowLoggedInViewACB"
    />
    <SnackBar
      @setSnackbarValue="setSnackbarValueACB"
      :showSnackbar="showSnackbar"
      :text="snackbarText"
    />
    <logged-in-view
      @showLoggedInView="setShowLoggedInViewACB"
      :name="name"
      :email="userEmail"
      :avatarInitials="avatarInitials"
      :showLoggedInView="showLoggedInView"
      @onLogOut="logOutACB"
    />
    <v-spacer />




    <login-view
      @showError="displayErrorACB"
      :errorAlert="errorText"
    />



  </div>
</template>

<script>
import NavbarView from "../views/NavbarView.vue";
import SnackBar from "../components/Snackbar.vue";

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { mapActions } from "vuex";
import LoggedInView from "@/views/loggedInView.vue";
import emailToName from "email-to-name";
import LoginView from "@/views/loginView.vue";
export default {
  components: {
    NavbarView,
    SnackBar,
    LoggedInView,
    LoginView,
  },

  data() {
    return {
      showingLogInMessage: false,
      showLoggedInView: false,
      emailText: "",
      pswText: "",
      textStatus: "",
      showLogInPopUp: false,
      email: "",
      emailRules: [
        (v) => !!v || "E-mail is required",
        (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
      ],
      password: "",
      passwordRules: [
        (v) => !!v || "Password is required",
        (v) =>
          (v && v.length >= 6) || "Password must be more than 6 characters",
      ],
      showSnackbar: false,
      snackbarText: "",




      errorText: "",





    };
  },

  computed: {
    showLogInMessage: function () {
      if (this.$store.getters.getLoggedIn) return false;
      else if (this.showingLogInMessage) return true;
      return false;
    },
    userEmail: function () {
      return this.$store.getters.getEmail;
    },
    name: function () {
      return emailToName.process(this.userEmail);
    },
    avatarInitials: function () {
      return this.name
        .match(/(\b\S)?/g)
        .join("")
        .toUpperCase();
    },
    loggedIn: function () {
      return this.$store.getters.getLoggedIn;
    },
  },
  methods: {
    ...mapActions(["setUID", "setLoggedIn", "clearData", "setUserEmail"]),
    goToFavACB: function () {
      if (this.loggedIn) this.$router.push("/Favourites").catch(() => {});
      else {
        this.setSnackbarSettings(
          true,
          "Please log in to see your favourite trails!"
        );
        this.showLogInPopUp = true;
      }
    },

    emailChangedACB: function (text) {
      this.emailText = text;
    },
    pswChangedACB: function (text) {
      this.pswlText = text;
    },
    setShowLogInACB: function (value) {
      this.showLogInPopUp = value;
    },
    route2SearchACB: function () {
      this.$router.push("/Search").catch(() => {});
    },
    route2LoginACB: function () {
      this.showLogInPopUp = true;
    },
    route2ExploreACB: function () {
      this.showLoggedInView = true;
      this.$router.push("/Explore").catch(() => {});
    },

    createACB: function () {
      const auth = getAuth();
      //create new
      createUserWithEmailAndPassword(auth, this.emailText, this.pswlText)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          this.textStatus = "User created";
          console.log(user);
          this.loginACB();
        })
        .catch((error) => {
          //const errorCode = error.code;
          const errorMessage = error.message;
          this.textStatus = errorMessage;
          console.error("create error: " + errorMessage);
          // ..
        });
    },
    loginACB: function () {
      const auth = getAuth();
      //sign in
      signInWithEmailAndPassword(auth, this.emailText, this.pswlText)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          this.textStatus = "User logged in";
          console.log("user signed in:");
          console.log(user.uid);
          this.setUserEmail(this.emailText);
          this.setUID(user.uid);
          this.showLogInPopUp = false;
          this.setLoggedIn(true);
          this.setSnackbarSettings(true, "You are now logged in!");
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          this.textStatus = errorMessage;
          this.displayErrorACB("login error: " + errorCode + errorMessage);
          //alert("login error: " + errorCode + errorMessage);
        });
    },

    logOutACB() {
      const auth = getAuth();
      signOut(auth)
        .then(() => {
          this.clearData(); //update firebase where there is a mutuation, so firebase data is deleted as well???
          this.textStatus = "sign out!";
          console.log("sign out");
          this.showLoggedInView = false;
          this.setSnackbarSettings(true, "You are now logged out!");
        })
        .catch((error) => {
          const errorMessage = error.message;
          this.textStatus = errorMessage;
          console.error("log out error: " + errorMessage);
        });
    },
    setShowLogInMessage: function (value) {
      this.showingLogInMessage = value;
    },
    setShowLoggedInViewACB: function (value) {
      this.showLoggedInView = value;
    },
    setSnackbarValueACB: function (value) {
      this.showSnackbar = value;
    },
    setSnackbarSettings(visibility, text) {
      this.showSnackbar = visibility;
      this.snackbarText = text;
    },
    




    displayErrorACB(text) {
      this.errorText = text;
    },

  },
};
</script>
