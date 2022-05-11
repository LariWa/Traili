<template>
  <div>
    <login-view
      @emailTextChanged="emailChangedACB"
      @pswTextChanged="pswChangedACB"
      @onCreate="createACB"
      @onLogin="loginACB"
      @setShowLogIn="setShowLogInPopUp"
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
//import {getAuth,signOut,} from "firebase/auth";
import { createUser, login, signout } from "../firebaseModel";
import { mapActions } from "vuex";

export default {
  components: { loginView },
  data() {
    return {
      emailText: "",
      pswText: "",
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
  computed: {
    showLogInPopUp() {
      return this.$store.getters.getShowLogInPopUp;
    },
  },

  methods: {
       ...mapActions(["initData", "clearData"]),
       emailChangedACB: function (text) {
                this.emailText = text;
            },
       pswChangedACB: function (text) {
                this.pswlText = text;
       },
       quitACB: function () {
           this.$router.go(-1);
       },
       createACB: function () {//move to firebaseModel, import-----------------
           createUser(this.store,this.emailText, this.pswText);
            },
       loginACB: function () {
           const user = login(this.emailText, this.pswText);
           this.initData(user);
           this.$router.go(-1);
            },


       logOutACB() {
           signout();
           this.clearData();
           //this.textStatus = "sign out!";
           //console.log("sign out");
           this.$router.go(-1);
  
    setDisplayError(text) {
      this.errorText = text;
    },
  },
};
</script>
