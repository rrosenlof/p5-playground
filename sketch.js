let img;
let colorSquare;
let arrSum;
let widthPerc;
let density = 10; //less than density 2 usually
let density2 = 12;
let xInc = 15;
let yInc = 6;
let threshold = 1200; //higher = darker
let pixelLength = 3;
let pixelWidth = 3;
let rectXOffset = 3;
let rectYOffset = 3;


function preload() {
  img = loadImage('assets/test7.jpg');
}

function setup() {
  createCanvas(img.width, img.height);
  
  imageMode(CENTER);
  noStroke();
  background("#F2E8CE");

  img.loadPixels();
  let filterArr = [THRESHOLD, GRAY, OPAQUE, INVERT, DILATE, ERODE];
  img.filter(filterArr[1]);
}

function draw() {
  for (let x = 0; x < img.width; x += xInc) {
    for (let y = 0; y < img.height; y += yInc) {
      let pix = img.get(x, y);
      arrSum = pix.reduce(getSum, 0);
      widthPerc = density - Math.ceil((arrSum / threshold) * density2);
      for (let i = 0; i < widthPerc; i += 1) {
        colorSquare = ('#0D2E75');
        fill(colorSquare);
        rect(x + (i * rectXOffset), y - (i * rectYOffset), pixelWidth, pixelLength);
      }
    }
  }

  noLoop();
}

function getSum(total, num) {
  return total + num;
}