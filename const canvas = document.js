const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

canvas.width = 800;
canvas.height = 600;

const background = new Image();
background.src = 'assets/background.png';

const kitty = new Image();
kitty.src = 'assets/hello-kitty.png';

const platformImage = new Image();
platformImage.src = 'assets/platform.png';

const platforms = [
    { x: 0, y: 550, width: 800, height: 50 },
    { x: 300, y: 400, width: 100, height: 20 },
    { x: 500, y: 300, width: 100, height: 20 },
    { x: 700, y: 200, width: 100, height: 20 },
];

const player = {
    x: 50,
    y: 500,
    width: 32,
    height: 32,
    speed: 5,
    dx: 0,
    dy: 0,
    gravity: 0.5,
    jumpPower: -10,
    onGround: false
};

document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight' || e.key === 'd') {
        player.dx = player.speed;
    } else if (e.key === 'ArrowLeft' || e.key === 'a') {
        player.dx = -player.speed;
    } else if ((e.key === 'ArrowUp' || e.key === 'w') && player.onGround) {
        player.dy = player.jumpPower;
        player.onGround = false;
    }
});

document.addEventListener('keyup', (e) => {
    if (e.key === 'ArrowRight' || e.key === 'd') {
        player.dx = 0;
    } else if (e.key === 'ArrowLeft' || e.key === 'a') {
        player.dx = 0;
    }
});

function drawBackground() {
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
}

function drawPlatforms() {
    platforms.forEach(platform => {
        ctx.drawImage(platformImage, platform.x, platform.y, platform.width, platform.height);
    });
}

function drawPlayer() {
    ctx.drawImage(kitty, player.x, player.y, player.width, player.height);
}

function updatePlayer() {
    player.x += player.dx;
    player.y += player.dy;
    player.dy += player.gravity;

    if (player.x < 0) {
        player.x = 0;
    } else if (player.x + player.width > canvas.width) {
        player.x = canvas.width - player.width;
    }

    platforms.forEach(platform => {
        if (player.x < platform.x + platform.width &&
            player.x + player.width > platform.x &&
            player.y < platform.y + platform.height &&
            player.y + player.height > platform.y) {

            if (player.dy > 0) {
                player.y = platform.y - player.height;
                player.dy = 0;
                player.onGround = true;
            } else if (player.dy < 0) {
                player.y = platform.y + platform.height;
                player.dy = 0;
            }
        }
    });

    if (player.y + player.height > canvas.height) {
        player.y = canvas.height - player.height;
        player.dy = 0;
        player.onGround = true;
    }
}

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function gameLoop() {
    clearCanvas();
    drawBackground();
    drawPlatforms();
    drawPlayer();
    updatePlayer();
    requestAnimationFrame(gameLoop);
}

gameLoop();
