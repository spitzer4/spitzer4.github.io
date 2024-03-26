document.addEventListener("DOMContentLoaded", function() {
    const menuButton = document.querySelector(".menu-button");
    const menuWrapper = document.querySelector(".navigation-menu-wrapper");

    menuButton.addEventListener("click", function() {
        menuWrapper.classList.toggle("open");
    });
});