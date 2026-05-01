

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

        if (e.target.classList.contains("bookNowBtn")) {
            document.getElementById("pop-up").style.display = "flex";
        }

        if (e.target.classList.contains("payCloseBtn")) {
            document.getElementById("pop-up").style.display = "none";
        }
    });
}

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

            // save
            const bookingData = {
                name,
                email,
                phone,
                color: document.getElementById("choose-colour").value,
                period: document.getElementById("rental-period").value,
                delivery: document.getElementById("delivery").checked
            };

            localStorage.setItem("booking", JSON.stringify(bookingData));

            error.style.color = "green";
            error.innerText = "Booking saved!";
        }
    });
}

// ==========================
// 🔄 LOAD SAVED DATA
// ==========================
function loadBookingData() {
    const saved = JSON.parse(localStorage.getItem("booking"));

    if (saved) {
        console.log("Saved booking:", saved);
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
// 🔐 LOGIN FORM (LOCAL STORAGE)
// ==========================

document.addEventListener("submit", function (e) {
    if (e.target.id === "loginForm") {
        e.preventDefault();

        let email = document.querySelector("input[name='email']").value;
        let password = document.querySelector("input[name='password']").value;

        let savedUser = JSON.parse(localStorage.getItem("user"));

        if (!savedUser) {
            alert("No account found. Please register first.");
            return;
        }

        if (email === savedUser.email && password === savedUser.password) {
            alert("Login successful!");
            window.location.href = "../index.html";
        } else {
            alert("Invalid email or password");
        }
    }
});

// ==========================
// 📝 REGISTRATION FORM (LOCAL STORAGE)
// ==========================
document.addEventListener("submit", function (e) {
    if (e.target.closest("form") && e.target.querySelector("input[type='password']")) {
        e.preventDefault();

        let name = document.querySelector("input[name='name']").value;
        let email = document.querySelector("input[name='email']").value;
        let password = document.querySelector("input[name='password']").value;

        let user = {
            name,
            email,
            password
        };

        localStorage.setItem("user", JSON.stringify(user));

        alert("Account created!");
        window.location.href = "login.html";
    }
});