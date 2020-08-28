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
    p.createCanvas(550, 550);
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

// ****************************
// ROOTS
let sketch = function(p) {
  let THE_SEED;
  let number_of_sources = 200;
  let padding = 50;

  let kill_range = 15;
  let growth = 5;

  let cluster_spread = 100;
  let cluster_size = 2000;

  let nodes;
  let sources;

  p.setup = function() {
    p.createCanvas(1000, 1000);
    THE_SEED = p.floor(p.random(9999999));
    p.randomSeed(THE_SEED);
    p.fill(255);
    //p.frameRate(2);
    p.stroke(50,0,150);
    p.strokeWeight(5);

    generate_sources();
    generate_root_node_on_circumference();
  };

  p.draw = function() {
    p.clear();
    update();
    display();
  };

  function display() {
    //sources.forEach(src => src.display());
    nodes.forEach(node => node.display());
  }

  function update() {
    for (let i = 0; i < sources.length; i++) {
      if (sources[i].alive) {
        let closest_node = find_closest_node(sources[i]);
        if (closest_node.pos.dist(sources[i].pos) < kill_range) sources[i].kill();
        closest_node.neighbors.push(sources[i]);
      }
    }

    let new_nodes = [];
    for (let n in nodes) {
      let node = nodes[n];
      if (node.neighbors.length > 0) {
        let dir = node.get_mean_dir();
        new_nodes.push(new Node(node.pos.x + dir.x * growth, node.pos.y + dir.y * growth, node.pos));
        node.neighbors = [];
      }
    }
    nodes = nodes.concat(new_nodes);
  }

  function generate_sources() {
    sources = [];
    for (let i = 0; i < cluster_size; i++) {
      //sources.push(new Source(p.random(padding, p.width - padding), p.random(padding, p.height - padding)));
      sources.push(
        new Source(p.randomGaussian(p.width / 2, cluster_spread), p.randomGaussian(p.height / 2, cluster_spread))
      );
    }
  }

  function generate_root_node() {
    nodes = [];
    for (let i = 0; i < 5; i++) {
      let xpos = p.random(0, p.width);
      let ypos = p.random(0, p.height);
      nodes.push(new Node(xpos, ypos, xpos, ypos));
    }
  }

  function generate_root_node_on_circumference() {
    nodes = [];
    for (let i = 0; i < 3; i++) {
      let angle = p.random(p.TAU);
      nodes.push(
        new Node(
          p.width / 2 + p.cos(angle) * 300,
          p.height / 2 + p.sin(angle) * 300,
          p.width / 2 + p.cos(angle) * 300,
          p.height / 2 + p.sin(angle) * 300
        )
      );
    }
  }

  function find_closest_node(source) {
    return nodes.reduce((acc, curr) => (acc.pos.dist(source.pos) < curr.pos.dist(source.pos) ? acc : curr));
  }

  class Source {
    constructor(x, y) {
      this.pos = p.createVector(x, y);
      this.alive = true;
    }

    kill() {
      this.alive = false;
    }

    display() {
      p.noStroke();
      p.fill(255, 0, 0);
      if (this.alive) {
        p.ellipse(this.pos.x, this.pos.y, 4, 4);
      }
    }
  }

  class Node {
    constructor(x, y, parent) {
      this.pos = p.createVector(x + p.randomGaussian(0, 1.5), y + p.randomGaussian(0, 1.5));
      this.parent_pos = parent;
      this.neighbors = [];
    }

    get_mean_dir() {
      let normalized = this.neighbors.map(n => p5.Vector.sub(n.pos, this.pos).normalize());
      return normalized.reduce((acc, curr) => p5.Vector.add(acc, curr)).normalize();
    }

    display() {
      p.stroke(50);
      p.line(this.parent_pos.x, this.parent_pos.y, this.pos.x, this.pos.y);
    }
  }

  p.keyPressed = function() {
    if (p.keyCode === 80) p.saveCanvas('sketch_' + THE_SEED, 'jpeg');
  };
};
new p5(sketch);

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
  // for (var y = 0; y < height; y++) {
  //   for (var x = 0; x < width; x++) {
  //     var index = (x + y * width) * 4;
  //     pixels[index + 0] = y;
  //     pixels[index + 1] = x;
  //     pixels[index + 2] = 240;
  //     pixels[index + 3] = random(230,240);
  //   }
  // }
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

// PIXELATE
let img;

function preload() {
  img = loadImage('assets/test.jpg');
}

