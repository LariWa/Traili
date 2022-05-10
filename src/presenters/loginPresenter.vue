<template>
  <div>
    <login-view
      @emailTextChanged="emailChangedACB"
      @pswTextChanged="pswChangedACB"
      @onCreate="createACB"
      @onLogin="loginACB"
      @setShowLogIn="setShowLogInACB"
      :showLogInPopUp="showLogInPopUp"
      :email="emailText"
      :emailRules="emailRules"
      :password="password"
      :passwordRules="passwordRules"
      :errorAlert="errorText"
    />
  </div>
</template>

<script>
import loginView from "../views/loginView.vue";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
//import { updateModelFromFirebase } from "../firebaseModel";
import { mapActions } from "vuex";

export default {
  components: { loginView },
  data() {
    return {
      emailText: "",
      pswText: "",
      showLogInPopUp: false,
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
      errorText: "",
    };
  },

  methods: {
    ...mapActions(["setUID", "setLoggedIn", "clearData", "setUserEmail"]),
    emailChangedACB: function (text) {
      this.emailText = text;
    },
    pswChangedACB: function (text) {
      this.pswlText = text;
    },
    createACB: function () {
      const auth = getAuth();
      //create new
      createUserWithEmailAndPassword(auth, this.emailText, this.pswlText)
        .then(() => {
          // Signed in
          //const user = userCredential.user;
          this.textStatus = "User created";
          //console.log(user);
          this.loginACB();
        })
        .catch((error) => {
          //const errorCode = error.code;
          const errorMessage = error.message;
          this.setDisplayError("login error: " + error.code + errorMessage);
          //console.error("create error: " + errorMessage);
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
          this.setUserEmail(this.emailText);
          this.setUID(user.uid);
          this.setLoggedIn(true);
        })
        .catch((error) => {
          const errorMessage = error.message;
          this.textStatus = errorMessage;
          this.setDisplayError("login error: " + error.code + errorMessage);
          //console.error("login error: " + errorCode + errorMessage);
        });
    },
    setShowLogInACB: function (value) {
      this.showLogInPopUp = value;
    },
    setDisplayError(text) {
      this.errorText = text;
    },
  },
};
</script>
