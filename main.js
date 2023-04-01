const squares = document.querySelectorAll(".square");
let player = 1;

squares.forEach(square => {
    square.addEventListener("click", () => {
        if (player === 1) {
            square.style.backgroundColor = "red";
            player = 2;
            if (!checkWin("red")) {
                computerMove();
            }
        }
    });
});

function computerMove() {
    let availableSquares = getAvailableSquares();
    let randomIndex = Math.floor(Math.random() * availableSquares.length);
    let square = availableSquares[randomIndex];
    square.style.backgroundColor = "blue";
    player = 1;
    checkWin("blue");
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

function checkWin(color) {
    let winningCombos = [[0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
    [0, 4, 8], [2, 4, 6] // diagonals
    ];
    for (let i = 0; i < winningCombos.length; i++) {
        let combo = winningCombos[i];
        let square1 = squares[combo[0]];
        let square2 = squares[combo[1]];
        let square3 = squares[combo[2]];
        if (square1.style.backgroundColor === color &&
            square2.style.backgroundColor === color &&
            square3.style.backgroundColor === color) {
            alert(color.toUpperCase() + " wins!");
            resetGame();
            return true;
        }
    }
    return false;
}

function resetGame() {
    squares.forEach(square => {
        square.style.backgroundColor = "";
    });
    player = 1;
}


// function minimax(availableSquares, color) {
//     if (checkWin("red")) {
//         return { score: -10 };
//     } else if (checkWin("blue")) {
//         return { score: 10 };
//     } else if (availableSquares.length === 0) {
//         return { score: 0 };
//     }

//     let moves = [];

//     for (let i = 0; i < availableSquares.length; i++) {
//         let move = {};
//         move.square = availableSquares[i];
//         availableSquares[i].style.backgroundColor = color;

//         if (color === "blue") {
//             let result = minimax(availableSquares, "red");
//             move.score = result.score;
//         } else {
//             let result = minimax(availableSquares, "blue");
//             move.score = result.score;
//         }

//         availableSquares[i].style.backgroundColor = "";
//         moves.push(move);
//     }

//     let bestMove;

//     if (color === "blue") {
//         let bestScore = -Infinity;
//         for (let i = 0; i < moves.length; i++) {
//             if (moves[i].score > bestScore) {
//                 bestScore = moves[i].score;
//                 bestMove = moves[i];
//             }
//         }
//     } else {
//         let bestScore = Infinity;
//         for (let i = 0; i < moves.length; i++) {
//             if (moves[i].score < bestScore) {
//                 bestScore = moves[i].score;
//                 bestMove = moves[i];
//             }
//         }
//     }

//     return bestMove;
// }