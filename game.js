const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

let shieldDirection = null;
let heart = { x: 150, y: 150, size: 20 };

function drawHeart() {
  ctx.fillStyle = "lime";
  ctx.beginPath();
  ctx.moveTo(heart.x, heart.y);
  ctx.arc(heart.x - 5, heart.y - 5, 5, 0, Math.PI * 2);
  ctx.arc(heart.x + 5, heart.y - 5, 5, 0, Math.PI * 2);
  ctx.lineTo(heart.x, heart.y + 10);
  ctx.closePath();
  ctx.fill();
}

function drawShield() {
  ctx.strokeStyle = "#0f0";
  ctx.lineWidth = 4;

  switch (shieldDirection) {
    case "up":
      ctx.beginPath();
      ctx.moveTo(heart.x - 10, heart.y - 20);
      ctx.lineTo(heart.x + 10, heart.y - 20);
      ctx.stroke();
      break;
    case "down":
      ctx.beginPath();
      ctx.moveTo(heart.x - 10, heart.y + 20);
      ctx.lineTo(heart.x + 10, heart.y + 20);
      ctx.stroke();
      break;
    case "left":
      ctx.beginPath();
      ctx.moveTo(heart.x - 20, heart.y - 10);
      ctx.lineTo(heart.x - 20, heart.y + 10);
      ctx.stroke();
      break;
    case "right":
      ctx.beginPath();
      ctx.moveTo(heart.x + 20, heart.y - 10);
      ctx.lineTo(heart.x + 20, heart.y + 10);
      ctx.stroke();
      break;
  }
}

function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawHeart();
  drawShield();
  requestAnimationFrame(gameLoop);
}
gameLoop();

// Drag Gesture Detection
const dragPad = document.getElementById("dragPad");
let startX, startY;

dragPad.addEventListener("touchstart", (e) => {
  const touch = e.touches[0];
  startX = touch.clientX;
  startY = touch.clientY;
});

dragPad.addEventListener("touchend", (e) => {
  const touch = e.changedTouches[0];
  const deltaX = touch.clientX - startX;
  const deltaY = touch.clientY - startY;

  if (Math.abs(deltaX) > Math.abs(deltaY)) {
    shieldDirection = deltaX > 0 ? "right" : "left";
  } else {
    shieldDirection = deltaY > 0 ? "down" : "up";
  }
});
