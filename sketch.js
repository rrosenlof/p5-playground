let img;
let colorSquare;
let arrSum;
let widthPerc;

function preload() {
  img = loadImage('assets/test.jpg');
}

function setup() {
  createCanvas(600, 600);
  pixelLength = 5;
  pixelWidth = 3;
  imageMode(CENTER);
  noStroke();
  background(255);

  img.loadPixels();

  img.filter(GRAY);
}

function draw() {
  for (let x = 0; x < img.width; x += 5) {
    for (let y = 0; y < img.height; y += 5) {
      let pix = img.get(x, y);
      arrSum = pix.reduce(getSum, 0);
      widthPerc = (arrSum) / (1020);
      if (arrSum > 600 && arrSum < 900) {
        colorSquare = ('yellow');
        fill(colorSquare);
        rect(x, y, pixelWidth * widthPerc, pixelLength);
      }
    }
  }
  for (let x = 0; x < img.width; x += 5) {
    for (let y = 0; y < img.height; y += 5) {
      let pix = img.get(x, y);
      arrSum = pix.reduce(getSum, 0);
      widthPerc = arrSum/750;
      if (arrSum < 750 && arrSum > 400) {
        colorSquare = ('cyan');
        fill(colorSquare);
        rect(x, y, pixelWidth * widthPerc, pixelLength);
      }
    }
  }
  for (let x = 0; x < img.width; x += 5) {
    for (let y = 0; y < img.height; y += 5) {
      let pix = img.get(x, y);
      arrSum = pix.reduce(getSum, 0);
      widthPerc = (arrSum / 550);
      if (arrSum < 550) {
        colorSquare = ('magenta');
        fill(colorSquare);
        rect((x), y, pixelWidth * widthPerc, pixelLength);
      }
    }
  }

  noLoop();
}

function getSum(total, num) {
  return total + num;
}