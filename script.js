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

// Carousel functionality
var previousButton, nextButton;
var slidesContainer, slides, slideDots;
var leftMostSlideIndex = 0;
var slideGap = 5;

window.addEventListener('DOMContentLoaded', function(e) {
  previousButton = document.querySelector('.previous');
  nextButton = document.querySelector('.next');
  slidesContainer = document.querySelector('.slides');
  if (!slidesContainer) return; // no carousel on this page

  slides = slidesContainer.querySelectorAll('.slide');
  slideDots = document.querySelectorAll('.navigation li button');

  // Set up previous/next button behaviors (guard in case buttons are missing)
  if (previousButton) previousButton.addEventListener('click', previousSlide);
  if (nextButton) nextButton.addEventListener('click', nextSlide);

  // Ensure that all non-visible slides are impossible to reach.
  hideNonVisibleSlides();

  // Set up the slide dot behaviors
  slideDots.forEach(function(dot, idx) {
    dot.addEventListener('click', function(e) {
      // Use the clicked button (not inner span) to determine index
      goToSlide(idx);
    });
  });
});

/** Go to previous slide */
function previousSlide() {
  if(leftMostSlideIndex > 0) {
    goToSlide(leftMostSlideIndex - 1);
  } else {
    goToSlide(slides.length - 1);
  }
}

/** Go to next slide */
function nextSlide() {
  if(leftMostSlideIndex < slides.length - 1) {
    goToSlide(leftMostSlideIndex + 1);
  } else {
    goToSlide(0);
  }
}

/** Go to a specific slide */
function goToSlide(nextLeftMostSlideIndex) {
  // Clamp the requested index to valid range
  if (!slides || slides.length === 0) return;
  nextLeftMostSlideIndex = Math.max(0, Math.min(nextLeftMostSlideIndex, slides.length - 1));
  // Smoothly scroll to the requested slide
  // Calculate target scrollLeft using the target slide's offsetLeft for robustness
  var targetSlide = slides[nextLeftMostSlideIndex];
  var targetLeft = targetSlide ? targetSlide.offsetLeft : 0;
  // Use native smooth scrolling if available
  if (slidesContainer.scrollTo) {
    slidesContainer.scrollTo({ left: targetLeft, behavior: 'smooth' });
  } else {
    slidesContainer.scrollLeft = targetLeft;
  }
  
  // Unset aria-current attribute from any slide dots that have it
  if (slideDots && slideDots.length) {
    slideDots.forEach(function(dot) {
      dot.removeAttribute('aria-current');
    });

    // Set aria-current attribute on the correct slide dot if it exists
    if (slideDots[nextLeftMostSlideIndex]) {
      slideDots[nextLeftMostSlideIndex].setAttribute('aria-current', true);
    }
  }
  
  // Update the record of the left-most slide
  leftMostSlideIndex = nextLeftMostSlideIndex;
  
  // Update each slide so that the ones that are now off-screen are fully hidden.
  hideNonVisibleSlides();
}


/**
  Fully hide non-visible slides by adding aria-hidden="true" and tabindex="-1" when they go out of view
*/
function hideNonVisibleSlides() {
  // Start by hiding all the slides and their content
  slides.forEach(function(slide) {
    slide.setAttribute('aria-hidden', true);
    
    slide.querySelectorAll('a, button, select, input, textarea, [tabindex="0"]').forEach(function(focusableElement) {
      focusableElement.setAttribute('tabindex', -1);      
    });
  });
  
  // Since we know 3 slides are visible at a time, make sure that the 3 slides starting with the left-most one are not hidden to anybody.
  var visibleCount = 1;
  var total = slides.length;
  // clamp the start/end to valid indices
  var start = leftMostSlideIndex;
  var end = Math.min(total, start + visibleCount);

  if (start < total) {
    for (var i = start; i < end; i++) {
      slides[i].removeAttribute('aria-hidden');
      slides[i].querySelectorAll('a, button, select, input, textarea, [tabindex="0"]').forEach(function(focusableElement) {
        focusableElement.removeAttribute('tabindex');
      });
    }
  }

  // If we're near the end and fewer than visibleCount remain starting at leftMostSlideIndex,
  // make sure the last visibleCount slides are also accessible (wrap behavior)
  if (leftMostSlideIndex > total - visibleCount) {
    var lastStart = Math.max(0, total - visibleCount);
    for (var j = lastStart; j < total; j++) {
      slides[j].removeAttribute('aria-hidden');
      slides[j].querySelectorAll('a, button, select, input, textarea, [tabindex="0"]').forEach(function(focusableElement) {
        focusableElement.removeAttribute('tabindex');
      });
    }
  }
}