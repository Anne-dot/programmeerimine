const gameBoardTable = document.getElementById('game-board');

const height = 24;
const width = 12;
const speed = 100;

const gameBoard = new Array(24).fill('').map(() => new Array(12).fill(''));

const blocks = [
    {
        'name': 'I',
        'shape': ['0_0', '0_1', '0_2', '0_3'],
        'class': 'i-block',
        'height': 1,
        'width': 4,
    },
    {
        'name': 'O',
        'shape': ['0_0', '0_1', '1_0', '1_1'],
        'class': 'o-block',
        'height': 2,
        'width': 2,
    },
    {
        'name': 'T',
        'shape': ['0_0', '0_1', '0_2', '1_1'],
        'class': 't-block',
        'height': 2,
        'width': 3,
    },
    {
        'name': 'S',
        'shape': ['0_1', '0_2', '1_0', '1_1'],
        'class': 's-block',
        'height': 2,
        'width': 3,
    },
    {
        'name': 'Z',
        'shape': ['0_0', '0_1', '1_1', '1_2'],
        'class': 'z-block',
        'height': 2,
        'width': 3,
    },
    {
        'name': 'L',
        'shape': ['0_0', '1_0', '2_0', '2_1'],
        'class': 'j-block',
        'height': 3,
        'width': 2,
    },
    {
        'name': 'J',
        'shape': ['0_1', '1_1', '2_1', '2_0'],
        'class': 'l-block',
        'height': 3,
        'width': 2,
    }
];

let currentBlock, currentBlockY, currentBlockX

initBlocks();

const intervalId = setInterval(runGame, speed)

drawGameboard();

function runGame() {
    drawGameboard();

    if (canMoveDown()) {
        currentBlockY++
    } else {
        stopBlock();
        initBlocks();
    }
}

function initBlocks() {
    currentBlock = blocks[Math.floor(Math.random() * blocks.length)];
    currentBlockY = 0 - currentBlock.height;
    currentBlockX = Math.floor((width - currentBlock.width) / 2);
}

function drawGameboard() {

    // currentBlockX++;

    gameBoardTable.innerHTML = '';

    for (let y = 0; y < height; y++) {

        const tr = document.createElement('tr')

        for (let x = 0; x < width; x++) {

            const td = document.createElement('td')

            td.dataset.y = y;
            td.dataset.x = x;

            // test if draws a block

            let cellCoordinates = (y - currentBlockY) + '_' + (x - currentBlockX);
            if (currentBlock.shape.includes(cellCoordinates)) {
                td.classList.add(currentBlock.class);
            }


            // draw fallen blocks
            if (gameBoard[y][x]) {
                td.classList.add(gameBoard[y][x]);
            }

            tr.appendChild(td);
        }

        gameBoardTable.appendChild(tr);
    }
}

function canMoveDown() {

    let canMoveDown = true;

    if (currentBlockY + currentBlock.height >= height) {
        canMoveDown = false;
    }

    currentBlock.shape.forEach(c => {

        let [y, x] = c.split('_');
        const shapeY = parseInt(y) + currentBlockY +1;
        const shapeX = parseInt(x) + currentBlockX;

        if (shapeY >= 0 && shapeY < height && shapeX >= 0 && shapeX < width) {
            if (gameBoard[shapeY][shapeX]) {
                canMoveDown = false;
            }
        }


    });

    return canMoveDown;


}

function stopBlock() {
    currentBlock.shape.forEach(element => {
        let [y, x] = element.split('_');
        gameBoard[parseInt(y) + currentBlockY][parseInt(x) + currentBlockX] = currentBlock.class

    });
}

// const blocks = [
//     {
//         'name': 'I',
//         'shape': ['0_0', '1_0', '2_0', '3_0'], 
//         'class': 'cyan'
//     }

// ]

// k2sit66, mida teeb ai, kui h2sti 2ra kirjeldada, yhe andsin n2iteks ette

