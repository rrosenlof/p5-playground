
// EMOJIS MOVIN'
let cols = 40, rows = 40, s = 400, step = (s / cols), factor = 0.03;
let strings = ['🍊', '🍒', '🌽','🍕','🍤']

function setup() {
  createCanvas(s, s - step);
  textSize(step);
  fill(255);
  
}

function draw() {
  background(50);
  
  for(let y = 1; y < rows; y++) {
  	for(let x = 0; x < cols; x++) {
        n = noise(x * factor, y * factor, frameCount*0.01) *  2;
        n = (n - int(n)) * 3;
        cx = sin(n);
        cy = cos(n);
        i = floor(map(cx * cy, -0.5, 0.45, 0, strings.length-1));
    	  text(strings[i], x * step + 3, y * step);
    }
  }
  // noLoop()
}
