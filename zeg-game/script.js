const area = document.querySelector(".area");
const ctx = area.getContext("2d");

const width = area.width;
const height = area.height;

const maze = [
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 1],
  [1, 0, 1, 0, 1, 0, 1, 1, 0, 0, 0, 0, 1, 1],
  [1, 0, 1, 0, 0, 0, 0, 1, 1, 0, 1, 0, 0, 1],
  [1, 0, 1, 1, 1, 1, 0, 1, 0, 0, 1, 1, 0, 1],
  [1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1, 0, 0, 1],
  [1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 0, 1],
  [1, 0, 1, 1, 0, 0, 1, 1, 0, 1, 1, 0, 1, 1],
  [1, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1, 0, 0, 1],
  [1, 1, 0, 0, 0, 1, 0, 1, 0, 0, 1, 0, 1, 1],
  [1, 0, 0, 1, 1, 1, 0, 1, 1, 0, 0, 0, 0, 1],
  [1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
];

// Parametry kwadratu
const size = 30;
const player = { x: 0, y: 1 };

// Rysowanie labiryntu
function drawMaze() {
  for (let row = 0; row < maze.length; row++) {
    for (let col = 0; col < maze[row].length; col++) {
      if (maze[row][col] === 1) {
        ctx.fillStyle = "gray";
      } else {
        ctx.fillStyle = "white";
      }
      ctx.fillRect(col * size, row * size, size, size);
      ctx.strokeStyle = "white";
      ctx.lineWidth = 1;
      ctx.strokeRect(col * size, row * size, size, size);
    }
  }
}

// Rysowanie kwadratu
function drawSquare() {
  ctx.fillStyle = "red";
  ctx.fillRect(player.x * size, player.y * size, size, size);
}

function moveSquare(e) {
  let newX = player.x;
  let newY = player.y;

  switch (e.key) {
    case "ArrowUp":
      newY--;
      break;
    case "ArrowDown":
      newY++;
      break;
    case "ArrowLeft":
      newX--;
      break;
    case "ArrowRight":
      newX++;
      break;
  }

  if (maze[newY][newX] === 0) {
    player.x = newX;
    player.y = newY;
  }

  drawGame();
}

function drawGame() {
  ctx.clearRect(0, 0, width, height);
  drawMaze();
  drawSquare();
}

window.addEventListener("keydown", moveSquare);

drawGame();