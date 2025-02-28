window.onload = function() {
	function adjustContentHeight() {
		const headerHeight = document.querySelector('.header').offsetHeight;
		document.querySelector('.title').style.height = `calc(100vh - ${headerHeight}px - 80px)`;
	}

	adjustContentHeight(); // Initial adjustment

	window.addEventListener('resize', adjustContentHeight); // Adjust on resize
};

document.addEventListener("DOMContentLoaded", function () {
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll("#table-of-contents ul li a");
    const toc = document.getElementById("table-of-contents");

    function toggleTOC() {
        if (window.scrollY > 150) {
            toc.classList.add("visible");
        } else {
            toc.classList.remove("visible");
        }
    }

    function highlightNav() {
        let currentSection = "";
        
        sections.forEach((section) => {
            const sectionTop = section.offsetTop - 100;
            if (window.scrollY >= sectionTop) {
                currentSection = section.getAttribute("id");
            }
        });

        navLinks.forEach((link) => {
            link.classList.remove("active");
            if (link.getAttribute("href").substring(1) === currentSection) {
                link.classList.add("active");
            }
        });
    }

    window.addEventListener("scroll", () => {
        toggleTOC();
        highlightNav();
    });
});

