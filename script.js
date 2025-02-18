let flowers = [];

function setup() {
    let canvas = createCanvas(windowWidth, windowHeight);
    canvas.position(0, 0);
    canvas.style('z-index', '-1');
    for (let i = 0; i < 4; i++) {
        flowers.push(new Flower((i + 1) * (width / 5), height - 300));
    }
}

function draw() {
    clear();

	// Draw green rectangle at the bottom of the screen
    fill('#81c784'); // Green color
    noStroke();
    rect(0, height - 300, width, 300); // Green rectangle at the bottom

    for (let flower of flowers) {
        flower.display();
    }
}

class Flower {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.angle = random(TWO_PI);
        this.size = 50;
		this.stemHeight = 100; // Height of the stem
    }

    display() {
        push();
        translate(this.x, this.y);

		// Draw stem
        stroke('#2e7d32');  // Green color for the stem
        strokeWeight(6);  // Make the stem thick
        line(0, 0, 0, this.stemHeight);  // Draw stem from flower's center

        rotate(sin(this.angle) * 0.1);
        fill('#ff6f61');
        noStroke();
        for (let i = 0; i < 6; i++) {
            ellipse(0, this.size / 2, this.size, this.size * 1.5);
            rotate(PI / 3);
        }
        fill('#fff59d');
        ellipse(0, 0, this.size * 0.7, this.size * 0.7);
        pop();
        this.angle += 0.02;
    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}
