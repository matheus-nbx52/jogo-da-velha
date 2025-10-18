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
  