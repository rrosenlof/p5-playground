let img;
let colorSquare;
let arrSum;
let widthPerc;
let density = 10; //less than density 2 usually
let density2 = 12;
let xInc = 8;
let yInc = 8;
let threshold = 1020; //higher = darker
let pixelLength = 4;
let pixelWidth = 4;
let rectXOffset = 2;
let rectYOffset = 2;


function preload() {
  img = loadImage('assets/test7.jpg');
}

function setup() {
  createCanvas(img.width, img.height);
  
  imageMode(CENTER);
  noStroke();
  background("#2020bb");

  img.loadPixels();
  let filterArr = [THRESHOLD, GRAY, OPAQUE, INVERT, DILATE, ERODE];
  img.filter(filterArr[3]);
}

function draw() {
  for (let x = 0; x < img.width; x += xInc) {
    for (let y = 0; y < img.height; y += yInc) {
      let pix = img.get(x, y);
      arrSum = pix.reduce(getSum, 0);
      widthPerc = density - Math.ceil((arrSum / threshold) * density2);
      for (let i = 0; i < widthPerc; i += 1) {
        colorSquare = ('#F2E8CE');
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