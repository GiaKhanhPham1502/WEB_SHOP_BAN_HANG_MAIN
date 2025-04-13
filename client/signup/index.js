import { addUserToFirestore } from "../../firebase-config.js";

const btnSignUp = document.getElementById("btnSignUp");

btnSignUp.addEventListener("click", async () => {
    const fullName = document.getElementById("InputFullName").value;
    const email = document.getElementById("InputEmail").value;
    const password = document.getElementById("InputPassword").value;

    const user = await addUserToFirestore({
        fullName,
        email,
        password,
        role: "User"
    });

    if (user) {
        window.location.href = "../signin/index.html";
    }
});