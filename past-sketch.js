// GRAPHING PERLIN NOISE 1-D:
// var start = 0;
// var inc = 0.001;

// function setup() {
//   createCanvas(400, 400)
// }

// function draw() {
//   background(30);
//   stroke(255);
//   noFill();
//   beginShape();
//   var xoff = start
//   for (var x =0; x < width; x++) {
//     stroke(255);
//     var y = noise(xoff)*height;
//     vertex(x, y);
//     xoff += inc;
//   }
//   endShape();

//   start += inc;
// }
// *******************************
// 2-D PERLIN NOISE

// var start = 0;
// var inc = 0.01;

// function setup() {
//   createCanvas(200, 200);
//   pixelDensity(1);
// }

// function draw() {
  
//   var yoff = 0;

//   loadPixels();
//   var xoff = start
//   for (var y =0; y < height; y++) {
//     var xoff = 0;
//     for (var x =0; x < width; x++) {
//       var index = (x + y * width) * 4;
//       var r = noise(xoff, yoff) * 255;
//       pixels[index] = r;
//       pixels[index+1] = r;
//       pixels[index+2] = r;
//       pixels[index+3] = 255;

//       xoff += inc;

//     }
//     yoff += inc;
//   }
//   updatePixels();
// }
// **********************************
// SQUAR
// function setup() {
//   createCanvas(windowWidth*0.8,windowHeight*0.8);
//   rectMode(CENTER)
// }
// function draw() {
//   background('black');
//   for(var x = 20 ; x < width-20 ; x+=20){
//     for(var y = 20 ; y < height-20 ; y+=20){
//       let level = noise(x*0.01, y*0.01, frameCount*0.03);
//       rect(x, y, 30*level, 30*level);
//     }
//   }
// }