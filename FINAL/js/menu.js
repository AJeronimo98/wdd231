// js/main.js - Funcionalidad global del sitio web
document.addEventListener('DOMContentLoaded', () => {
    const menuButton = document.getElementById('menu-button');
    const navMenu = document.getElementById('nav-menu');

    if (menuButton && navMenu) {
        menuButton.addEventListener('click', () => {
            navMenu.classList.toggle('open');
            const isOpen = navMenu.classList.contains('open');
            menuButton.setAttribute('aria-expanded', isOpen);
        });
    }
});