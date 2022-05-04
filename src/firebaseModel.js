import "firebase/database";
import firebaseConfig from "/src/firebaseConfig.js";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, onValue } from "firebase/database";
import store from "./store/index.js";
//import firebase from "firebase/app";
initializeApp(firebaseConfig);

function testFirebase() {
  // firebase // why is this not working?
  //   .database()
  //   .ref("test" + "/test")
  //   .set("dummy");

  const db = getDatabase();
  set(ref(db, "test2/"), "test");
}

function updateFirebaseFromModel(state) {
  const REF = state.UID;
  console.log("REF when updating firebase: " + REF);
  if (REF && REF != "") {
    const db = getDatabase();
    set(ref(db, REF + "/favourites"), state.favourites);
  } else console.log("cannot update model, please sign in!");
}

function updateModelFromFirebase(state) {
  const REF = state.UID;
  if (REF && REF != "") {
    const db = getDatabase();
    onValue(
      ref(db, REF + "/favourites"),
      function favouritesChangedInFirebaseACB(firebaseData) {
        var fav = firebaseData.val();
        if (fav === null) {
          //never add to fav in this account
          set(ref(db, REF + "/favourites"), []);
        } else if (fav !== state.favourites) {
          //avoid loop
          store.dispatch("setFav", fav);
          console.log("from firebase: ");
          console.log(fav);
        }
      }
    );
  } else console.log("cannot update firebase, please sign in!");
}

export { updateFirebaseFromModel, updateModelFromFirebase, testFirebase };
