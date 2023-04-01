const squares = document.querySelectorAll(".square");
let player = 1;
let counter = 0;
let player1Name = "Jugador 1";
let player2Name = "Jugador 2";
let player1Color = "red";
let computerColor = "blue";

document.querySelector("#player1-name").textContent = player1Name;
document.querySelector("#player2-name").textContent = player2Name;

squares.forEach(square => {
    square.addEventListener("click", () => {
        if (player === 1) {
            if (square.style.backgroundColor === "") {
                square.style.backgroundColor = player1Color; // Pinta el cuadrado con el color del jugador
                counter++;
                let winnerColor = checkWin();
                if (winnerColor) {
                    let winnerName = getPlayerName(winnerColor);
                    if (winnerColor === player1Color) {
                        alert(winnerName + " gana!");
                    } else {
                        alert("La computadora gana!");
                    }
                    resetGame();
                } else if (counter === 9) {
                    alert("Empate!");
                    resetGame();
                } else {
                    player = 2;
                    computerMove();
                }
            }
        } else if (player === 2) {
            if (square.style.backgroundColor === "") {
                square.style.backgroundColor = computerColor;
                counter++;
                let winnerColor = checkWin();
                if (winnerColor) {
                    let winnerName = getPlayerName(winnerColor);
                    if (winnerColor === player1Color) {
                        alert(winnerName + " gana!");
                    } else {
                        alert("La computadora gana!");
                    }
                    resetGame();
                } else if (counter === 9) {
                    alert("Empate!");
                    resetGame();
                } else {
                    player = 1;
                }
            }
        }
    });
});

function computerMove() {
    let availableSquares = getAvailableSquares();
    let bestMove = minimax(availableSquares, computerColor);
    bestMove.square.style.backgroundColor = computerColor;
    player = 1;
    counter++;
    const win = checkWin(computerColor);
    if (!win && counter === 9) {
        alert("Empate!");
        resetGame();
    }
}

function getAvailableSquares() {
    let availableSquares = [];
    squares.forEach(square => {
        if (square.style.backgroundColor === "") {
            availableSquares.push(square);
        }
    });
    return availableSquares;
}

function checkWin() {
    let winningCombos = [[0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
    [0, 4, 8], [2, 4, 6] // diagonals
    ];
    for (let i = 0; i < winningCombos.length; i++) {
        let combo = winningCombos[i];
        let square1 = squares[combo[0]];
        let square2 = squares[combo[1]];
        let square3 = squares[combo[2]];
        if (square1.style.backgroundColor !== "" &&
            square1.style.backgroundColor === square2.style.backgroundColor &&
            square2.style.backgroundColor === square3.style.backgroundColor) {
            if (square1.style.backgroundColor === player1Color) {
                return player1Color;
            } else {
                return computerColor;
            }
        }
    }
    return null;
}

function getPlayerName(color) {
    if (color === player1Color) {
        return player1Name
    } else {
        return player2Name
    }
}

function resetGame() {
    squares.forEach(square => {
        square.style.backgroundColor = "";
    });
    player = 1;
    counter = 0;
}

function minimax(availableSquares, color) {
    // Verificar si alguien ha ganado el juego
    if (checkWin(player1Color)) {
        return { score: -10 };
    } else if (checkWin(computerColor)) {
        return { score: 10 };
    }

    // Verificar si no quedan movimientos disponibles
    if (availableSquares.length === 0) {
        return { score: 0 };
    }

    let moves = [];

    for (let i = 0; i < availableSquares.length; i++) {
        let move = {};
        move.square = availableSquares[i];
        availableSquares[i].style.backgroundColor = color;

        if (color === computerColor) {
            let result = minimax(getAvailableSquares(), player1Color);
            move.score = result.score;
        } else {
            let result = minimax(getAvailableSquares(), computerColor);
            move.score = result.score;
        }

        availableSquares[i].style.backgroundColor = "";
        moves.push(move);
    }

    // Encontrar el mejor movimiento
    let bestMove;
    if (color === computerColor) {
        let bestScore = -Infinity;
        for (let i = 0; i < moves.length; i++) {
            if (moves[i].score > bestScore) {
                bestScore = moves[i].score;
                bestMove = moves[i];
            }
        }
    } else {
        let bestScore = Infinity;
        for (let i = 0; i < moves.length; i++) {
            if (moves[i].score < bestScore) {
                bestScore = moves[i].score;
                bestMove = moves[i];
            }
        }
    }
    return bestMove;
}
