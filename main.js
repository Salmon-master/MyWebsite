// main.js
// This script adds a fade effect to an arrow icon when the page is scrolled
// OnScroll event handler


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



// When the user scrolls the page, execute myFunction

window.addEventListener('scroll', (event) => {
    var winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    var height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    var scrolled = (winScroll / height) * 100;
    console.log(window.getComputedStyle(document.getElementById("myBar")).getPropertyValue("width"), scrolled);
    // handle the scroll event 
    document.getElementById("myBar").style.width = scrolled + "%";
});

