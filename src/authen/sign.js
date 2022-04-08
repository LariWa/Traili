//create new account, sign in and sign out
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const auth = getAuth();

//create new
createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        // ...
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
    });

//sign in
signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        // ...
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
    });

signOut(auth).then(() => {
    // Sign-out successful.
}).catch((error) => {
    // An error happened.
});
