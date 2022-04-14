//create new account, sign in and sign out
import { getAuth } from "firebase/auth";

function checkLogin() {
    const auth = getAuth();
    console.log(auth.currentUser);
    return (auth.currentUser != null);
}

export {
    checkLogin,
}
