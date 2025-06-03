// DOM elements
const navToggle = document.querySelector('.nav__hamburger');
const navList = document.querySelector('.nav__list');
const scrollTopBtn = document.querySelector('.scroll-top');

// Mobile navigation toggle
if (navToggle) {
  navToggle.addEventListener('click', () => {
    navList.classList.toggle('display-nav-list');
    const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', !isExpanded);
  });
}

// Close mobile menu when link is clicked
document.querySelectorAll('.link--nav').forEach(link => {
  link.addEventListener('click', () => {
    navList.classList.remove('display-nav-list');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});