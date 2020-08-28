function make2DArray(cols, rows) {
  let arr = new Array(cols);
  for (let i = 0; i < arr.length; i++) {
    arr[i] = new Array(rows);
  }
  return arr;
}
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
let grid;
let cols;
let rows;
let resolution = 25;
let index = 0;

function setup() {
  createCanvas(825, 175);
  frameRate(4)
  cols = width / resolution;
  rows = height / resolution;
  grid = make2DArray(cols, rows);

  
}

function draw() {
  drawTime();
  index = (index + 1) % cols;
  
  background(0);
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let x = ((i + index) % cols) * resolution;
      let y = j * resolution;
      if (grid[i][j] == 1) {
        fill(255);
        stroke(0);
        rect(x, y, resolution - 1, resolution - 1);
        grid[i][j] = 0;
      } else {
        fill(34, 95, 60)
        rect(x, y, resolution -1, resolution-1)
      }
    }
  }
}

function getDigit(name) {
  var num = numbers.find(num => num.number == name);
  return num;
}

function drawTime() {
  let d = new Date();
  let h = d.getHours();
  let m = d.getMinutes();
  m < 10 ? m = m.toString().padStart(2, '0') : null;
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
}

// ******************************************

// // Daniel Shiffman
// // http://youtube.com/thecodingtrain
// // http://codingtra.in

// // Coding Challenge 117: Seven Segment Display
// // https://youtu.be/MlRlgbrAVOs

// // p5.js editor version: 0.7.2 (September 02, 2018)
// // https://editor.p5js.org/codingtrain/sketches/HkP4CF09X

// let nums = [0x7e, 0x30, 0x6d, 0x79, 0x33, 0x5b, 0x5f, 0x70, 0x7f, 0x7b];
// let index = 0;

// function setup() {
//   createCanvas(400, 400);
//   frameRate(3);
// }

// function draw() {
//   background(0);
//   sevenSegment(nums[index]);
//   index = (index + 1) % nums.length;
// }

// function getColor(val, shift) {
//   let r = 255;
//   let g = 0;
//   let b = 0;
//   let a = 40 + 255 * ((val >> shift) & 1);
//   return color(r, g, b, a);
// }

// function sevenSegment(val) {
//   push();
//   noStroke();
//   noFill();
//   // A
//   fill(getColor(val, 6));
//   rect(60, 20, 78, 18, 10, 10);
//   // B
//   fill(getColor(val, 5));
//   rect(140, 40, 18, 98, 10, 10);
//   // C
//   fill(getColor(val, 4));
//   rect(140, 160, 18, 98, 10, 10);
//   // D
//   fill(getColor(val, 3));
//   rect(60, 260, 78, 18, 10, 10);
//   // E
//   fill(getColor(val, 2));
//   rect(40, 160, 18, 98, 10, 10);
//   // F
//   fill(getColor(val, 1));
//   rect(40, 40, 18, 98, 10, 10);
//   // G
//   fill(getColor(val, 0));
//   rect(60, 140, 78, 18, 10, 10);

//   pop();
// }