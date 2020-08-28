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