// GRAPHING PERLIN NOISE 1-D:
var start = 0;
var inc = 0.001;

function setup() {
  createCanvas(400, 400)
}

function draw() {
  background(30);
  stroke(255);
  noFill();
  beginShape();
  var xoff = start
  for (var x =0; x < width; x++) {
    stroke(255);
    var y = noise(xoff)*height;
    vertex(x, y);
    xoff += inc;
  }
  endShape();

  start += inc;
}
// *******************************
// 2-D PERLIN NOISE

var start = 0;
var inc = 0.01;

function setup() {
  createCanvas(200, 200);
  pixelDensity(1);
}

function draw() {
  
  var yoff = 0;

  loadPixels();
  var xoff = start
  for (var y =0; y < height; y++) {
    var xoff = 0;
    for (var x =0; x < width; x++) {
      var index = (x + y * width) * 4;
      var r = noise(xoff, yoff) * 255;
      pixels[index] = r;
      pixels[index+1] = r;
      pixels[index+2] = r;
      pixels[index+3] = 255;

      xoff += inc;

    }
    yoff += inc;
  }
  updatePixels();
}
// **********************************
// SQUAR
function setup() {
  createCanvas(windowWidth*0.8,windowHeight*0.8);
  rectMode(CENTER)
}
function draw() {
  background('black');
  for(var x = 20 ; x < width-20 ; x+=20){
    for(var y = 20 ; y < height-20 ; y+=20){
      let level = noise(x*0.01, y*0.01, frameCount*0.03);
      rect(x, y, 30*level, 30*level);
    }
  }
}
// ********************************
// EMOJIS MOVIN'
let cols = 40, rows = 40, s = 400, step = (s / cols), factor = 0.003;
let strings = ['🍒','🍊','🍕','🍤', '🌽']

function setup() {
  createCanvas(s, s - step);
  textSize(step);
  fill(255);
  
}

function draw() {
  background(50);
  
  for(let y = 1; y < rows; y++) {
  	for(let x = 0; x < cols; x++) {
        n = noise(x * factor, y * factor, frameCount*0.001) *  2;
        n = (n - int(n)) * 3;
        cx = sin(n);
        cy = cos(n);
        i = floor(map(cx * cy, -0.5, 0.45, 0, strings.length-1));
    	  text(strings[i], x * step + 3, y * step);
    }
  }
  // noLoop()
}
// ********************************
// NOISY RINGS (https://github.com/kgolid/p5ycho/tree/master/trunk)
let sketch = function (p) {

  let rings = 140;
  let dim_init = 0;
  let dim_delta = 4;

  let chaos_init = .2;
  let chaos_delta = 0.12;
  let chaos_mag = 20;

  let ox = p.random(10000);
  let oy = p.random(10000);
  let oz = p.random(10000);

  let colors = [[255,204,0],[30,204,0]];

  p.setup = function () {
    p.createCanvas(800, 800);
    p.strokeWeight(3);
    p.smooth();
    p.noFill();
    //p.noLoop();

  }

  p.draw = function () {
    p.clear();
    
    p.translate(p.width / 2, p.height / 2);
    display();
  }

  function display() {
    
    //ox+=0.04;
    //oy-=0.02;
    oz += 0.01;
    for (let i = 0; i < rings; i++) {
      p.stroke(colors[i % 2]);
      p.beginShape();
      for (let angle = 0; angle < 360; angle++) {
        let radian = p.radians(angle);
        let radius = (chaos_mag * getNoiseWithTime(radian, chaos_delta * i + chaos_init, oz)) + (dim_delta * i + dim_init);
        p.vertex(radius * p.cos(radian), radius * p.sin(radian));
      }
      p.endShape(p.CLOSE);
    }
  }

  function getNoiseWithTime(radian, dim, time) {
    let r = radian % p.TWO_PI;
    if (r < 0.0) { r += p.TWO_PI; }
    return p.noise(ox + p.cos(r) * dim, oy + p.sin(r) * dim, oz + time);
  }
}

new p5(sketch);