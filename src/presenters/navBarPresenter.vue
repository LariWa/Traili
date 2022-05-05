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
    />
    <SnackBar
      @setSnackbarValue="setShowLogInMessage"
      :showSnackbar="showLogInMessage"
      :text="'Please log in to see your favourite trails'"
    />
    <logged-in-view
      @showLoggedInView="showLoggedInViewACB"
      :name="name"
      :email="email"
      :avatarInitials="avatarInitials"
      :showLoggedInView="showLoggedInView"
      @onLogOut="logOutACB"
    />
    <v-spacer />

    <login-view> </login-view>
  </div>
</template>

<script>
import NavbarView from "../views/NavbarView.vue";
import SnackBar from "../components/Snackbar.vue";

import { getAuth, signOut } from "firebase/auth";
import { mapActions } from "vuex";
import LoggedInView from "@/views/loggedInView.vue";
import emailToName from "email-to-name";
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
      showLoggedInView: true,
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
    };
  },

  computed: {
    showLogInMessage: function () {
      if (this.$store.getters.getLoggedIn) return false;
      else if (this.showingLogInMessage) return true;
      return false;
    },
    email: function () {
      return this.$store.getters.getEmail;
    },
    name: function () {
      return emailToName.process(this.email);
    },
    avatarInitials: function () {
      return this.name
        .match(/(\b\S)?/g)
        .join("")
        .toUpperCase();
    },
  },
  methods: {
    ...mapActions(["setUID", "setLoggedIn", "clearData", "setUserEmail"]),
    goToFavACB: function () {
      if (this.$store.getters.getLoggedIn)
        this.$router.push("/Favourites").catch(() => {});
      else {
        this.showingLogInMessage = true;
        this.$router.push("/Login").catch(() => {});
      }
    },

    emailChangedACB: function (text) {
      this.emailText = text;
    },
    pswChangedACB: function (text) {
      this.pswlText = text;
    },
    setShowLogInACB: function (value) {
      //this.$router.go(-1);
      this.showLogInPopUp = value;
    },

    route2SearchACB: function () {
      this.$router.push("/Search").catch(() => {});
    },
    route2LoginACB: function () {
      //this.$router.push("/Login").catch(() => {});
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
          this.setLoggedIn(true);
          this.$router.go(-1);
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          this.textStatus = errorMessage;
          alert("login error: " + errorCode + errorMessage);
        });
    },

    logOutACB() {
      const auth = getAuth();
      signOut(auth)
        .then(() => {
          this.clearData(); //update firebase where there is a mutuation, so firebase data is deleted as well???
          this.textStatus = "sign out!";
          console.log("sign out");
          this.$router.go(-1);
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
    showLoggedInViewACB: function (value) {
      this.showLoggedInView = value;
    },
  },
};
</script>
