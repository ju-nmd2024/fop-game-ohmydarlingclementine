let fairyX = 200;
let fairyY = 120;
let velocity = 0.5;
//gravity
let acceleration = 0.1;
//forceToFly
let thrust = -0.2;
let horizontalSpeed = 3.7;
let landed = false;
let gameStarted = false;
let startTime = 0;
let s = 3;

function setup() {
  createCanvas(400, 400);
}

function draw() {
  clear();

  if (gameStarted == false) {
    //startScreen
    background(245, 110, 170);
    fill(0);
    textSize(29);
    textAlign(CENTER);
    text("Fairy Lander", 176, 190);
    textSize(14);
    text("Press SPACE to start", 176, 230);
    return;
  }

  if (landed == true) {
    //resultScreen
    background(14, 142, 201);
    fill(0);
    textSize(24);
    textAlign(CENTER);
    text("you perfectly landed on the lotus!", 176, 190);
    textSize(16);
    text("press 'R' to restart", 176, 230);
    return;
  }
  noStroke();
  background(130, 190, 249);

  //lotus
  fill(10, 230, 106);
  rect(0, 350, width, 50);
  lotus(175, 350);

  velocity += acceleration;
  fairyY += velocity;

  //responds

  if (keyIsDown(32)) {
    velocity += thrust;
  }

  if (keyIsDown(LEFT_ARROW)) {
    fairyX -= horizontalSpeed;
  }
  if (keyIsDown(RIGHT_ARROW)) {
    fairyX += horizontalSpeed;
  }
  //range
  fairyX = constrain(fairyX, 0, width);

  //lotusLanding
  let lotusX = width / 2 + 14;
  let lotusY = 300;

  if (
    fairyY >= lotusY - 10 &&
    fairyY <= lotusY + 10 &&
    fairyX > lotusX - 25 &&
    fairyX < lotusX + 25
  ) {
    landed = true;
    //falling
    fairyY = lotusY - 10;
    velocity = 0;
  }

  fairyBody(fairyX, fairyY);

  if (landed == false) {
    //notLandedYet
    timeElapsed = millis() - startTime;
    let totalSeconds = timeElapsed / 100;
    fill(0);
    textSize(13);
    text("Time: " + totalSeconds + " seconds", 18, 20);
  }
}

function fairyBody(x, y) {
  //fairyDetails
  push();
  noStroke();
  translate(x, y);
  scale(0.5);
  ellipse(-110, -40, 70, 190);
  ellipse(-45, -40, 70, 190);

  fill(0, 109, 90);
  ellipse(-100, 60, 60, 116);
  ellipse(-55, 60, 60, 116);
  fill(80, 166, 160);
  ellipse(-100, 40, 50, 130);
  ellipse(-55, 40, 50, 130);

  //hair
  fill(233, 0, 183);
  rect(-109, -90, 70, 260, 50);

  //body
  fill(255, 224, 178);
  rect(-100, -80, 50, 70, 50);
  rect(-101, -17, 50, 130, 50);
  rect(-110, -12, 70, 20, 50);
  rect(-110, -12, 20, 90, 50);
  rect(-59, -12, 20, 90, 50);
  rect(-100, -17, 50, 180, 50);

  //outfit
  fill(48, 28, 99);
  rect(-100, 0, 50, 120, 50);
  pop();
}

function lotus(x, y) {
  push();
  translate(x, y);
  noStroke();
  fill(255, 182, 193);
  ellipse(0, 0, 100, 50);
  fill(255, 105, 180);
  ellipse(0, 0, 80, 40);
  fill(0, 255, 127); //center
  ellipse(0, 0, 50, 20);
  pop();
}

function keyPressed() {
  if (gameStarted == false && key === " ") {
    //startTheGame
    gameStarted = true;
    startTime = millis();
  }

  if (landed == true && (key === "r" || key === "R")) {
    //restartTheGame
    fairyX = 200;
    fairyY = 100;
    velocity = 0;
    landed = false;
    gameStarted = false;
  }
}
