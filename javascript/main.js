// JavaScript Document

function openMenu() {
    const menu = document.querySelector("ul");
    if (menu.style.display === "flex") {
        menu.style.display = "none";
    } else {
        menu.style.display = "flex";
    }
}

function openfeedback() {
    document.getElementsByClassName("Feedback-Popup")[0].style.display = "flex";
}
function closefeedback() {
    document.getElementsByClassName("Feedback-Popup")[0].style.display = "none";
}

window.addEventListener("click", (e) => {
    if (e.target === modal) {
        modal.style.display = "none";
    }
});

// change colors

let darkMode = document.querySelectorAll(".darkMode");
let lightMode = document.querySelectorAll(".lightMode");

function changeColorMode() {
    document.body.classList.toggle("dark-mode");
    if (document.body.classList.contains("dark-mode")) {
        localStorage.setItem("mode", "dark");
        darkMode.forEach((dark) => (dark.style.display = "none"));
        lightMode.forEach((light) => (light.style.display = "block"));
    } else {
        localStorage.setItem("mode", "light");
        darkMode.forEach((dark) => (dark.style.display = "block"));
        lightMode.forEach((light) => (light.style.display = "none"));
    }
}
window.onload = function () {
    if (localStorage.getItem("mode") === "dark") {
        document.body.classList.add("dark-mode");
        darkMode.forEach((dark) => (dark.style.display = "none"));
        lightMode.forEach((light) => (light.style.display = "block"));
    }
};

// darkMode.forEach(
//   btn => {
//     btn.addEventListener(
//       "click",
//       function () {
//         localStorage.setItem("mode", "dark")
//       }
//     )
//   }
// )
// lightMode.forEach(
//   btn => {
//     btn.addEventListener(
//       "click",
//       function () {
//         darkMode.forEach(dark => dark.style.display = "block");
//         lightMode.forEach(light => light.style.display = "none");
//         document.body.classList.toggle("dark-mode");
//         localStorage.setItem("mode", "light")
//       }
//     )
//   }
// )

// darkMode.forEach(
//   btn => {
//     btn.addEventListener("click", function () {

//       color.setProperty("--primary-color1", "#000f22");
//       localStorage.setItem("--primary-color1", "#000f22");
//       color.setProperty("--primary-color2", "#1b3554");
//       localStorage.setItem("--primary-color2", "#1b3554");
//       color.setProperty("--primary-color3", "#3f6593");
//       localStorage.setItem("--primary-color3", "#3f6593");
//       color.setProperty("--primary-color4", "#5b86b8");
//       localStorage.setItem("--primary-color4", "#5b86b8");
//       color.setProperty("--primary-color5", "#80aad3");
//       localStorage.setItem("--primary-color5", "#80aad3");
//       color.setProperty("--primary-color6", "#c0e6fd");
//       localStorage.setItem("--primary-color6", "#c0e6fd");
//       document.body.style.setProperty("--pic", "url('../attachments/wallpapers/background-darkmode-pica.png')");
//       localStorage.setItem("--pic", "url('../attachments/wallpapers/background-darkmode-pica.png')");
//     });
//   }
// )
// lightMode.forEach(
//   btn => {
//     btn.addEventListener("click", function () {
//       lightMode.forEach(light => light.style.display = "none");
//       darkMode.forEach(dark => dark.style.display = "block");

//       color.setProperty("--primary-color1", "#c0e6fd");
//       localStorage.setItem("--primary-color1", "#c0e6fd");
//       color.setProperty("--primary-color2", "#80aad3");
//       localStorage.setItem("--primary-color2", "#80aad3");
//       color.setProperty("--primary-color3", "#5b86b8");
//       localStorage.setItem("--primary-color3", "#5b86b8");
//       color.setProperty("--primary-color4", "#3f6593");
//       localStorage.setItem("--primary-color4", "#3f6593");
//       color.setProperty("--primary-color5", "#1b3554");
//       localStorage.setItem("--primary-color5", "#1b3554");
//       color.setProperty("--primary-color6", "#000f22");
//       localStorage.setItem("--primary-color6", "#000f22");
//       document.body.style.setProperty("--pic", "url('../attachments/wallpapers/background-lightmode-pica.png')")
//       localStorage.setItem("--pic", "url('../attachments/wallpapers/background-lightmode-pica.png')");
//     });
//   }
// )

// if (darkMode && lightMode) {
//   color.setProperty("--primary-color1", localStorage.getItem("--primary-color1"));
//   color.setProperty("--primary-color2", localStorage.getItem("--primary-color2"));
//   color.setProperty("--primary-color3", localStorage.getItem("--primary-color3"));
//   color.setProperty("--primary-color4", localStorage.getItem("--primary-color4"));
//   color.setProperty("--primary-color5", localStorage.getItem("--primary-color5"));
//   color.setProperty("--primary-color6", localStorage.getItem("--primary-color6"));
//   color.setProperty("--pic", localStorage.getItem("--pic"));

