let img;
let colorSquare;
let arrSum;
let widthPerc;
let density = 10; //less than density 2 usually
let density2 = 12;
let xInc = 20;
let yInc = 20;
let threshold = 1020; //higher = darker
let pixelLength = 4;
let pixelWidth = 4;
let rectXOffset = 4;
let rectYOffset = 4;


function preload() {
  img = loadImage('assets/test9.jpg');
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
        let r = 55 - Math.floor(Math.random()*55);
        let g = 0 + Math.floor(Math.random()*55);;
        let b = 230;
        fill(r,g,b);
        // rect(x + (i * rectXOffset), y - (i * rectYOffset), (pixelWidth*i), (pixelLength*i));
        circle(x + (i * rectXOffset), y - (i * rectYOffset), pixelWidth);
      }
    }
  }

  noLoop();
}

function getSum(total, num) {
  return total + num;
}