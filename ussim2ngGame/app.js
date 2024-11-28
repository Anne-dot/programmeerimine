const gameBoardTable = document.getElementById('game-board');

const height = 20;
const width = 30;

let foodY, foodX;
let snake = initSnake();

generateFood();
drawGameboard();

function generateFood() {
    foodY = Math.floor(Math.random() * height);
    foodX = Math.floor(Math.random() * width);
}

function initSnake() {
    const snakeY = Math.floor(height / 2);
    const snakeX = Math.floor(width / 2);

    return [snakeY + '_' + snakeX];
}

// ühendab HTML-i ID-ga
function drawGameboard() {

    for (let y = 0; y < height; y++) {
        // console.log(y);
        const tr = document.createElement('tr')

        for (let x = 0; x < width; x++) {

            const td = document.createElement('td')

            td.dataset.y = y;
            td.dataset.x = x;

            // kontrollima iga korral
            if (y == foodY && x == foodX) {
                td.innerText = '🥦';
            }

            if (snake.includes(y + '_' + x)) {
                td.innerText = '😈';
            }

            tr.appendChild(td);
        }

        gameBoardTable.appendChild(tr);
    }
}

