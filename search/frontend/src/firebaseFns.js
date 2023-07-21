import { signOut, getAuth } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from './firebaseConfig';

async function authenticate(username, password, n) {
    signInWithEmailAndPassword(auth, username, password)
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            console.log(user);
            console.log("logged in!");

            if (user.email.includes("admin")) {
                n("/main"); //
            } else if (user.email.includes("youth")) {
                n("/youth");
            } else if (user.email.includes("secondary")) {
                n("/secondary");
            } else if (user.email.includes("child")) {
                n("/child");
            } else if (user.email.includes("/finance")) {
                n("/finance");
            } else {
                alert("Invalid email! Register again.")
            }
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            alert(errorCode, errorMessage)
        });
}

async function createAccount(username, password, n) {
    await createUserWithEmailAndPassword(auth, username, password)
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            console.log(user);
            n("/login")
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            alert(errorCode, errorMessage);
        });
}

const logout = (n) => {
    signOut(auth).then(() => {
        console.log("Logged out!")
        n("/")
    }).catch(err => {
        console.log(err)
    })
}

export {authenticate, createAccount, logout}