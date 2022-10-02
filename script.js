const WINNING_COMBINATIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

const cells = document.querySelectorAll("[dataInCell]");
const endMsg = document.querySelector(`[winner-data]`);
const board = document.getElementById("board");
const winningMessageElement = document.getElementById("winningMsg");
const restartbtn = document.getElementById("restartbtn");
let turn = false;
function startGame() {
    turn = false;
    cells.forEach((cell) => {
        cell.classList.remove('x');
        cell.classList.remove('o');
        cell.addEventListener('click', handleClick, { once: true })
    })
    setHoverTurn();
    winningMessageElement.classList.remove('show');
    endMsg.textContent = "";
}
startGame();
restartbtn.addEventListener("click", startGame);
function handleClick(e) {
    let cell = e.target;
    let currentturn = (turn) ? 'x' : 'o';
    placeMark(cell, currentturn);
    if (checkWin(currentturn)) {
        endGame(true);
    } else if (isDraw()) {
        endGame(false);
    } else {
        swapTurns();
        setHoverTurn();
    }
}
function placeMark(cell, curTurn) {
    cell.classList.add(curTurn);
}
function swapTurns() {
    turn = !turn;
}
function endGame(iswin) {
    if (iswin) {
        let winText = document.createTextNode(`${(turn ? 'X\'s' : 'O\'s')} wins`);
        endMsg.appendChild(winText);
    } else {
        let drawText = document.createTextNode(`Draw`);
        endMsg.appendChild(drawText);
    }
    winningMessageElement.classList.add("show");
}
function setHoverTurn() {
    board.classList.remove('x');
    board.classList.remove('o');
    if (turn) board.classList.add('x');
    else board.classList.add('o');
}
function checkWin(currentTurn) {
    found = false;
    for (let i = 0; i < WINNING_COMBINATIONS.length; i++) {
        ismatch = true;
        for (let j = 0; j < 3; j++) {
            if (!cells[WINNING_COMBINATIONS[i][j]].classList.contains(currentTurn)) ismatch = false;
        }
        found |= ismatch;
    }
    return found;
}
function isDraw() {
    return [...cells].every(cell => {
        return cell.classList.contains('x') || cell.classList.contains('o');
    })
}