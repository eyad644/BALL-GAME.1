const gameContainer = document.querySelector('.game-container');
const paddle = document.getElementById('paddle');
const ball = document.getElementById('ball');
const scoreDisplay = document.getElementById('score');
const highScoreDisplay = document.getElementById('highScore');

let paddleX = gameContainer.offsetWidth / 2 - paddle.offsetWidth / 2;
let ballX = gameContainer.offsetWidth / 2 - ball.offsetWidth / 2;
let ballY = 0;
let ballSpeedX = 2;
let ballSpeedY = 2;
let isGameOver = false;
let score = 0;
let highScore = 0;

// تحسين حركة الصحن بناءً على حركة الماوس
document.addEventListener('mousemove', (e) => {
    const gameContainerRect = gameContainer.getBoundingClientRect();
    paddleX = e.clientX - gameContainerRect.left - paddle.offsetWidth / 2;
    if (paddleX < 0) paddleX = 0;
    if (paddleX + paddle.offsetWidth > gameContainer.offsetWidth) paddleX = gameContainer.offsetWidth - paddle.offsetWidth;
    paddle.style.left = paddleX + 'px';
});

function moveBall() {
    if (isGameOver) return;

    ballX += ballSpeedX;
    ballY += ballSpeedY;

    if (ballX <= 0 || ballX + ball.offsetWidth >= gameContainer.offsetWidth) {
        ballSpeedX = -ballSpeedX;
    }

    if (ballY <= 0) {
        ballSpeedY = -ballSpeedY;
    }

    // التحقق من خسارة اللعبة عندما تضرب الكرة القاع
    if (ballY + ball.offsetHeight >= gameContainer.offsetHeight) {
        isGameOver = true;
        if (score > highScore) {
            highScore = score;
            highScoreDisplay.textContent = 'أعلى رقم: ' + highScore;
        }
        alert('Game Over!');
        location.reload(); // إعادة تحميل الصفحة عند الخسارة
        return;
    }

    // التحقق من اصطدام الكرة بالمضرب
    if (
        ballY + ball.offsetHeight >= gameContainer.offsetHeight - paddle.offsetHeight &&
        ballX + ball.offsetWidth > paddleX &&
        ballX < paddleX + paddle.offsetWidth
    ) {
        ballSpeedY = -ballSpeedY;
        score++;
        scoreDisplay.textContent = 'النقاط: ' + score;
    }

    ball.style.left = ballX + 'px';
    ball.style.top = ballY + 'px';

    requestAnimationFrame(moveBall);
}

moveBall();
