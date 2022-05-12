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
import { createUser, login} from "../firebaseModel";
import { mapActions } from "vuex";

export default {
  components: { loginView },
  data() {
    return {
      emailText: "",
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
       ...mapActions(["initData", "clearData","setShowLogInPopUp"]),
       emailChangedACB: function (text) {
                this.emailText = text;
            },
       pswChangedACB: function (text) {
                this.password = text;
       },
       quitACB: function () {
           this.$router.go(-1);
       },
       createACB: function () {//move to firebaseModel, import-----------------
           createUser(this.emailText, this.password);
            },
       loginACB: function () {
           login(this.emailText, this.password);
            },

    setDisplayError(text) {
      this.errorText = text;
    },
  },
};
</script>
