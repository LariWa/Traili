import "firebase/database";
import firebaseConfig from "/src/firebaseConfig.js";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set } from "firebase/database";
// import firebase from "firebase/app";
initializeApp(firebaseConfig);

function testFirebase() {
  // firebase // why is this not working?
  //   .database()
  //   .ref("test" + "/test")
  //   .set("dummy");

  const db = getDatabase();
  set(ref(db, "test2/"), "test");
}
export { testFirebase };
