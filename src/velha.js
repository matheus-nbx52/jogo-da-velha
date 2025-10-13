const readline = require('readline-sync');

let board = [
    [" ", " ", " "],
    [" ", " ", " "],
    [" ", " ", " "],
];

function imprimirTabuleiro(){
    console.log('--------------------')
    for(let i = 0; i < 3; i++){
    console.log(
      "|",
      board[i][0],
      "|",
      board[i][1],
      "|",
      board[i][2],
      "|")
    };
    console.log('--------------------')
}

imprimirTabuleiro();