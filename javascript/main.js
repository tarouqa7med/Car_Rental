// JavaScript Document

function openMenu() {
  const menu = document.querySelector("ul");
  if(menu.style.display = menu.style.display === "flex" ) {
    menu.style.display = menu.style.display = "none";
  } else {
    menu.style.display = menu.style.display = "flex";
  }
}

function openfeedback() {
  document.getElementsByClassName("Feedback-Popup")[0].style.display = "flex";
}
function closefeedback() {
  document.getElementsByClassName("Feedback-Popup")[0].style.display = "none";
}

// const bookingModal = document.getElementById("booking-modal");
// const bookingButtons = document.querySelectorAll(".booking-btn");

// bookingButtons.forEach((btn) => {
//   btn.addEventListener("click", (e) => {
//     e.preventDefault();
//     btn.classList.add("clicked");
//     setTimeout(() => {
//       btn.classList.remove("clicked");
//       bookingModal.style.display = "flex";
//     }, 150);
//   });
// });

// function openBookingModal() {
//   document.getElementById("booking-modal").style.display = "grid";
// }
// function closeBookingModal() {
//   document.getElementById("booking-modal").style.display = "none";
// }

// const buttons = document.querySelectorAll("#booking-btn");
// const modal = document.getElementById("booking-modal");
// const closeBtn = document.querySelector(".close");

// function addEffectAndAction(element, action) {
//   element.classList.add("clicked");

//   setTimeout(() => {
//     element.classList.remove("clicked");

//     setTimeout(() => {
//       action();
//     }, 200);
//   }, 500);
// }

// buttons.forEach((btn) => {
//   btn.addEventListener("click", (e) => {
//     e.preventDefault();
//     addEffectAndAction(btn, () => {
//       modal.style.display = "block";
//     });
//   });
// });

// closeBtn.addEventListener("click", (e) => {
//   e.preventDefault();
//   addEffectAndAction(closeBtn, () => {
//     modal.style.display = "none";
//   });
// });

// window.addEventListener("click", (e) => {
//   if (e.target === modal) {
//     modal.style.display = "none";
//   }
// });





// change colors

let darkMode = document.querySelectorAll(".darkMode");
let lightMode = document.querySelectorAll(".lightMode");
let color = document.documentElement.style;


darkMode.forEach(
    btn => {
        btn.addEventListener("click", function () {
            darkMode.forEach(dark => dark.style.display = "none");
            lightMode.forEach(light => light.style.display = "block");
            document.body.style.setProperty("--pic", "url('../attachments/wallpapers/background-darkmode-pica.png')")
            
            color.setProperty("--primary-color1", "#000f22");
            localStorage.setItem("--primary-color1", "#000f22");
            color.setProperty("--primary-color2", "#1b3554");
            localStorage.setItem("--primary-color2", "#1b3554");
            color.setProperty("--primary-color3", "#3f6593");
            localStorage.setItem("--primary-color3", "#3f6593");
            color.setProperty("--primary-color4", "#5b86b8");
            localStorage.setItem("--primary-color4", "#5b86b8");
            color.setProperty("--primary-color5", "#80aad3");
            localStorage.setItem("--primary-color5", "#80aad3");
            color.setProperty("--primary-color6", "#c0e6fd");
            localStorage.setItem("--primary-color6", "#c0e6fd");
          });
        }
      )
      lightMode.forEach(
        btn => {
          btn.addEventListener("click", function () {
            lightMode.forEach(light => light.style.display = "none");
            darkMode.forEach(dark => dark.style.display = "block");
            document.body.style.setProperty("--pic", "url('../attachments/wallpapers/background-lightmode-pica.png')")

            color.setProperty("--primary-color1", "#c0e6fd");
            localStorage.setItem("--primary-color1", "#c0e6fd");
            color.setProperty("--primary-color2", "#80aad3");
            localStorage.setItem("--primary-color2", "#80aad3");
            color.setProperty("--primary-color3", "#5b86b8");
            localStorage.setItem("--primary-color3", "#5b86b8");
            color.setProperty("--primary-color4", "#3f6593");
            localStorage.setItem("--primary-color4", "#3f6593");
            color.setProperty("--primary-color5", "#1b3554");
            localStorage.setItem("--primary-color5", "#1b3554");
            color.setProperty("--primary-color6", "#000f22");
            localStorage.setItem("--primary-color6", "#000f22");
        });
    }
)

if (darkMode && lightMode) {
    color.setProperty("--primary-color1", localStorage.getItem("--primary-color1"));
    color.setProperty("--primary-color2", localStorage.getItem("--primary-color2"));
    color.setProperty("--primary-color3", localStorage.getItem("--primary-color3"));
    color.setProperty("--primary-color4", localStorage.getItem("--primary-color4"));
    color.setProperty("--primary-color5", localStorage.getItem("--primary-color5"));
    color.setProperty("--primary-color6", localStorage.getItem("--primary-color6"));
    color.setProperty("--pic", localStorage.getItem("--pic"));
    

    if (localStorage.getItem("--primary-color1") === "#000f22") {
        darkMode.forEach((dark) => (dark.style.display = "none"));
        lightMode.forEach((light) => (light.style.display = "block"));
    } else {
        darkMode.forEach((dark) => (dark.style.display = "block"));
        lightMode.forEach((light) => (light.style.display = "none"));
    }
}

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
