// =========================
// Helpers
// =========================
function getUsers() {
    return JSON.parse(localStorage.getItem("users")) || [];
}

function saveUsers(users) {
    localStorage.setItem("users", JSON.stringify(users));
}

// =========================
// REGISTER
// =========================
const registerForm = document.getElementById("registerForm");

if (registerForm) {
    registerForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const name = registerForm.name.value;
        const email = registerForm.email.value;
        const password = registerForm.password.value;

        let users = getUsers();

        let exists = users.find((user) => user.email === email);

        if (exists) {
            return;
        }

        users.push({
            name: name,
            email: email,
            password: password,
        });

        saveUsers(users);

        window.location.href = "login.html";
    });
}

// =========================
// LOGIN
// =========================
const loginForm = document.getElementById("loginForm");

if (loginForm) {
    loginForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const email = loginForm.email.value;
        const password = loginForm.password.value;

        let users = getUsers();

        let user = users.find((u) => u.email === email);

        if (!user) {
            return;
        }

        if (user.password !== password) {
            return;
        }


        setTimeout(() => {
            window.location.href = "../index.html";
        }, 1500);
    });
}

// =========================
// FORGOT PASSWORD
// =========================
const emailVerifyForm = document.getElementById("emailVerifyForm");
const otpForm = document.getElementById("otpForm");
const newPasswordForm = document.getElementById("newPasswordForm");

let currentEmail = "";

if (emailVerifyForm) {
    emailVerifyForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const email = emailVerifyForm.email.value;
        let users = getUsers();

        let user = users.find((u) => u.email === email);

        if (!user) {
            return;
        }

        currentEmail = email;


        emailVerifyForm.style.display = "none";
        otpForm.style.display = "block";
    });
}

// OTP (fake)
if (otpForm) {
    otpForm.addEventListener("submit", function (e) {
        e.preventDefault();


        otpForm.style.display = "none";
        newPasswordForm.style.display = "block";
    });
}

// Change password
if (newPasswordForm) {
    newPasswordForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const newPassword = newPasswordForm.newPassword.value;

        let users = getUsers();

        let userIndex = users.findIndex((u) => u.email === currentEmail);

        if (userIndex === -1) {
            return;
        }

        users[userIndex].password = newPassword;

        saveUsers(users);


        setTimeout(() => {
            window.location.href = "login.html";
        }, 1500);
    });
}

// =========================
// Export to TXT file
// =========================
let textContent = "";

users.forEach(user => {
    textContent += `Name: ${user.name}\nEmail: ${user.email}\n\n`;
});

let blob = new Blob([textContent], { type: "text/plain" });

let a = document.createElement("a");
a.href = URL.createObjectURL(blob);
a.download = "registered_accounts.txt";
a.click();