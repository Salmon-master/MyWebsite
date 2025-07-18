// main.js
// This script adds a fade effect to an arrow icon when the page is scrolled
// OnScroll event handler

const arrow = document.getElementById("arrow")

const myFunction = () => {
    var scroll = window.scrollY || document.documentElement.scrollTop || document.body.scrollTop || 0;
    // If scroll value is more than 0 - means the page is scrolled, add or remove class based on thatS
    arrow.classList.remove("fade");
    if (scroll > 0) {
        arrow.classList.add("fade");

    } else {
        arrow.classList.remove("fade");

    }
}
// Toggle menu visibility
// This function toggles the visibility of the menu when the menu button is clicked
let show = false;
const menuBtn = document.getElementsByClassName("menu-btn");

function onToggle() {
    show **= -1;
    const navbar = document.getElementsByClassName("navbar")[0];
    const menuList = [].slice.call(document.getElementsByClassName("menu-item"));
    
    console.log("menuList", menuList);
    if (show == false) {
        menuBtn[0].classList.remove("close");
        navbar.classList.remove("open");
        menuList.forEach(p => { p.classList.remove("open") });
    }
    else {
        menuBtn[0].classList.add("close");
        navbar.classList.add("open");
        menuList.forEach(p => { p.classList.add("open") });

    }
}
// Use the function
arrow.addEventListener("animationiteration", myFunction);
window.addEventListener('scroll', () => console.log(window.scrollY)
)