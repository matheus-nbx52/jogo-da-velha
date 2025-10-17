const readline = require('readline-sync');

//variaveis para controle de jogo
const player = "X";
const machine = "O";
const empty = " ";
let board = [
    " ", " ", " ",
    " ", " ", " ",
    " ", " ", " "
];
let currentPlayer = player;
let gameOver = false;



//função para verificar o movimento do jogador
function handlePlayerMove() {
    let validMove = false

    while (!validMove) {
        const move = parseInt(readline.question(`Jogador ${currentPlayer}, inserir jogada entre 1 e 9: `));
        const position = move - 1;

        if(position >= 0 && position < 9 && board[position] === empty) {
            board[position] = currentPlayer;
            validMove = true;
        } else {
            console.log("Jogada inválida. Tente novamente.");
        }
    }
}