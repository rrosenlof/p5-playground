let img;
let colorSquare;
let arrSum;
let widthPerc;

function preload() {
  img = loadImage('assets/test3.jpg');
}

function setup() {
  createCanvas(600, 600);
  pixelLength = 4;
  pixelWidth = 3;
  imageMode(CENTER);
  noStroke();
  background(255);

  img.loadPixels();

  img.filter(GRAY);
}

function draw() {
  // for (let x = 0; x < img.width; x += 5) {
  //   for (let y = 0; y < img.height; y += 5) {
  //     let pix = img.get(x, y);
  //     arrSum = pix.reduce(getSum, 0);
  //     widthPerc = (arrSum) / (1020);
  //     if (arrSum > 600 && arrSum < 900) {
  //       colorSquare = ('#e3a17d');
  //       fill(colorSquare);
  //       rect(x+1.25, y, (pixelWidth * widthPerc), pixelLength);
  //     }
  //   }
  // }
  for (let x = 0; x < img.width; x += 5) {
    for (let y = 0; y < img.height; y += 5) {
      let pix = img.get(x, y);
      arrSum = pix.reduce(getSum, 0);
      widthPerc = arrSum/1020;
      // if (arrSum < 750 && arrSum > 400) {
        colorSquare = ('brown');
        fill(colorSquare);
        rect(x+2.5, y, (pixelWidth * widthPerc), pixelLength);
      // }
    }
  }
  for (let x = 0; x < img.width; x += 10) {
    for (let y = 0; y < img.height; y += 5) {
      let pix = img.get(x, y);
      arrSum = pix.reduce(getSum, 0);
      widthPerc = 1 - (arrSum / 500);
      // if (arrSum < 550) {
        colorSquare = ('green');
        fill(colorSquare);
        rect(x, y, (pixelWidth * widthPerc), pixelLength);
      // }
    }
  }

  // for (let x = 0; x < img.width; x += 15) {
  //   for (let y = 0; y < img.height; y += 15) {
  //     let pix = img.get(x, y);
  //     fill(pix);
  //     rect(x, y, 20, 20);
  //   }
  // }

  noLoop();
}

function getSum(total, num) {
  return total + num;
}