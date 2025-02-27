window.onload = function() {
	function adjustContentHeight() {
		const headerHeight = document.querySelector('.header').offsetHeight;
		document.querySelector('.title').style.height = `calc(100vh - ${headerHeight}px - 80px)`;
	}

	adjustContentHeight(); // Initial adjustment

	window.addEventListener('resize', adjustContentHeight); // Adjust on resize
};