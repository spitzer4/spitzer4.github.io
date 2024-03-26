const menuButton = document.querySelector('.menu-button');
const menuWrapper = document.querySelector('.navigation-menu-wrapper');

menuButton.addEventListener('click', () => {
  menuWrapper.classList.toggle('hidden');
});