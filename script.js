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

const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

function setup() {
	createCanvas(windowWidth, windowHeight);
	background(0);
	noFill();
	strokeWeight(3);

	let colors = [
		color(255, 0, 0),    // Red
		color(255, 165, 0),  // Orange
		color(255, 255, 0),  // Yellow
		color(0, 128, 0),    // Green
		color(0, 0, 255),    // Blue
		color(75, 0, 130),   // Indigo
		color(238, 130, 238) // Violet
	];

	for (let y = 50; y < height; y += 50) {
		beginShape();
		stroke(random(colors));
		for (let x = 0; x < width; x += 20) {
			let offsetY = map(noise(x * 0.05, y * 0.05), 0, 1, -30, 30);
			curveVertex(x, y + offsetY);
		}
		endShape();
	}
}

function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
	redraw();
}
  