<!--<template>
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
import {
        getAuth,
        createUserWithEmailAndPassword,
        signInWithEmailAndPassword,
        signOut,
        //browserLocalPersistence,
        //setPersistence
    }
        from "firebase/auth";
//import { updateModelFromFirebase } from "../firebaseModel";
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
       ...mapActions(["setUID", "setLoggedIn","clearData", "setUserEmail"]),
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
                        this.textStatus="User created";
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
                        console.error("login error: " + errorCode + errorMessage);
                    });
            },


       logOutACB() {
            const auth = getAuth();
            signOut(auth).then(() => {
                this.clearData();//update firebase where there is a mutuation, so firebase data is deleted as well???
                this.textStatus = "sign out!";
                console.log("sign out");
                this.$router.go(-1);
            }).catch((error) => {
                const errorMessage = error.message;
                this.textStatus = errorMessage;
                console.error("log out error: " + errorMessage);
            });
        },
   },
}
</script>-->