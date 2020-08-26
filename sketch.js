let img;

function preload() {
  img = loadImage('assets/test.jpg');
}

function setup(){
  createCanvas(600,400);
  smallPoint = 4;
  largePoint = 20;
  imageMode(CENTER);
  noStroke();
  background(255);
  
  img.loadPixels();
  
  img.filter(GRAY);
}

function draw() {
  for (let x = 0; x < img.width; x += 15) {
    for (let y = 0; y < img.height; y += 15) {
      let pix = img.get(x, y);
      fill(pix);
      rect(x, y, largePoint, largePoint);
    }
  }

  noLoop();
}