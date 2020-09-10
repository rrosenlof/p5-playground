let img;
let colorSquare;
let arrSum;
let widthPerc;

function preload() {
  img = loadImage('assets/test7.jpg');
}

function setup() {
  createCanvas(img.width, img.height);
  pixelLength = 3;
  pixelWidth = 1;
  imageMode(CENTER);
  noStroke();
  background(240);

  img.loadPixels();

  img.filter(GRAY);
}

function draw() {
  for (let x = 0; x < img.width; x += 8) {
    for (let y = 0; y < img.height; y += 5) {
      let pix = img.get(x, y);
      arrSum = pix.reduce(getSum, 0);
      widthPerc = 8 - Math.ceil((arrSum / 1020) * 10);
      let xoff = 0.001
      let yoff = 0.001
      for (let i = 0; i < widthPerc; i += 1) {
        let noise_adj = noise(xoff, yoff) * (i+1)
        colorSquare = ('#234459');
        fill(colorSquare);
        rect(x + (i * 2) * noise_adj, y - (i * 2)* -noise_adj, pixelWidth, pixelLength);
      }
    }
  }

  noLoop();
}

function getSum(total, num) {
  return total + num;
}