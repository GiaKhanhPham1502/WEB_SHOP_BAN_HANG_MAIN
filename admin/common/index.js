const fullName = document.getElementById("fullName");

const user = JSON.parse(localStorage.getItem("user"));
fullName.textContent = user.fullName;