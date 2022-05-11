<template>
    <div>
        <login-view       @emailTextChanged="emailChangedACB"
                          @pswTextChanged="pswChangedACB"
                          @onCreate="createACB"
                          @onLogin="loginACB" 
                          @onQuit="quitACB"
                          @onLogOut="logOutACB"
                          :textStatus="textStatus"/>
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
      textStatus: "",
    };
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
        },
   },
}
</script>