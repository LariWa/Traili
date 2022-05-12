import "firebase/database";
import firebaseConfig from "/src/firebaseConfig.js";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, onValue } from "firebase/database";
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
  return createUserWithEmailAndPassword(auth, emailText, pswText)
    .then(() => {
      // Signed in
      login(emailText, pswText);
    })
    .catch((error) => {
      throw new Error("create error: " + error.code + error.message);
    });
}

function login(emailText, pswText) {
  const auth = getAuth();
  //sign in
  return signInWithEmailAndPassword(auth, emailText, pswText)
    .then(() => {
      // Signed in
    })
    .catch((error) => {
      throw new Error("login error: " + error.code + error.message);
    });
}

function signout() {
  const auth = getAuth();
  signOut(auth)
    .then(() => {})
    .catch((error) => {
      console.error("log out error: " + error.message);
    });
}

export {
  updateFirebaseFromModel,
  updateModelFromFirebase,
  createUser,
  login,
  signout,
};
