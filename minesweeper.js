"use strict"
document.addEventListener('DOMContentLoaded', startGame)

// Define your `board` object here!
var board = {
  cells: []
}

//difficulty levels- easy - 5, medium-6, hard- 7
//create a global variable difficulty
var difficulty = 4;
window.onload=function () {
document.getElementById("easy").addEventListener("click", () => {easyLevel()}, false);
document.getElementById("medium").addEventListener("click", ()=> {mediumLevel()}, false);
document.getElementById("hard").addEventListener("click", ()=>  {hardLevel()}, false);
}

function resetBoard () {
    document.getElementsByClassName('board')[0].innerHTML = '';
    board = {
      cells: []
    }
}

function easyLevel() {
  resetBoard()
  difficulty = 4;
  startGame()
}

function mediumLevel() {
  resetBoard()
  difficulty  = 5;
  startGame();
}

function hardLevel() {
  resetBoard()
  difficulty  = 6;
  startGame();
}


function createBoard () {
  for (var i = 0; i < difficulty; i++) {
    for (var j = 0; j < difficulty; j++) {
      board.cells.push({ 
        row: i, 
        col: j, 
        isMine: Boolean(Math.floor(Math.random() * 1.5)), 
        isMarked: false, 
        hidden: true })
    }
  }
}

function startGame () {
  // Don't remove this function call: it makes the game work!
  createBoard()
    board.cells.forEach(cell=> {
    cell.surroundingMines = countSurroundingMines(cell);
   }
    )
  document.addEventListener("click", checkForWin);
  document.addEventListener("contextmenu", checkForWin);
  lib.initBoard()
}



// Define this function to look for a win condition:
//
// 1. Are all of the cells that are NOT mines visible?
// 2. Are all of the mines marked?
function checkForWin () {
  // You can use this function call to declare a winner (once you've
  // detected that they've won, that is!)
  //   lib.displayMessage('You win!')
    for ( let i = 0; i < board.cells.length; i++) {
      if (board.cells[i].isMine && !board.cells[i].isMarked) {
        return
      }
      else if (!board.cells[i].isMine && board.cells[i].hidden) {
        return
      }
    }
    lib.displayMessage ('You win!')
}

// Define this function to count the number of mines around the cell
// (there could be as many as 8). You don't have to get the surrounding
// cells yourself! Just use `lib.getSurroundingCells`: 
//
//   var surrounding = lib.getSurroundingCells(cell.row, cell.col)
//   add var count
//
// It will return cell objects in an array. You should loop through 
// them, counting the number of times `cell.isMine` is true.
function countSurroundingMines (cell) {
    var surrounding = lib.getSurroundingCells(cell.row, cell.col);
    var count = 0;
    for (var i = 0; i < surrounding.length; i++) {
      if (surrounding[i].isMine === true) {
        count++;
      };
    };
    return count;
  }

