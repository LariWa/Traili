import "firebase/database";
import firebaseConfig from "/src/firebaseConfig.js";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, onValue } from "firebase/database";
import store from './store/index.js'
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



function updateFirebaseFromModel(favourites) {
    const REF = store.getters.getUID;
    if (REF != "") {
        const db = getDatabase();
        set(ref(db, REF + "/favourites"), favourites);
    }
    else
        console.log("cannot update model, please sign in!");
}

function updateModelFromFirebase() {
    //console.log("updating")
    const REF = store.getters.getUID;
    //console.log("REF " + REF);
    if (REF != "") {
        const db = getDatabase();
        onValue(ref(db, REF + "/favourites"), function favouritesChangedInFirebaseACB(firebaseData) {
            var fav = firebaseData.val()
            console.log("from firebase: ");
            console.log(fav);
            if (fav === null) {//never add to fav in this account
                set(ref(db, REF + "/favourites"), []);
            }
            else
                store.commit("setFav", firebaseData.val());

        });
    }
    else
        console.log("cannot update firebase, please sign in!");

}


export {
    updateFirebaseFromModel,
    updateModelFromFirebase,
    testFirebase,
};
