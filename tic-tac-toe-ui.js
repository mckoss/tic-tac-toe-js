window.onload = onLoaded;

let cells;
let board;
let side;
let announce;

function onLoaded() {
    cells = document.querySelectorAll('td');
    announce = document.querySelector('div.announce');

    for (let i = 0; i < 9; i++) {
        cells[i].onclick = () => {
            onClickCell(i);
        };
    }

    restartGame();
}

function restartGame() {
    board = [0,0,0,0,0,0,0,0,0];
    side = 1;
    displayBoard(board);
    announce.textContent = '';
}

function checkGame() {
    let winner = hasWon(board);

    if (winner !==0) {
        let mark = winner === 1 ? 'X' : 'O';
        announce.textContent = `${mark} wins!`;
        return;
    }

    if (isFull(board)) {
        announce.textContent = 'Draw!';
    }
}

function computerMoves() {
    let bestMove = findBestMove(board, side);
    if (bestMove.pos !== undefined) {
        board[bestMove.pos] = side;
        side = -side;
        displayBoard(board);
    }
    checkGame();
}

function onClickCell(i) {
    console.log(`Number ${i} got clicked!`);

    if (isFull(board) || hasWon(board) !== 0) {
        console.log(`Game is over - stop playing!=`);
        return;
    }

    if (board[i] !== 0) {
        console.log('Cell already taken!');
        return;
    }
    board[i] = side;
    side = -side;
    displayBoard(board);
    computerMoves();
}

function displayBoard(board) {
    for (let i = 0; i < 9; i++) {
        let value = ' ';
        if (board[i] == -1) {
            value = 'O';
        } else if (board[i] == 1) {
            value = 'X';
        }
        cells[i].textContent = value;
    }
}