document.addEventListener('DOMContentLoaded', () => {
	// Support two markup patterns used across pages:
	// 1) menu button with id="menu-button" and menu id="mobile-menu" (ventra/about)
	// 2) button with class="hamburger" and nav with class="nav-links" (index)
	const menuButton = document.getElementById('menu-button') || document.querySelector('.hamburger');
	const mobileMenu = document.getElementById('mobile-menu') || document.querySelector('.nav-links');

	if (!menuButton || !mobileMenu) return; // nothing to do on pages without a mobile menu

	function setIcon(button, open) {
		const icon = button.querySelector('svg');
		if (!icon) return;
		if (open) {
			icon.innerHTML = '<path d="M6 18L18 6M6 6l12 12" />';
		} else {
			icon.innerHTML = '<path d="M4 6h16M4 12h16m-16 6h16" />';
		}
	}

	function isUsingNavLinks(menu) {
		return menu.classList && menu.classList.contains('nav-links');
	}

	menuButton.addEventListener('click', () => {
		let isOpen;
		if (isUsingNavLinks(mobileMenu)) {
			isOpen = mobileMenu.classList.toggle('active');
		} else {
			isOpen = mobileMenu.classList.toggle('open');
		}

		// ARIA
		try { menuButton.setAttribute('aria-expanded', isOpen); } catch (e) {}

		setIcon(menuButton, isOpen);
	});

	// Smooth scrolling for anchor links and closing menu on mobile
	mobileMenu.querySelectorAll('a').forEach(link => {
		link.addEventListener('click', (e) => {
			const href = link.getAttribute('href');
			if (href && href.startsWith('#')) {
				e.preventDefault();
				const targetId = href.substring(1);
				const targetElement = document.getElementById(targetId);
				if (targetElement) targetElement.scrollIntoView({ behavior: 'smooth' });
			}

			// Close the menu after clicking a link if it's open
			if (isUsingNavLinks(mobileMenu) && mobileMenu.classList.contains('active')) {
				menuButton.click();
			}
			if (!isUsingNavLinks(mobileMenu) && mobileMenu.classList.contains('open')) {
				menuButton.click();
			}
		});
	});
});

