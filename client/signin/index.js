import { handleSignIn, loginWithGoogle } from "../../firebase-config.js";

const btnSignIn = document.getElementById("btnSignIn");
const btnSignInWithGoogle = document.getElementById("btnSignInWithGoogle");
const inputEmail = document.getElementById("inputEmail1");
const inputPassword = document.getElementById("inputPassword");

btnSignIn.addEventListener("click", async () => {
    const email = inputEmail.value;
    const password = inputPassword.value;
    const user = await handleSignIn(email, password);
    if (user) {
        localStorage.setItem("user", JSON.stringify(user));
        alert("Sign in successful");
        window.location.href = "../admin/dashboard/index.html";
    } else {
        alert("Invalid email or password");
    }
})

btnSignInWithGoogle.addEventListener("click", async () => {
    const user = await loginWithGoogle();
    if (user) {
        alert("Sign in with Google successful");
        // window.location.href = "../dashboard/index.html";
    }
})