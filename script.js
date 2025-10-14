document.addEventListener('DOMContentLoaded', function() {
	const menuToggle = document.querySelector('.menu-toggle');
	const body = document.body;

	menuToggle.addEventListener('click', function() {
		// Toggles both the 'menu-open' class on the body and the toggle button
		body.classList.toggle('menu-open');
		menuToggle.classList.toggle('menu-open');
	});
	
	// Optional: Close menu when a link is clicked
	const navLinks = document.querySelectorAll('.main-nav a');
	navLinks.forEach(link => {
		link.addEventListener('click', () => {
			body.classList.remove('menu-open');
			menuToggle.classList.remove('menu-open');
		});
	});
});