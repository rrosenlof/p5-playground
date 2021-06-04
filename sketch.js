let img;
let colorSquare;
let arrSum;
let widthPerc;
let density = 10

function preload() {
  img = loadImage('assets/test.jpg');
}

function setup() {
  createCanvas(img.width, img.height);
  pixelLength = 3;
  pixelWidth = 1;
  imageMode(CENTER);
  noStroke();
  background("#F2E8CE");

  img.loadPixels();

  img.filter(GRAY);
}

function draw() {
  for (let x = 0; x < img.width; x += 16) {
    for (let y = 0; y < img.height; y += 5) {
      let pix = img.get(x, y);
      arrSum = pix.reduce(getSum, 0);
      widthPerc = density - Math.ceil((arrSum / 1020) * 12);
      for (let i = 0; i < widthPerc; i += 1) {
        colorSquare = ('#0D2E75');
        fill(colorSquare);
        rect(x + (i * 2), y - (i * 2), pixelWidth, pixelLength);
      }
    }
  }

  noLoop();
}

function getSum(total, num) {
  return total + num;
}