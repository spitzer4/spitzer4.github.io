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

const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('open');
});

document.querySelectorAll('.carousel').forEach(carousel => {
    const images = carousel.querySelectorAll('.carousel-img');
    const dots = carousel.querySelectorAll('.dot');
    let current = 0;

    function showImage(idx) {
        images.forEach((img, i) => img.classList.toggle('active', i === idx));
        dots.forEach((dot, i) => dot.classList.toggle('active', i === idx));
        current = idx;
    }

    dots.forEach((dot, idx) => {
        dot.addEventListener('click', () => showImage(idx));
    });

    // Optional: swipe support for mobile
    let startX = null;
    carousel.addEventListener('touchstart', e => startX = e.touches[0].clientX);
    carousel.addEventListener('touchend', e => {
        if (startX === null) return;
        let endX = e.changedTouches[0].clientX;
        if (endX - startX > 50) showImage(Math.max(0, current - 1));
        if (startX - endX > 50) showImage(Math.min(images.length - 1, current + 1));
        startX = null;
    });
});

document.addEventListener('DOMContentLoaded', function() {
  const filterTags = document.querySelectorAll('.filter-tag');
  const projects = document.querySelectorAll('.project-item');

  filterTags.forEach(tag => {
    tag.style.cursor = 'pointer';
    tag.addEventListener('click', function(e) {
      e.stopPropagation();
      e.preventDefault();

      // Remove 'active' from all filter tags
      filterTags.forEach(t => t.classList.remove('active'));
      // Add 'active' to clicked tag
      tag.classList.add('active');

      const selectedTag = tag.getAttribute('data-tag');
      projects.forEach(project => {
        const projectTags = project.getAttribute('data-tags') || '';
        if (selectedTag === 'All' || projectTags.split(',').map(t => t.trim()).includes(selectedTag)) {
          project.style.display = '';
        } else {
          project.style.display = 'none';
        }
      });
    });
  });
});