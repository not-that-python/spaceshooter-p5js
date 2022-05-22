// TODO: triple bullets
// "use strict";
let shipImage;
let ship;
let bulletImage;
let bullets;

function setup() {
	imageMode(CENTER)
	createCanvas(windowWidth, windowHeight);
	background(100);
	shipImage = loadImage("playerShip3_blue.png")
	bulletImage = loadImage("laserRed02.png")
	bullets = [];
	ship = {
		pos: createVector(width / 2, height / 2),
		vel: randomVel()
	}
}

function draw() {
	background(100);
	updateShip();
	drawShip();
	updateBullets();
	drawBullets();
	drawHUD();
}

function keyPressed() {
	if (key === " ") {
		createBullet()
		createBullet(-PI/12)
		createBullet(PI/12)
	}
	if (key === "s") {
		for (let i=0; i<20; i++) {
			createBullet(random(-PI, PI))
		}
	}
}

function createBullet(angleOffset=0) {
	const b = {
		pos: ship.pos.copy(),
		vel: p5.Vector.fromAngle(ship.vel.heading()+angleOffset, 5),
		isAlive: true
	};
	bullets.push(b)
}

function drawBullets() {
	for (const bullet of bullets) {
		push()
		translate(bullet.pos.x, bullet.pos.y)
		rotate(bullet.vel.heading() + (PI / 2))
		scale(0.5, 0.5)
		image(bulletImage, 0, 0)
		pop()
	};
}

function updateBullets() {
	for (const bullet of bullets) {
		bullet.pos.add(bullet.vel)
		if (bullet.pos.x >= width || bullet.pos.x <= 0 || bullet.pos.y >= height || bullet.pos.y <= 0) {
			bullet.isAlive = false
		}
	};
	cullDeadBullets()
}

function cullDeadBullets() {
	const aliveBullets = []
	for (const bullet of bullets) {
		if (bullet.isAlive) {
			aliveBullets.push(bullet)
		}
	}
	bullets = aliveBullets;
}

function respawn(ship) {
	ship.pos = createVector(50, 50)
	ship.vel = randomVel()
}

function randomVel() {
	let myAngle = random(PI * 2)
	let speed = random(0.5, 5)
	let v = p5.Vector.fromAngle(myAngle, speed);
	return v
}

function drawShip() {
	push();
	translate(ship.pos.x, ship.pos.y)
	rotate(ship.vel.heading() + (PI / 2))
	scale(0.3, 0.3)
	image(shipImage, 0, 0)
	pop();
}

function updateShip() {
	if (keyIsDown(LEFT_ARROW)) {
		ship.vel.setHeading(ship.vel.heading() - 0.1)
	}
	if (keyIsDown(RIGHT_ARROW)) {
		ship.vel.setHeading(ship.vel.heading() + 0.1)
	}
	if (keyIsDown(UP_ARROW)) {
		ship.vel.setMag(ship.vel.mag() + 0.1)
		ship.vel.limit(5)
	}
	if (keyIsDown(DOWN_ARROW)) {
		ship.vel.setMag(ship.vel.mag() - 0.1)
	}
	ship.pos.add(ship.vel)
}

function drawHUD() {
	push();
	textSize(100)
	fill("chartreuse")
	text(ship.vel.mag().toFixed(1), width - 200, 100)
	// text(("x:", round(ship.pos.x), "y:", round(ship.pos.y)), width-400, 200)
	pop();
}