function setup(){
  createCanvas(600,400);
  smallPoint = 4;
  largePoint = 20;
  imageMode(CENTER);
  noStroke();
  background(255);
  
  img.loadPixels();
  
  img.filter(GRAY);
}

function draw() {
  for (let x = 0; x < img.width; x += 15) {
    for (let y = 0; y < img.height; y += 15) {
      let pix = img.get(x, y);
      fill(pix);
      rect(x, y, largePoint, largePoint);
    }
  }

  noLoop();
}

// ***************************************
// CLOCK
let numbers = [
  {
    number: "1",
    squares: [
      [1, 2], [1, 5], [2, 1], [2, 2], [2, 3], [2, 4], [2, 5], [3, 5]
    ]
  },
  {
    number: "2",
    squares: [
      [1, 1], [1, 3], [1, 4], [1, 5], [2, 1], [2, 3], [2, 5], [3, 1], [3, 2], [3, 3], [3, 5]
    ]
  },
  {
    number: "3",
    squares: [
      [1, 1], [1, 5], [2, 1], [2, 3], [2, 5], [3, 1], [3, 2], [3, 3], [3, 4], [3, 5]
    ]
  },
  {
    number: "4",
    squares: [
      [1, 1], [1, 2], [2, 2], [3, 1], [3, 2], [3, 3], [3, 4], [3, 5]
    ]
  },
  {
    number: "5",
    squares: [
      [1, 1], [1, 2], [1, 3], [1, 5], [2, 1], [2, 3], [2, 5], [3, 1], [3, 3], [3, 4], [3, 5]
    ]
  },
  {
    number: "6",
    squares: [
      [1, 2], [1, 3], [1, 4], [1, 5], [2, 1], [2, 3], [2, 5], [3, 1], [3, 3], [3, 4], [3, 5]
    ]
  },
  {
    number: "7",
    squares: [
      [1, 1], [1, 4], [1, 5], [2, 1], [2, 3], [3, 1], [3, 2]
    ]
  },
  {
    number: "8",
    squares: [
      [1, 1], [1, 2], [1, 3], [1, 4], [1, 5], [2, 1], [2, 3], [2, 5], [3, 1], [3, 2], [3, 3], [3, 4], [3, 5]
    ]
  },
  {
    number: "9",
    squares: [
      [1, 1], [1, 2], [1, 3], [1, 5], [2, 1], [2, 3], [2, 5], [3, 1], [3, 2], [3, 3], [3, 4]
    ]
  },
  {
    number: "0",
    squares: [
      [1, 1], [1, 2], [1, 3], [1, 4], [1, 5], [2, 1], [2, 5], [3, 1], [3, 2], [3, 3], [3, 4], [3, 5]
    ]
  },
  {
    number: ":",
    squares: [
      [2, 2], [2, 4]
    ]
  }
]

function make2DArray(cols, row) {
  let arr = new Array(cols);
  for (let i = 0; i < arr.length; i++) {
    arr[i] = new Array(rows);
  }
  return arr;
}

let grid;
let cols;
let rows;
let resolution = 25;

function getDigit(name) {
  var num = numbers.find(num => num.number == name);
  return num;
}

function setup() {
  createCanvas(825, 175);
  frameRate()
  cols = width / resolution;
  rows = height / resolution;
  grid = make2DArray(cols, rows);
}

function draw() {
  // Gets the time, splits it into an array of strings
  let d = new Date();
  let h = d.getHours();
  let m = d.getMinutes();
  let s = d.getSeconds();
  s < 10 ? s = s.toString().padStart(2, '0') : null;
  let n = h.toString().concat(":", m, ":", s);
  n = n.toString().split("");

  // loops through each digit and 
  let digits = [];
  n.forEach(digit => {
    digits.push(getDigit(digit))
  });
  let offset = 0;
  digits.forEach(digit => {
    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        let x = (i + offset) * resolution;
        let y = j  * resolution;
        for (let k = 0; k < digit.squares.length; k++) {
          if (digit.squares[k][0] === i && digit.squares[k][1] === j) {
            grid[i + offset][j] = 1;
            // fill(0);
            // rect(x, y, resolution, resolution);
          }
        }
      }
    }

    offset += 4
  });

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let x = i * resolution;
      let y = j * resolution;
      if (grid[i][j] == 1) {
        fill(0);
        rect(x, y, resolution, resolution);
        grid[i][j] = 0
      } else {
        fill(34, 95, 60)
        rect(x, y, resolution, resolution)
      }
    }
  }

  // background(255);

  
}