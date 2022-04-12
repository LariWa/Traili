<template>
  <div>
    <login-view
      @emailTextChanged="emailChangedACB"
      @pswTextChanged="pswChangedACB"
      @onCreate="createACB"
      @onLogin="loginACB"
      @onQuit="quitACB"
      :textStatus="textStatus"
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

export default {
  components: { loginView },
  data() {
    return {
      emailText: "",
      pswText: "",
      textStatus: "",
    };
  },

  methods: {
    emailChangedACB: function (text) {
      this.emailText = text;
    },
    pswChangedACB: function (text) {
      this.pswlText = text;
    },
    quitACB: function () {
      this.$router.go(-1);
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
          console.log(user);
          this.$store.commit("setLoggedIn", true);
          this.$router.go(-1);
        })
        .catch((error) => {
          //const errorCode = error.code;
          const errorMessage = error.message;
          this.textStatus = errorMessage;
          console.error("login error: " + errorMessage);
        });
    },
  },
};
</script>
