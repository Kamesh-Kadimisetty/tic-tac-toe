let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

function handleCellClick(index) {
    if (!gameActive || gameBoard[index] !== '') {
        return;
    }

    gameBoard[index] = currentPlayer;
    document.getElementById(`cell${index}`).innerText = currentPlayer;

    if (checkWinner()) {
        showResult(`${currentPlayer} wins!`);
        gameActive = false;
    } else if (isBoardFull()) {
        showResult('It\'s a draw!');
        gameActive = false;
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        document.getElementById('status').innerText = `Current Player: ${currentPlayer}`;
    }
}

function checkWinner() {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6]             // Diagonals
    ];

    for (const pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (gameBoard[a] !== '' && gameBoard[a] === gameBoard[b] && gameBoard[b] === gameBoard[c]) {
            return true;
        }
    }

    return false;
}

function isBoardFull() {
    return !gameBoard.includes('');
}

function showResult(result) {
    document.getElementById('gameScreen').classList.add('hidden');
    document.getElementById('endScreen').classList.remove('hidden');
    document.getElementById('result').innerText = result;
}

function resetGame() {
    currentPlayer = 'X';
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;

    document.getElementById('status').innerText = 'Current Player: X';

    const cells = document.getElementsByClassName('cell');
    for (const cell of cells) {
        cell.innerText = '';
    }
}

function startNewGame() {
    document.getElementById('endScreen').classList.add('hidden');
    document.getElementById('gameScreen').classList.remove('hidden');
    resetGame();
}
// Dynamically create game board cells
const boardElement = document.getElementById('board');
for (let i = 0; i < 9; i++) {
    const cell = document.createElement('div');
    cell.className = 'cell';
    cell.id = `cell${i}`;
    cell.addEventListener('click', () => handleCellClick(i));
    boardElement.appendChild(cell);
}

// Initial status
document.getElementById('status').innerText = 'Current Player: X';

