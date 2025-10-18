const readline = require('readline-sync');

const player = "X"; 
const machine = "O"; 
const empty = " ";
let board = [
    empty, empty, empty,
    empty, empty, empty,
    empty, empty, empty
];
let currentPlayer = player;
let gameOver = false;

let gameMode = 'PVP';
let difficulty = 'facil';

function pularLinha() {
    console.log("\n");
}

function printBoard(board) {
    console.clear(); 
    pularLinha();
    console.log(` ${board[0]} | ${board[1]} | ${board[2]}   (1 | 2 | 3)`);
    console.log("---|---|---");
    console.log(` ${board[3]} | ${board[4]} | ${board[5]}   (4 | 5 | 6)`);
    console.log("---|---|---");
    console.log(` ${board[6]} | ${board[7]} | ${board[8]}   (7 | 8 | 9)`);
    pularLinha();
}


function handlePlayerMove() {
    let validMove = false;

    while (!validMove) {
       
        const move = parseInt(readline.question(`Jogador ${currentPlayer}, inserir jogada entre 1 e 9: `));
        const position = move - 1;

        if (position >= 0 && position < 9 && board[position] === empty) {
            board[position] = currentPlayer;
            validMove = true;
        } else {
            console.log("Jogada inválida. Tente novamente.");
        }
    }
}

function checkWin() {
    const win = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8], 
        [0, 4, 8], [2, 4, 6]             
    ];
    for (let i = 0; i < win.length; i++) {
        let comb = win[i];
        if (board[comb[0]] === currentPlayer &&
            board[comb[1]] === currentPlayer &&
            board[comb[2]] === currentPlayer
        ) {
            return true;
        }
    }
    return false;
}


function switchPlayer() {
    currentPlayer = currentPlayer === player ? machine : player;
    
}


function checkDraw() {
    for (let i = 0; i < board.length; i++) {
        if (board[i] === empty) {
            
            return false;
        }
    }
    
    return true;
}



function getAvailableMoves(currentBoard) {
    const moves = [];
    for (let i = 0; i < currentBoard.length; i++) {
        if (currentBoard[i] === empty) {
            moves.push(i);
        }
    }
    return moves;
}


function checkWinHelper(boardToCheck, symbol) {
    const win = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];
    for (let i = 0; i < win.length; i++) {
        let comb = win[i];
        if (boardToCheck[comb[0]] === symbol &&
            boardToCheck[comb[1]] === symbol &&
            boardToCheck[comb[2]] === symbol
        ) {
            return true;
        }
    }
    return false;
}


function findStrategicMove(boardToCheck, symbol) {
    const availableMoves = getAvailableMoves(boardToCheck);

    for (const move of availableMoves) {
       
        let tempBoard = [...boardToCheck];
        
        tempBoard[move] = symbol;
        
        
        if (checkWinHelper(tempBoard, symbol)) {
            return move;
        }
    }
    return -1; 
}

function getEasyMove() {
    const availableMoves = getAvailableMoves(board);
    const randomIndex = Math.floor(Math.random() * availableMoves.length);
    return availableMoves[randomIndex];
}

function getMediumMove() {
    
    let winningMove = findStrategicMove(board, machine);
    if (winningMove !== -1) {
        return winningMove;
    }

    
    let blockingMove = findStrategicMove(board, player);
    if (blockingMove !== -1) {
        return blockingMove;
    }

    
    return getEasyMove();
}

function getDifficultMove() {
    
    let winningMove = findStrategicMove(board, machine);
    if (winningMove !== -1) {
        return winningMove;
    }

    
    let blockingMove = findStrategicMove(board, player);
    if (blockingMove !== -1) {
        return blockingMove;
    }

    
    if (board[4] === empty) {
        return 4;
    }

    
    const corners = [0, 2, 6, 8];
    const availableMoves = getAvailableMoves(board);
    const availableCorners = corners.filter(c => availableMoves.includes(c));
    
    if (availableCorners.length > 0) {
        const randomIndex = Math.floor(Math.random() * availableCorners.length);
        return availableCorners[randomIndex];
    }
    
    
    return getEasyMove();
}



function handleMachineMove() {
    console.log(`Máquina (${machine}) está pensando...`);
    readline.keyInPause(null, { delay: 1000 });

    let move;
    if (difficulty === 'facil') {
        move = getEasyMove();
    } else if (difficulty === 'media') {
        move = getMediumMove();
    } else { 
        move = getDifficultMove();
    }

    board[move] = machine;
}


function setupGame() {
    console.clear();
    console.log("--- BEM-VINDO AO JOGO DA VELHA ---");
    pularLinha();

    
    const modeOptions = ['Player vs Player', 'Player vs Maquina'];
    const modeIndex = readline.keyInSelect(modeOptions, "Escolha o modo de jogo:");

    if (modeIndex === -1) {
        console.log("Até mais!");
        process.exit();
    }

    gameMode = (modeIndex === 0) ? 'PVP' : 'PVE';

    
    if (gameMode === 'PVE') {
        const diffOptions = ['Facil', 'Media', 'Dificil'];
        const diffIndex = readline.keyInSelect(diffOptions, "Escolha a dificuldade da maquina:");
        
        if (diffIndex === -1) {
            console.log("Até mais!");
            process.exit();
        }

        if (diffIndex === 0) difficulty = 'facil';
        else if (diffIndex === 1) difficulty = 'media';
        else difficulty = 'dificil';
    }
}


function resetGame() {
    board = [
        empty, empty, empty,
        empty, empty, empty,
        empty, empty, empty
    ];
    currentPlayer = player;
    gameOver = false;
}



function mainGameLoop() {
    
    setupGame();

    while (!gameOver) {
        
        printBoard(board);

        
        if (gameMode === 'PVP') {
            handlePlayerMove(); 
        } else {
            
            if (currentPlayer === player) {
                handlePlayerMove();
            } else {
                handleMachineMove();
            }
        }

        
        if (checkWin()) {
            gameOver = true;
            printBoard(board); 
            console.log(`FIM DE JOGO! O jogador ${currentPlayer} venceu!`);
        }
        
        else if (checkDraw()) {
            gameOver = true;
            printBoard(board); 
            console.log("FIM DE JOGO! Deu velha (empate)!");
        }
        
        else {
            switchPlayer();
        }
    }

    
    pularLinha();
    if (readline.keyInYNStrict('Deseja jogar novamente?')) {
        resetGame();
        mainGameLoop();
    } else {
        console.log("Obrigado por jogar! Até a próxima.");
    }
}

mainGameLoop();