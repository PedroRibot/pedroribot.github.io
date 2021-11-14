var menu_burger = document.getElementById("menu-burger");
var menu_nav = document.getElementById("menu-nav");

menu_burger.onclick = function() { toggleEvent(); };

function toggleEvent() {
    menu_burger.classList.toggle('clicked');
    menu_nav.classList.toggle('show');
}

function closeBurger() {
    menu_nav.classList.remove('show');
}