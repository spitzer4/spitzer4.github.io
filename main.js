(function() {
	"use strict";
	
	/**
	 * Easy selector helper function
	 */
	const select = (el, all = false) => {
	  el = el.trim();
	  if (all) {
		return [...document.querySelectorAll(el)];
	  } else {
		return document.querySelector(el);
	  }
	};
	
	/**
	 * Easy event listener function
	 */
	const on = (type, el, listener, all = false) => {
	  let selectEl = select(el, all);
	  if (selectEl) {
		if (all) {
		  selectEl.forEach(e => e.addEventListener(type, listener));
		} else {
		  selectEl.addEventListener(type, listener);
		}
	  }
	};
	
	/**
	 * Easy on scroll event listener 
	 */
	const onscroll = (el, listener) => {
	  el.addEventListener('scroll', listener);
	};
	
	/**
	 * Toggle .header-scrolled class to #header when page is scrolled
	 */
	let selectHeader = select('#header');
	if (selectHeader) {
	  const headerScrolled = () => {
		if (window.scrollY > 100) {
		  selectHeader.classList.add('header-scrolled');
		} else {
		  selectHeader.classList.remove('header-scrolled');
		}
	  };
	  window.addEventListener('load', headerScrolled);
	  onscroll(document, headerScrolled);
	}
	
	/**
	 * Back to top button
	 */
	let backtotop = select('.back-to-top');
	if (backtotop) {
	  const toggleBacktotop = () => {
		if (window.scrollY > 100) {
		  backtotop.classList.add('active');
		} else {
		  backtotop.classList.remove('active');
		}
	  };
	  window.addEventListener('load', toggleBacktotop);
	  onscroll(document, toggleBacktotop);
	}
	
	/**
	 * Mobile nav toggle
	 */
	on('click', '.mobile-nav-toggle', function(e) {
	  select('#navbar').classList.toggle('navbar-mobile');
	  this.classList.toggle('bi-list');
	  this.classList.toggle('bi-x');
	});
	
	/**
	 * Mobile nav dropdowns activate
	 */
	on('click', '.navbar .dropdown > a', function(e) {
	  if (select('#navbar').classList.contains('navbar-mobile')) {
		e.preventDefault();
		this.nextElementSibling.classList.toggle('dropdown-active');
	  }
	}, true);
	
	/**
	 * Scroll with offset on links with a class name .scrollto
	 */
	on('click', '.scrollto', function(e) {
	  if (document.querySelector(this.hash)) {
		e.preventDefault();
		
		let navbar = select('#navbar');
		if (navbar.classList.contains('navbar-mobile')) {
		  navbar.classList.remove('navbar-mobile');
		  let navbarToggle = select('.mobile-nav-toggle');
		  navbarToggle.classList.toggle('bi-list');
		  navbarToggle.classList.toggle('bi-x');
		}
		
		scrollTo(this.hash);
	  }
	}, true);
	
	/**
	 * Scroll with offset on page load if URL has a hash
	 */
	window.addEventListener('load', () => {
	  if (window.location.hash) {
		if (document.querySelector(window.location.hash)) {
		  scrollTo(window.location.hash);
		}
	  }
	});
	
	function scrollTo(hash) {
	  let header = select('#header');
	  let offset = header.offsetHeight;
	  
	  let section = select(hash);
	  if(section) {
		let elementPos = section.offsetTop;
		window.scrollTo({
		  top: elementPos - offset,
		  behavior: 'smooth'
		});
	  }
	}
	
	/**
	 * Animation on scroll
	 */
	function aos_init() {
	  const skillsSections = select('.skills', true);
	  if (skillsSections.length > 0) {
		skillsSections.forEach(section => {
		  const progressBars = section.querySelectorAll('.progress-bar');
		  
		  // Function to animate skill bars
		  const animateSkillBars = () => {
			progressBars.forEach(progressBar => {
			  const value = progressBar.getAttribute('aria-valuenow');
			  progressBar.style.width = value + "%";
			});
		  };
		  
		  // Intersection Observer to trigger animation when in view
		  const observer = new IntersectionObserver(
			(entries) => {
			  if (entries[0].isIntersecting) {
				animateSkillBars();
				observer.unobserve(section);
			  }
			},
			{ threshold: 0.2 }
		  );
		  
		  observer.observe(section);
		});
	  }
	  
	  // Portfolio isotope and filter
	  const portfolioContainer = select('.portfolio-container');
	  if (portfolioContainer) {
		const portfolioIsotope = new Isotope(portfolioContainer, {
		  itemSelector: '.portfolio-item',
		  layoutMode: 'fitRows'
		});
		
		let portfolioFilters = select('#portfolio-filters li', true);
		
		on('click', '#portfolio-filters li', function(e) {
		  e.preventDefault();
		  portfolioFilters.forEach(function(el) {
			el.classList.remove('filter-active');
		  });
		  this.classList.add('filter-active');
		  
		  portfolioIsotope.arrange({
			filter: this.getAttribute('data-filter')
		  });
		}, true);
	  }
	}
	
	/**
	 * Initialize on document load
	 */
	window.addEventListener('load', () => {
	  aos_init();
	});
	
  })();