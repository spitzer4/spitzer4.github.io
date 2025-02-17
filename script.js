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

// Set canvas dimensions
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Define the number of triangles
const numTriangles = 30;
let triangles = [];

// Generate random colors
const colors = [
	'red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet'
];

// Triangle object constructor
function Triangle(x, y, size, speed, color) {
	this.x = x;
	this.y = y;
	this.size = size;
	this.speed = speed;
	this.color = color;
	this.dx = Math.random() * 2 - 1; // Random direction on x-axis
	this.dy = Math.random() * 2 - 1; // Random direction on y-axis
}

// Create random triangles
function createTriangles() {
	for (let i = 0; i < numTriangles; i++) {
		const x = Math.random() * canvas.width;
		const y = Math.random() * canvas.height;
		const size = Math.random() * 30 + 20;
		const speed = Math.random() * 1 + 0.5;
		const color = colors[Math.floor(Math.random() * colors.length)];
		triangles.push(new Triangle(x, y, size, speed, color));
	}
}

// Draw a static triangle
function drawTriangle(triangle) {
	ctx.beginPath();
	const x1 = triangle.x;
	const y1 = triangle.y;
	const size = triangle.size;

	ctx.moveTo(x1 + size, y1);
	ctx.lineTo(x1 - size, y1 + size);
	ctx.lineTo(x1 - size, y1 - size);
	ctx.closePath();
	ctx.fillStyle = triangle.color;
	ctx.fill();
}

// Update positions and animate triangles
function animate() {
	ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas

	triangles.forEach(triangle => {
		drawTriangle(triangle);

		// Update position based on direction (dx, dy)
		triangle.x += triangle.dx * triangle.speed;
		triangle.y += triangle.dy * triangle.speed;

		// Bounce off the edges
		if (triangle.x < 0 || triangle.x > canvas.width) triangle.dx = -triangle.dx;
		if (triangle.y < 0 || triangle.y > canvas.height) triangle.dy = -triangle.dy;
	});

	requestAnimationFrame(animate); // Keep animating
}

createTriangles(); // Create the initial triangles
animate(); // Start the animation