//   if (localStorage.getItem("--primary-color1") === "#000f22") {
//     darkMode.forEach((dark) => (dark.style.display = "none"));
//     lightMode.forEach((light) => (light.style.display = "block"));
//     document.body.style.setProperty("--pic", "url('../attachments/wallpapers/background-darkmode-pica.png')")
//   } else {
//     darkMode.forEach((dark) => (dark.style.display = "block"));
//     lightMode.forEach((light) => (light.style.display = "none"));
//     document.body.style.setProperty("--pic", "url('../attachments/wallpapers/background-lightmode-pica.png')")
//   }
// }

// reveal code for all project

document.addEventListener("DOMContentLoaded", function () {
    const elements = document.querySelectorAll(".reveal");

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add("active");
                }, 150);
            } // else {
            //     entry.target.classList.remove("active");
            // }
        });
    });

    elements.forEach(function (el) {
        observer.observe(el);
    });
});

let bookNowBtn = document.querySelectorAll(".bookNowBtn");
let payCloseBtn = document.querySelectorAll(".payCloseBtn");

bookNowBtn.forEach(function (btn) {
    btn.addEventListener("click", function () {
        document.getElementById("pop-up").style.display = "flex";
    });
});

payCloseBtn.forEach(function (btn) {
    btn.addEventListener("click", function () {
        document.getElementById("pop-up").style.display = "none";
    });
});


let bookNowFormByJS = `
    <div class="pop-up" id="pop-up">
        <div class="mini-pop-up" id="mini-pop-up">
            <button class="payCloseBtn" id="payCloseBtn">&times;</button>
            <h1 id="booking-info">Booking Details</h1>
            <form id="booking-form" action="">
                <label for="name">Name:</label>
                <input type="text" id="name" name="name" required>
                <label for="email">Email:</label>
                <input type="email" id="email" name="email" required>
                <label for="phone">Phone:</label>
                <input type="tel" id="phone" name="phone" required>
                <label for="car-colour">Car Colour:</label>
                <select name="choose-colour" id="choose-colour" onchange="changeColor(this)">
                    <option value="white">White</option>
                    <option value="gray">Gray</option>
                    <option value="silver">Silver</option>
                    <option value="brown">Brown</option>
                    <option value="beige">Beige</option>
                    <option value="orange">Orange</option>
                    <option value="purple">Purple</option>
                    <option value="pink">Pink</option>
                    <option value="maroon">Maroon</option>
                    <option value="navy">Navy</option>
                    <option value="olive">Olive</option>
                    <option value="teal">Teal</option>
                    <option value="aqua">Aqua</option>
                    <option value="lime">Lime</option>
                    <option value="cyan">Cyan</option>
                    <option value="magenta">Magenta</option>
                    <option value="violet">Violet</option>
                    <option value="gold">Gold</option>
                    <option value="orchid">Orchid</option>
                    <option value="crimson">Crimson</option>
                    <option value="indigo">Indigo</option>
                    <option value="tan">Tan</option>
                    <option value="black">Black</option>
                    <option value="blue">Blue</option>
                    <option value="red">Red</option>
                    <option value="yellow">Yellow</option>
                    <option value="green">Green</option>
                </select>
                <label for="time">Rental period:</label>
                <select name="rental-period" id="rental-period">
                    <option value="1">1 Day</option>
                    <option value="2">2 Days</option>
                    <option value="3">3 Days</option>
                    <option value="7">1 Week</option>
                    <option value="14">2 Weeks</option>
                    <option value="30">1 Month</option>
                    <option value="60">2 Months</option>
                    <option value="90">3 Months</option>
                    <option value="180">6 Months</option>
                    <option value="365">1 Year</option>
                </select>
                <h3 id="booking-question">Do you want to get the car by delivery to your home?</h3>
                <input type="checkbox" id="delivery" name="delivery">
                <button type="submit">Book Now</button>
            </form>
            <div>
                <img src="../attachments/mastercard-7c511229.png" alt="">
                <img src="../attachments/miza.dfc41445.svg" alt="">
            </div>
        </div>
    </div>
`;

document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("bookNowFormByJS").innerHTML = bookNowFormByJS;
});
window.onload = function () {
    document.getElementById("bookNowFormByJS").innerHTML = bookNowFormByJS;
};

document.addEventListener("click", function (e) {
    if (e.target.classList.contains("payCloseBtn")) {
        document.getElementById("pop-up").style.display = "none";
    }
});