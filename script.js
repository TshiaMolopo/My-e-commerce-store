const cells = document.querySelectorAll(".cell"); 
const statusText = document.querySelector(".status");
const resetButton = document.getElementById("reset");
let currentPlayer = "X";
let gameBoard = ["", "", "", "", "", "", "", "", ""];
const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], 
    [0, 3, 6], [1, 4, 7], [2, 5, 8], 
    [0, 4, 8], [2, 4, 6]
];

function checkWinner() {
    for (let combo of winningCombinations) {
        const [a, b, c] = combo;
        if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
            statusText.textContent = `${currentPlayer} Wins!`;
            cells[a].style.backgroundColor = "lightgreen";
            cells[b].style.backgroundColor = "lightgreen";
            cells[c].style.backgroundColor = "lightgreen";
            cells.forEach(cell => cell.removeEventListener("click", handleCellClick));
            return true;
        }
    }
    if (!gameBoard.includes("")) {
        statusText.textContent = "It's a Draw!";
        return true;
    }
    return false;
}

function handleCellClick(e) {
    const index = e.target.dataset.index;
    if (gameBoard[index] === "") {
        gameBoard[index] = currentPlayer;
        e.target.textContent = currentPlayer;
        if (!checkWinner()) {
            currentPlayer = currentPlayer === "X" ? "O" : "X";
        }
    }
}

cells.forEach(cell => cell.addEventListener("click", handleCellClick));

resetButton.addEventListener("click", () => {
    gameBoard.fill("");
    cells.forEach(cell => {
        cell.textContent = "";
        cell.style.backgroundColor = "#ddd";
        cell.addEventListener("click", handleCellClick);
    });
    statusText.textContent = "";
    currentPlayer = "X";
});