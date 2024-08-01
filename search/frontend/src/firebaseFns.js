import { signOut, getAuth, sendEmailVerification } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, deleteUser } from 'firebase/auth';
import { auth } from './firebaseConfig';
import axios from 'axios';

async function authenticate(username, password, n) {
    signInWithEmailAndPassword(auth, username, password)
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            console.log(user);
            console.log("logged in!");

            if (user.email.includes("admin")) { //새가족부
                n("/main");
            } else if (user.email.includes("youth")) { //유스
                n("/youth");
            } else if (user.email.includes("secondary")) { //청년부
                n("/adult");
            } else if (user.email.includes("child")) { //아동부
                n("/adult");
            } else if (user.email.includes("/finance")) { //재정부/교역자
                n("/finance");
            } else if (user.email.includes("/adult")) { //장년부
                n("/adult");
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

async function createAccount(username, password, tel, n) {
    const new_user = await createUserWithEmailAndPassword(auth, username, password).catch(err => alert(err))
    await sendEmailVerification(new_user.user)
        .then(() => {
            n('/verify')
        })
        .catch((err) => {
            alert(err);
        });

    const intervalId = setInterval(async () => {
        const emailVerified = await checkEmailVerification(new_user.user);
        let member = false
        let email = ""
        let level = ""
        if (emailVerified) {
            axios.get("http://localhost:5000/main")
                .then(res => {
                    res.data.rows.forEach(u => {
                        if (username === "kangjohn00000@gmail.com") { //SHOULD BE u.email
                           member = true
                           email = u.email
                           level = u.level
                        }
                    })
                    registerMember(member, tel, email, level)
                }).catch(err => console.log(err))

            clearInterval(intervalId); // Stop polling
            n("/profile"); // Navigate to login
        }
    }, 5000);

    setTimeout(async () => {
        clearInterval(intervalId); // Stop polling after 10 minutes
        const emailVerified = await checkEmailVerification(new_user.user);
        if (!emailVerified) {
            deleteUser(new_user.user)
                .then(() => {
                    alert("Email not verified within time limit, user deleted!");
                    n("/"); // Navigate to home
                })
                .catch((error) => {
                    alert(error);
                })
        }
    }, 20000);
}

const registerMember = (member, tel, email, l) => {
    if (member == true) {
        axios.post("http://localhost:5000/registered", {"email": email, "telephone": tel, 'level': l})
        .catch(err => console.log(err))
    }
}
// check status
async function checkEmailVerification(user) {
    await user.reload();
    return user.emailVerified;
}

const logout = (n) => {
    signOut(auth).then(() => {
        console.log("Logged out!")
        n("/")
    }).catch(err => {
        console.log(err)
    })
}

export { authenticate, createAccount, logout }