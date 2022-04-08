<template>
    <div>
        <login-view       @emailTextChanged="emailChangedACB"
                          @pswTextChanged="pswChangedACB"
                          @onCreate="createACB"
                          @onLogin="loginACB" />
    </div>
</template>

<script>
import loginView from "../views/loginView.vue";
import {
        getAuth,
        createUserWithEmailAndPassword,
        signInWithEmailAndPassword
    }
        from "firebase/auth";

export default {
  components: { loginView},
  data() {
    return {
      emailText: "",
      pswText:"",
      
    };
  },
  
   methods: {
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
                    .then((userCredential) => {
                        // Signed in
                        const user = userCredential.user;
                        console.log("user created and signed in:");
                        console.log(user);
                    })
                    .catch((error) => {
                        //const errorCode = error.code;
                        const errorMessage = error.message;
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
                        console.log("user signed in:");
                        console.log(user);
                        // ...
                    })
                    .catch((error) => {
                        //const errorCode = error.code;
                        const errorMessage = error.message;
                        console.error("login error: " + errorMessage);
                    });
            },
        },
}
</script>