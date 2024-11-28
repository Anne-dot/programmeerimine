const gameBoardTable = document.getElementById('game-board');

const height = 20;
const width = 20;

// ühendab HTML-i ID-ga
// const dataYTd = document.getElementById('data-y')

for (let y = 0; y < height; y++) {
    // console.log(y);
    const tr = document.createElement('tr')

    for (let x = 0; x < width; x++) {

        const td = document.createElement('td')

        td.dataset.y = y;
        td.dataset.x = x;

        tr.appendChild(td);
    }

    gameBoardTable.appendChild(tr);
}