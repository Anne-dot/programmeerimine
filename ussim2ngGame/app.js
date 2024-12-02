const gameBoardTable = document.getElementById('game-board');
// loome element tyypi muutuja, kus n2itame skoori
const scoreSpan = document.getElementById('score');
const messageDiv = document.getElementById('message');
// high score elemendi muutuja the 
const highScoreSpan = document.getElementById('high-score');

const height = 10;
const width = 10;

const food = ['🍉', '🍒', '🥩', '🫘', '🧀', '🥪', '🍕', '🥕'];

let foodY, foodX, foodIndex;
let direction = 'n';
const speed = 200;
let snake = initSnake();

let score = 0;
// paneme score spani sisse muutuja score v22rtuse
scoreSpan.innerText = score;

let highScore = localStorage.getItem('high_score') || 0;
if ( !highScore ) {
  highScore = 0;
}

highScoreSpan.innerText = highScore;

document.addEventListener('keydown', e => {
    switch (e.key) {
        case 'ArrowUp':
            direction = 'n';
            break;
        case 'ArrowDown':
            direction = 's'
            break;
        case 'ArrowLeft':
            direction = 'w';
            break;
        case 'ArrowRight':
            direction = 'e';
            break;
    }
});

const intervalId = setInterval(runGame, speed)

generateFood();

function runGame() {
    updateSnake();
    drawGameboard();
}

function generateFood() {
    do {
        foodY = Math.floor(Math.random() * height);
        foodX = Math.floor(Math.random() * width);
    } while (snake.includes(foodY + '_' + foodX));

    foodIndex = Math.floor(Math.random() * food.length);
}

function initSnake() {
    const snakeY = Math.floor(height / 2);
    const snakeX = Math.floor(width / 2);

    return [snakeY + '_' + snakeX];
}

function updateSnake() {
    const head = snake[0].split('_');

    let headY = parseInt(head[0]);
    let headX = parseInt(head[1]);

    switch (direction) {

        case 'n':

            if (headY == 0) {
                headY = height - 1;
            } else {
                headY--;
            }

            break;

        case 's':
            if (headY == height - 1) {
                headY = 0;
            } else {
                headY++;
            }
            break;
        case 'w':
            if (headX == 0) {
                headX = width - 1;
            } else {
                headX--;
            }
            break;
        case 'e':
            if (headX == width - 1) {
                headX = 0;
            } else {
                headX++;
            } break;
    }

    // kontrollime, kas uus pea asukoht on ussi sees?
    if (snake.includes(headY + '_' + headX)) {
        messageDiv.innerText = 'Game over!';
        messageDiv.classList.remove('hidden');
        clearInterval(intervalId);

        if (score > highScore){
            localStorage.setItem('high_score', score)
        }
    }

    snake.unshift(headY + '_' + headX);

    if (headY == foodY && headX == foodX) {
        generateFood();

        score++;
        scoreSpan.innerText = score;
    } else {

        snake.pop();
    }
}

// ühendab HTML-i ID-ga
function drawGameboard() {

    gameBoardTable.innerHTML = '';

    for (let y = 0; y < height; y++) {
        // console.log(y);
        const tr = document.createElement('tr')

        for (let x = 0; x < width; x++) {

            const td = document.createElement('td')

            td.dataset.y = y;
            td.dataset.x = x;

            // kontrollima iga korral
            if (y == foodY && x == foodX) {
                td.innerText = food[foodIndex];
            }

            if (snake.includes(y + '_' + x)) {
                td.innerText = '😈';
            }

            tr.appendChild(td);
        }

        gameBoardTable.appendChild(tr);
    }
}

