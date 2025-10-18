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

// Função para imprimir o tabuleiro no terminal

function printBoard(board) {
  console.clear(); 
  
  // limpa a tela antes de imprimir de novo
  
  console.log("\n");
  for (let row of board) {
    console.log(row.join(" | "));
  }
  console.log("\n");
}



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

function checkWin () {  
  const win = [
    [0,1,2], [3,4,5], [6,7,8], 
    [0,3,6], [1,4,7], [2,5,8], 
    [0,4,8], [2,4,6]           
  ]; 
   for (let i=0; i< win.length; i++){
    let comb= win[i]
        if (board[comb[0]]===currentPlayer &&
          board[comb[1]]===currentPlayer &&
          board[comb[2]]=== currentPlayer
          ){
            return true 
          }
   }
     return false
  }
  console.log(checkWin())
  
  
function switchPlayer() {
  currentPlayer = currentPlayer === "X" ? "O" : "X";

  console.log(`Jogador trocado! O próximo jogador é: ${currentPlayer}`);
}

// checkWin vem primeiro
// função para empate de jogadores.

function checkDraw() {
  for (let i = 0; i < board.length; i++) {
    if (board[i] === "") {
      console.log("Encontrou espaço vazio.");
      return false;
    }
  }
  console.log("Tabuleiro cheio..");
  return true;
}