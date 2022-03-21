import firebaseConfig from "/src/firebaseConfig.js";
firebase.initializeApp(firebaseConfig);  

//  REF is the “root” Firebase path. NN is your TW2_TW3 group number
//const REF="dinnerModelNN";
//firebase.database().ref(REF+"/test").set("dummy");//

var adaNameRef = firebase.database().ref('users/ada/name');
adaNameRef.set({ first: 'Ada', last: 'Lovelace' })
  .then(function() {
    console.log('Synchronization succeeded');
  })
  .catch(function(error) {
    console.log('Synchronization failed');
  });
