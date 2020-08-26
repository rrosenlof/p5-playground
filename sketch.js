// 2-D Perlin Noise for non-flat colors

var start = 0;
var inc = 0.01;

function setup() {
  createCanvas(200, 200);
  pixelDensity(1);
}

function draw() {
  
  var yoff = 0;

  loadPixels();
  for (var y =0; y < height; y++) {
    var xoff = 0;
    for (var x =0; x < width; x++) {
      var index = (x + y * width) * 4;
      var r = noise(xoff, yoff) * 8 * floor(random(-1,2));
      // console.log(r);
      pixels[index] = 20 + r;
      r = noise(xoff, yoff) * 8 * floor(random(-1,2));
      pixels[index+1] = 100 + r;
      r = noise(xoff, yoff) * 8 * floor(random(-1,2));
      pixels[index+2] = 150 + r;
      r = noise(xoff, yoff) * 8 * floor(random(-1,2));
      pixels[index+3] = 200;

      xoff += inc;

    }
    yoff += inc;
  }
  updatePixels();
  noLoop();
}