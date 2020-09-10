let img;
let colorSquare;
let arrSum;
let widthPerc;

function preload() {
  img = loadImage('assets/test5.jpg');
}

function setup() {
  createCanvas(img.width, img.height);
  pixelLength = 3;
  pixelWidth = 3;
  imageMode(CENTER);
  noStroke();
  background(124);

  img.loadPixels();

  img.filter(GRAY);
}

function draw() {
  for (let x = 0; x < img.width; x += 5) {
    for (let y = 0; y < img.height; y += 5) {
      let pix = img.get(x, y);
      arrSum = pix.reduce(getSum, 0);
      widthPerc = arrSum / 1020;
      if (arrSum > 600 && arrSum < 900) {
        colorSquare = ('purple');
        fill(colorSquare);
        rect(x, y, pixelWidth * widthPerc, pixelLength);
      } else if (arrSum < 750 && arrSum > 400) {
        colorSquare = ('white');
        fill(colorSquare);
        rect(x, y, pixelWidth * widthPerc, pixelLength);
      } else if (arrSum < 550) {
        colorSquare = ('black');
        fill(colorSquare);
        rect(x, y, pixelWidth * widthPerc, pixelLength);
      }
    }
  }

  noLoop();
}

function getSum(total, num) {
  return total + num;
}