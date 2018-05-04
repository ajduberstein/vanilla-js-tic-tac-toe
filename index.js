let boardDisplay = document.getElementsByClassName('board')[0];

const initialState = {
  isPlayerOneTurn: true,
  board: [],
  win: false,
};

let state = {};

const checkForWin = (board) => {
  let horizontalVictory, verticalVictory, diagonalLeft, diagonalRight;
  for (let i = 0; i < board.length; i++) {
    horizontalVictory = board[i][0] !== 0 && 
      board[i][0] === board[i][1] &&
      board[i][1] === board[i][2];
    verticalVictory = board[0][i] !== 0 &&
      board[0][i] === board[1][i] &&
      board[1][i] === board[2][i];
    if (horizontalVictory || verticalVictory) {
      return true;
    }
  }
  diagonalLeft = board[0][0] !== 0 &&
    board[0][0] === board[1][1] &&
    board[1][1] === board[2][2];
  diagonalRight = board[2][0] !== 0 &&
    board[2][0] === board[1][1] &&
    board[1][1] === board[0][2];
  if (diagonalRight || diagonalLeft) {
    return true;
  };
  return false;
}

const pointToRowOrder = (x, y, boardLength) => {
  return x * boardLength + y;
}

const rowOrderToPoint = (arrayIdx, boardLength) => {
  let x = arrayIdx % boardLength;
  let y = Math.floor(arrayIdx / boardLength);
  return [x, y]
}

const renderBoard = (board) => {
  let id, boardNode;
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board.length; j++) {
      id = pointToRowOrder(i, j, board.length)
      boardNode = document.getElementById(id);
      let mark = '';
      if (board[i][j] === 1) {
        mark = 'X'
      }
      else if (board[i][j] === 2) {
        mark = 'O'
      }
      boardNode.className = `boardTile ${mark}`;
      boardNode.innerText = mark;
    }
  }
  if (state.win) {
    const btn = makeButton('');
    document.getElementsByClassName('board')[0].appendChild(btn);
  }
}

const onClick = (event) => {
  const square = 1 * event.target.id;
  let [x, y] = rowOrderToPoint(square, state.board.length);
  if (state.board[y][x] === 0) {
    state.board[y][x] = state.isPlayerOneTurn ? 1 : 2;
    state.win = checkForWin(state.board)
    renderBoard(state.board);
    state.isPlayerOneTurn = !state.isPlayerOneTurn;
  } 
}

const getBoard = (boardSize) => {
  let board = [];
  for (let i = 0; i < boardSize; i++) {
    board.push([]);
    for (let j = 0; j < boardSize; j++) {
      board[i].push(0);
    }
  }
  return board;
}

const makeButton = () => {
    let winner = state.isPlayerOneTurn ? 'X' : 'O';
    let btn = document.createElement('div');
    btn.className = 'btn';
    btn.innerHTML = 'Play Again';
    btn.innerHTML = `${btn.innerHTML} - ${winner} wins`;
    btn.addEventListener('click', (e) => {
      window.location.reload(true);
    })
    return btn;
}

const init = (boardSize) => {
  let rowNode, node;
  state = {...initialState};
  state.board = getBoard(boardSize);
  let fullBoardSize = (boardSize * boardSize);
  for (let i = 0; i < fullBoardSize; i++) {
    if (i % boardSize === 0) {
      rowNode = document.createElement('div');
      rowNode.className = 'row';
      boardDisplay.appendChild(rowNode);
    }
    node = document.createElement('div');
    node.className = 'boardTile';
    node.id = i;
    node.addEventListener('click', onClick);
    rowNode.appendChild(node);
  }
  renderBoard(state.board);
}

init(3);
