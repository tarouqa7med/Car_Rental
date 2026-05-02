

function openfeedback() {
    document.querySelector(".Feedback-Popup").style.display = "flex";
}

function closefeedback() {
    document.querySelector(".Feedback-Popup").style.display = "none";
}


const darkIcons = document.querySelectorAll(".darkMode");
const lightIcons = document.querySelectorAll(".lightMode");

function changeColorMode() {
    document.body.classList.toggle("dark-mode");

    const isDark = document.body.classList.contains("dark-mode");
    localStorage.setItem("mode", isDark ? "dark" : "light");

    darkIcons.forEach(el => el.style.display = isDark ? "none" : "block");
    lightIcons.forEach(el => el.style.display = isDark ? "block" : "none");
}

function loadTheme() {
    const savedMode = localStorage.getItem("mode");

    if (savedMode === "dark") {
        document.body.classList.add("dark-mode");
        darkIcons.forEach(el => el.style.display = "none");
        lightIcons.forEach(el => el.style.display = "block");
    }
}

// ==========================
// 🎞️ SCROLL ANIMATION
// ==========================
function initReveal() {
    const elements = document.querySelectorAll(".reveal");

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add("active");
                }, 150);
            }
        });
    });

    elements.forEach(el => observer.observe(el));
}

// ==========================
// 🚗 BOOKING POPUP (HTML)
// ==========================
const bookingHTML = `
<div class="pop-up" id="pop-up">
    <div class="mini-pop-up">
        <button class="payCloseBtn">&times;</button>
        <h1>Booking Details</h1>

        <form id="booking-form" novalidate>
            <label>Name:</label>
            <input type="text" id="book-name">

            <label>Email:</label>
            <input type="email" id="book-email">

            <label>Phone:</label>
            <input type="tel" id="book-phone">

            <label>Car Colour:</label>
            <select id="choose-colour">
                <option value="white">White</option>
                <option value="black">Black</option>
                <option value="red">Red</option>
            </select>

            <label>Rental period:</label>
            <select id="rental-period">
                <option value="1">1 Day</option>
                <option value="7">1 Week</option>
                <option value="30">1 Month</option>
                <option value="60">2 Month</option>
                <option value="180">6 Month</option>
                <option value="360">1 Year</option>
            </select>

            <label>
                <input type="checkbox" id="delivery"> Delivery to home
            </label>

            <p id="booking-error" style="color:red;"></p>

            <button type="submit">Book Now</button>
        </form>
    </div>
</div>
`;

// ==========================
// 🚗 OPEN / CLOSE BOOKING
// ==========================
function initBookingButtons() {
    document.addEventListener("click", (e) => {
        if (e.target.closest(".bookNowBtn")) {
            let popup = document.getElementById("pop-up");
            if (popup) popup.style.display = "flex";
        }

        if (e.target.closest(".payCloseBtn")) {
            let popup = document.getElementById("pop-up");
            if (popup) popup.style.display = "none";
        }
    });
}

initBookingButtons();

// ==========================
// ✅ CUSTOM VALIDATION + SAVE
// ==========================
function initBookingForm() {
    document.addEventListener("submit", (e) => {

        if (e.target.id === "booking-form") {
            e.preventDefault();

            const name = document.getElementById("book-name").value.trim();
            const email = document.getElementById("book-email").value.trim();
            const phone = document.getElementById("book-phone").value.trim();
            const error = document.getElementById("booking-error");

            error.innerText = "";

            // validation
            if (name.length < 3) {
                error.innerText = "Name must be at least 3 characters";
                return;
            }

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                error.innerText = "Invalid email";
                return;
            }

            if (!/^[0-9]{10,15}$/.test(phone)) {
                error.innerText = "Phone must be 10-15 digits";
                return;
            }

            // Save booking
            const bookingData = {
                name,
                email,
                phone,
                color: document.getElementById("choose-colour").value,
                period: document.getElementById("rental-period").value,
                delivery: document.getElementById("delivery").checked,
                createdAt: new Date().toISOString()
            };

            // Get existing bookings and add new one
            const bookings = JSON.parse(localStorage.getItem("bookings") || "[]");
            bookings.push(bookingData);
            localStorage.setItem("bookings", JSON.stringify(bookings));

            error.style.color = "green";
            error.innerText = "Booking saved!";
        }
    });
}

// ==========================
// 🔄 LOAD SAVED BOOKINGS
// ==========================
function loadBookingData() {
    const bookings = JSON.parse(localStorage.getItem("bookings") || "[]");

    if (bookings && bookings.length > 0) {
        console.log("Saved bookings:", bookings);
    }
}

// ==========================
// 🔍 SESSION STORAGE (SEARCH)
// ==========================
function initSearchStorage() {
    const search = document.querySelector("input[name='Search']");

    if (!search) return;

    search.addEventListener("input", () => {
        sessionStorage.setItem("search", search.value);
    });

    const saved = sessionStorage.getItem("search");
    if (saved) search.value = saved;
}

