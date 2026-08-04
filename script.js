const loginForm = document.getElementById("loginForm");
const loginPage = document.getElementById("loginPage");
const formPage = document.getElementById("formPage");
const logoutBtn = document.getElementById("logoutBtn");

loginForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    if (username === "admin" && password === "1234") {
        loginPage.classList.add("hidden");
        formPage.classList.remove("hidden");
    } else {
        alert("Invalid username or password.");
    }
});

logoutBtn.addEventListener("click", function () {
    loginPage.classList.remove("hidden");
    formPage.classList.add("hidden");
    loginForm.reset();
});
