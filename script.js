document.addEventListener("DOMContentLoaded", function () {
    function adjustContentHeight() {
        const header = document.querySelector('.header');
        const title = document.querySelector('.title');

        if (!header || !title) return; // Stop if elements are missing

        const headerHeight = header.offsetHeight;
        title.style.height = `calc(100vh - ${headerHeight}px - 80px)`;
    }

    adjustContentHeight(); // Run once when the page loads
    window.addEventListener("resize", adjustContentHeight); // Adjust on resize
});


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

document.addEventListener("DOMContentLoaded", function () {
    const accordionItems = document.querySelectorAll('.accordion-item');

    accordionItems.forEach(item => {
        item.addEventListener('click', () => {
            item.classList.toggle('active');

            // Select the accordion content inside the clicked item
            const content = item.querySelector('.accordion-content');
            const icon = item.querySelector('span');

            if (!content || !icon) return; // Ensure elements exist before modifying

            // Toggle visibility
            if (item.classList.contains('active')) {
                content.style.display = 'block'; // Show content
                icon.textContent = '-'; // Change to minus
            } else {
                content.style.display = 'none'; // Hide content
                icon.textContent = '+'; // Change back to plus
            }
        });
    });
});