// ==========================
// 🚀 INIT EVERYTHING
// ==========================
document.addEventListener("DOMContentLoaded", () => {

    // inject booking popup
    const container = document.getElementById("bookNowFormByJS");
    if (container) container.innerHTML = bookingHTML;

    loadTheme();
    initReveal();
    initBookingButtons();
    initBookingForm();
    loadBookingData();
    initSearchStorage();
});
// ==========================
// 🔐 SIGN IN / SIGN OUT BUTTON
// ==========================

function updateAuthButton() {
    const authBtn = document.getElementById("authBtn");
    if (!authBtn) return;

    const loggedInUser = localStorage.getItem("loggedInUser");
    
    if (loggedInUser) {
        const user = JSON.parse(loggedInUser);
        authBtn.innerHTML = "Sign Out";
        authBtn.onclick = signOut;
        authBtn.title = "Sign out from your account";
    } else {
        authBtn.innerHTML = "Sign In";
        authBtn.onclick = null;
        authBtn.href = "html/register.html";
        authBtn.title = "Sign in or create a new account";
    }
}

function signOut() {
    localStorage.removeItem("loggedInUser");
    alert("You have been signed out!");
    // Go to index.html at root level
    window.location.href = window.location.origin + "/index.html";
}

// Initialize auth button on page load
document.addEventListener("DOMContentLoaded", () => {
    updateAuthButton();
});

// ==========================
// 🔐 LOCAL STORAGE HELPERS
// ==========================

function getUsersDB() {
    const users = localStorage.getItem("usersDB");
    return users ? JSON.parse(users) : [];
}

function saveUsersDB(users) {
    localStorage.setItem("usersDB", JSON.stringify(users));
}

function findUserByEmail(email) {
    const users = getUsersDB();
    return users.find(user => user.email && user.email.toLowerCase() === email.toLowerCase());
}

function emailExists(email) {
    return findUserByEmail(email) !== undefined;
}

// ==========================
// 🔐 LOGIN FORM (LOCAL STORAGE)
// ==========================

document.addEventListener("submit", function (e) {
    if (e.target.id === "loginForm") {
        e.preventDefault();

        let email = document.querySelector("input[name='email']").value.trim();
        let password = document.querySelector("input[name='password']").value;

        // Get or create error message element
        let errorMsg = document.getElementById("login-error");
        if (!errorMsg) {
            errorMsg = document.createElement("p");
            errorMsg.id = "login-error";
            errorMsg.style.color = "red";
            errorMsg.style.textAlign = "center";
            errorMsg.style.marginTop = "10px";
            e.target.appendChild(errorMsg);
        }
        errorMsg.innerText = "";
        errorMsg.style.color = "red";

        // Check if user exists
        const user = findUserByEmail(email);

        if (!user) {
            errorMsg.innerText = "User not found. Please register first.";
            return;
        }

        // Check if password matches
        if (password !== user.password) {
            errorMsg.innerText = "Incorrect password";
            return;
        }

        // Login successful
        errorMsg.style.color = "green";
        errorMsg.innerText = "Login successful!";
        
        // Store current logged in user
        localStorage.setItem("loggedInUser", JSON.stringify(user));
        
        setTimeout(() => {
            window.location.href = "../index.html";
        }, 1000);
    }
});

// ==========================
// 📝 REGISTRATION FORM (LOCAL STORAGE)
// ==========================
document.addEventListener("submit", function (e) {
    if (e.target.closest("form") && e.target.querySelector("input[type='password']")) {
        e.preventDefault();

        let name = document.querySelector("input[name='name']").value.trim();
        let email = document.querySelector("input[name='email']").value.trim();
        let password = document.querySelector("input[name='password']").value;

        // Get or create error message element
        let errorMsg = document.getElementById("register-error");
        if (!errorMsg) {
            errorMsg = document.createElement("p");
            errorMsg.id = "register-error";
            errorMsg.style.color = "red";
            errorMsg.style.textAlign = "center";
            errorMsg.style.marginTop = "10px";
            e.target.appendChild(errorMsg);
        }
        errorMsg.innerText = "";
        errorMsg.style.color = "red";

        // Check if email already exists
        if (emailExists(email)) {
            errorMsg.innerText = "Email already registered. Please login.";
            return;
        }

        // Validate inputs
        if (name.length < 3) {
            errorMsg.innerText = "Name must be at least 3 characters";
            return;
        }

        if (password.length < 6) {
            errorMsg.innerText = "Password must be at least 6 characters";
            return;
        }

        // Create new user
        let user = {
            name,
            email,
            password,
            createdAt: new Date().toISOString()
        };

        // Add to users database
        const users = getUsersDB();
        users.push(user);
        saveUsersDB(users);

        // Success
        errorMsg.style.color = "green";
        errorMsg.innerText = "Account created! Redirecting...";
        
        setTimeout(() => {
            window.location.href = "login.html";
        }, 1500);
    }
});
