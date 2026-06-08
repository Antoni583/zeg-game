const lobby = document.getElementById("lobby");
const playBtn = document.getElementById("playBtn");

const area = document.querySelector(".area");
const ctx = area.getContext("2d");

const width = area.width;
const height = area.height;

let gameStarted = false;

const levels = [
  // Level 1
  [
[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
[0,0,0,0,1,0,0,0,0,0,1,0,0,0,0,1],
[1,1,1,0,1,0,1,1,1,0,1,0,1,1,0,1],
[1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,1],
[1,0,1,1,1,1,1,0,1,1,1,0,1,0,1,1],
[1,0,0,0,0,0,1,0,0,0,1,0,0,0,0,1],
[1,1,1,1,0,0,1,1,1,0,1,1,1,1,0,1],
[1,0,0,0,0,0,0,0,1,0,0,0,0,1,0,1],
[1,0,1,1,1,1,1,0,1,1,1,1,0,1,0,1],
[1,0,0,0,1,0,0,0,0,0,0,1,0,0,0,1],
[1,1,1,0,1,0,1,1,1,1,0,1,1,1,0,1],
[1,0,0,0,1,0,0,0,0,1,0,0,0,1,0,1],
[1,0,1,1,1,1,1,0,0,1,1,1,0,1,0,1],
[1,0,0,0,0,0,1,0,0,0,0,1,0,0,0,1],
[1,1,1,1,1,0,0,0,1,1,0,0,1,1,0,0],
[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
],

  // Level 2
  [
[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
[0,0,1,0,0,0,1,0,0,0,1,0,0,0,0,1],
[1,0,1,0,1,0,1,0,1,0,1,0,1,1,0,1],
[1,0,0,0,1,0,0,0,1,0,0,0,0,1,0,1],
[1,1,1,0,1,1,1,0,1,1,1,1,0,1,0,1],
[1,0,0,0,0,0,1,0,0,0,0,1,0,0,0,1],
[1,0,1,1,1,0,1,1,1,1,0,1,1,1,0,1],
[1,0,1,0,0,0,0,0,0,1,0,0,0,1,0,1],
[1,0,1,0,1,1,1,1,0,1,1,1,0,1,0,1],
[1,0,0,0,1,0,0,0,0,0,0,1,0,0,0,1],
[1,1,1,0,1,0,1,1,1,1,0,1,0,1,1,1],
[1,0,0,0,1,0,0,0,0,1,0,0,0,0,0,1],
[1,0,1,1,1,1,1,1,0,1,1,1,1,1,0,1],
[1,0,0,0,0,0,0,1,0,0,0,0,0,1,0,1],
[1,1,1,1,1,0,0,0,1,1,0,0,1,1,0,0],
[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
],

  // Level 3
 [
[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
[0,0,0,1,0,0,0,0,1,0,0,0,1,0,0,1],
[1,1,0,1,0,1,1,0,1,0,1,0,1,0,1,1],
[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],
[1,0,1,1,1,1,0,1,1,1,1,1,1,1,0,1],
[1,0,0,0,0,1,0,0,0,0,0,0,0,1,0,1],
[1,1,1,1,0,1,1,1,1,1,1,1,0,1,0,1],
[1,0,0,0,0,0,0,0,0,1,0,0,0,1,0,1],
[1,0,1,1,1,1,1,1,0,1,0,1,1,1,0,1],
[1,0,0,0,1,0,0,0,0,1,0,0,0,0,0,1],
[1,1,1,0,1,0,1,1,0,1,1,1,1,1,0,1],
[1,0,0,0,1,0,0,1,0,0,0,0,0,1,0,1],
[1,0,1,1,1,1,0,1,1,1,1,1,0,1,0,1],
[1,0,0,0,0,0,0,0,0,0,0,1,0,0,0,1],
[1,1,1,1,1,1,1,0,1,1,0,0,0,1,0,0],
[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
],
];

let currentLevel = 0;
let maze = levels[currentLevel];

// Parametry kwadratu
const size = 30;
const player = { x: 0, y: 1 };

const enemies = [
  { x: 5, y: 5, dir: "right" },
  { x: 10, y: 10, dir: "left" }
];

const finish = {
  x: 15,
  y: 14
};

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
//rysowaie przeciwników
function drawEnemies() {
  ctx.fillStyle = "blue";

  enemies.forEach(enemy => {
    ctx.fillRect(
      enemy.x * size,
      enemy.y * size,
      size,
      size
    );
  });
}

// Rysowanie kwadratu
function drawSquare() {
  ctx.fillStyle = "red";
  ctx.fillRect(player.x * size, player.y * size, size, size);

 
}
// Rysowanie wyjścia
function drawFinish() {
  ctx.fillStyle = "green";
  ctx.fillRect(finish.x * size, finish.y * size, size, size);
}

function moveEnemies() {

    if (!gameStarted) return;

  enemies.forEach(enemy => {

    let dx = 0;
    let dy = 0;

    switch (enemy.dir) {
      case "up":
        dy = -1;
        break;
      case "down":
        dy = 1;
        break;
      case "left":
        dx = -1;
        break;
      case "right":
        dx = 1;
        break;
    }

    const newX = enemy.x + dx;
    const newY = enemy.y + dy;

    if (
      newY >= 0 &&
      newY < maze.length &&
      newX >= 0 &&
      newX < maze[0].length &&
      maze[newY][newX] === 0
    ) {
      enemy.x = newX;
      enemy.y = newY;
    } else {

      const dirs = ["up", "down", "left", "right"];
      enemy.dir = dirs[Math.floor(Math.random() * dirs.length)];
    }

    if (enemy.x === player.x && enemy.y === player.y) {

      alert("Złapał cię przeciwnik!");

      player.x = 0;
      player.y = 1;
    }
  });

  drawGame();
}

function moveSquare(e) {

   if (!gameStarted) return;

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

  if (
    newY >= 0 &&
    newY < maze.length &&
    newX >= 0 &&
    newX < maze[0].length &&
    maze[newY][newX] === 0
  ) {
    player.x = newX;
    player.y = newY;

    enemies.forEach(enemy => {
      if (enemy.x === player.x && enemy.y === player.y) {
        alert("Złapał cię przeciwnik!");
        player.x = 0;
        player.y = 1;
      }
    });
  }

  if (player.x === finish.x && player.y === finish.y) {

    currentLevel++;

    if (currentLevel >= levels.length) {
      alert("Gratulacje! Ukończyłeś wszystkie poziomy!");
      return;
    }

    maze = levels[currentLevel];

    player.x = 0;
    player.y = 1;

    enemies[0].x = 5;
    enemies[0].y = 5;

    enemies[1].x = 10;
    enemies[1].y = 10;
  }

  drawGame();
}

  drawGame();


function drawGame() {
  ctx.clearRect(0, 0, width, height);
  drawMaze();
  drawFinish();
  drawEnemies();
  drawSquare();
}

window.addEventListener("keydown", moveSquare);
playBtn.addEventListener("click", () => {
  lobby.style.display = "none";
  area.style.display = "block";

  gameStarted = true;

  drawGame();
  setInterval(moveEnemies, 300);

});
