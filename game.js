const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Game setup
const player = {
  x: canvas.width / 2,
  y: canvas.height / 2,
  size: 20,
  shieldAngle: 0
};

const bullets = [];

// Tracking pad
const pad = document.getElementById('trackingPad');

pad.addEventListener('touchmove', (e) => {
  const touch = e.touches[0];
  const rect = pad.getBoundingClientRect();

  const dx = touch.clientX - (rect.left + rect.width / 2);
  const dy = touch.clientY - (rect.top + rect.height / 2);

  const angle = Math.atan2(dy, dx);
  player.shieldAngle = angle;

  e.preventDefault();
}, { passive: false });

// Drawing functions
function drawPlayer() {
  // Player core
  ctx.fillStyle = 'green';
  ctx.beginPath();
  ctx.arc(player.x, player.y, player.size, 0, Math.PI * 2);
  ctx.fill();

  // Shield
  const shieldLength = 30;
  const sx = player.x + Math.cos(player.shieldAngle) * shieldLength;
  const sy = player.y + Math.sin(player.shieldAngle) * shieldLength;

  ctx.strokeStyle = 'white';
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.moveTo(player.x, player.y);
  ctx.lineTo(sx, sy);
  ctx.stroke();
}

function drawBullets() {
  ctx.fillStyle = 'red';
  bullets.forEach((b, index) => {
    b.x += b.dx;
    b.y += b.dy;

    // Remove if off-screen
    if (b.x < 0 || b.x > canvas.width || b.y < 0 || b.y > canvas.height) {
      bullets.splice(index, 1);
    } else {
      ctx.beginPath();
      ctx.arc(b.x, b.y, 5, 0, Math.PI * 2);
      ctx.fill();

      // Check collision with shield
      const shieldX = player.x + Math.cos(player.shieldAngle) * 30;
      const shieldY = player.y + Math.sin(player.shieldAngle) * 30;
      const dist = Math.hypot(b.x - shieldX, b.y - shieldY);
      if (dist < 10) {
        bullets.splice(index, 1);
      }
    }
  });
}

// Spawn bullets toward player
function spawnBullet() {
  const angle = Math.random() * Math.PI * 2;
  const speed = 2;

  const x = player.x + Math.cos(angle) * 200;
  const y = player.y + Math.sin(angle) * 200;

  const dx = (player.x - x) * 0.02;
  const dy = (player.y - y) * 0.02;

  bullets.push({ x, y, dx, dy });
}

setInterval(spawnBullet, 1000);

function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawPlayer();
  drawBullets();
  requestAnimationFrame(gameLoop);
}

gameLoop();
