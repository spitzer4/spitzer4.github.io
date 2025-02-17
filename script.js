// Smooth Scroll
const links = document.querySelectorAll('nav ul li a');

links.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector(link.getAttribute('href'));
        target.scrollIntoView({ behavior: 'smooth' });
    });
});

// Dark Mode Toggle
const toggleButton = document.createElement('button');
let darkMode = false;
toggleButton.innerText = '🌙';
toggleButton.style.position = 'fixed';
toggleButton.style.top = '20px';
toggleButton.style.right = '20px';
toggleButton.style.background = 'transparent';
toggleButton.style.border = 'none';
toggleButton.style.fontSize = '2em';
toggleButton.style.cursor = 'pointer';
document.body.appendChild(toggleButton);

toggleButton.addEventListener('click', () => {
    darkMode = !darkMode;
    document.body.style.backgroundColor = darkMode ? '#fff' : '#111';
    document.body.style.color = darkMode ? '#111' : '#eee';
    toggleButton.innerText = darkMode ? '☀️' : '🌙';
});