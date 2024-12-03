const gameBoardTable = document.getElementById('game-board');

// gameboard size
const height = 20;
const width = 20;

// initiate player
const playerY = Math.floor(width/2);
const playerX = Math.floor(height/2);

drawGameboard();

function drawGameboard() {

    gameBoardTable.innerText = '';

    for (let y = 0; y< height;y++){
    
        const tr = document.createElement('tr');
        
        for(let x = 0; x<width; x++){
    
            const td = document.createElement('td');
    
            td.dataset.y = y;
            td.dataset.x = x;


            // lisame mängija
            if(playerY == y && playerX == x){
                td.innerText = '😎';
            }
    
            tr.appendChild(td);

        }
    
        gameBoardTable.appendChild(tr);
    }
}

