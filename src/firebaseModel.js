import "firebase/database";
import firebaseConfig from "/src/firebaseConfig.js";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, onValue } from "firebase/database";
//import store from "./store/index.js";
//import firebase from "firebase/app";
import {
    getAuth,
    signOut,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
} from "firebase/auth";

initializeApp(firebaseConfig);


function updateFirebaseFromModel(store) {
  const REF = store.getters.getUID;
  if (REF && REF != "") {
    const db = getDatabase();
    set(ref(db, REF + "/favourites"), store.getters.getFavourites);
  } else console.log("cannot update model, please sign in!");
}

function updateModelFromFirebase(store) {
  const REF = store.getters.getUID;
  if (REF && REF != "") {
    const db = getDatabase();
    onValue(
      ref(db, REF + "/favourites"),
      function favouritesChangedInFirebaseACB(firebaseData) {
        var fav = firebaseData.val();
        if (fav === null) {
          set(ref(db, REF + "/favourites"), []);
        } else if (fav !== store.getters.getFavourites) {
          //avoid loop
          store.dispatch("setFav", fav);
        }
      }
    );
  } 
}

function createUser(emailText, pswText) {
    const auth = getAuth();
    //create new
    createUserWithEmailAndPassword(auth, emailText, pswText)
        .then(() => {
            // Signed in
            login(emailText, pswText);
        })
        .catch((error) => {
            const errorMessage = error.message
            console.error("create error: " + errorMessage);
        });
}

function login(emailText, pswText) {
    const auth = getAuth();
    //sign in
    signInWithEmailAndPassword(auth, emailText, pswText)
        .then(() => {
            // Signed in

        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.error("login error: " + errorCode + errorMessage);
        });
}

function signout() {
    const auth = getAuth();
    signOut(auth).then(() => {
    }).catch((error) => {
        const errorMessage = error.message;
        console.error("log out error: " + errorMessage);
    });
}

export { updateFirebaseFromModel, updateModelFromFirebase, createUser, login, signout };
