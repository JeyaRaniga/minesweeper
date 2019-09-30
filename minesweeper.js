// Moved the event listener after startGame is defined.
// Define your `board` object here!
var board = {
  cells: []
}
createBoard = () => {
  for (var i = 0; i < 5; i++) {
    for (var j = 0; j < 5; j++) {
      board.cells.push({ 
        row: i, 
        col: j, 
        isMine: Boolean(Math.floor(Math.random() * 1.1)), 
        isMarked: false, 
        hidden: true })
    }
  }
}

startGame = () => {
  // Don't remove this function call: it makes the game work!
  createBoard()
  lib.initBoard()
  board.cells.forEach(cell=> {
    cell.surroundingMines = countSurroundingMines(cell);
   }
    )
  document.addEventListener("click", checkForWin);
  document.addEventListener("contextmenu", checkForWin);
}

document.addEventListener('DOMContentLoaded', startGame)

// Define this function to look for a win condition:
//
// 1. Are all of the cells that are NOT mines visible?
// 2. Are all of the mines marked?
checkForWin = () => {
  // You can use this function call to declare a winner (once you've
  // detected that they've won, that is!)
  //   lib.displayMessage('You win!')
    for (i = 0; i < board.cells.length; i++) {
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
countSurroundingMines = (cell) => {
    var surrounding = lib.getSurroundingCells(cell.row, cell.col);
    var count = 0;
    for (var i = 0; i < surrounding.length; i++) {
      if (surrounding[i].isMine === true) {
        count++;
      };
    };
    return count;
  }

