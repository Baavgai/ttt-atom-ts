import {
  BOARD_SIZE,
  Board,
  EmptyCell,
  Cell,
  Player,
  GameStatus,
  Pos
} from "./types";

export const isAvailable = (board: Board, p: Pos) => board[p] === EmptyCell;

export const availableMoves = (board: Board) =>
  board.reduce(
    (acc: number[], x, i) => (x === EmptyCell ? [...acc, i] : acc),
    []
  );

export const boardTurn = (b: Board) => BOARD_SIZE - availableMoves(b).length;

// export const boardTurn = (b: Board) => b.filter(x => x !== EmptyCell).length;

export const currentPlayer = (b: Board): Player =>
  boardTurn(b) % 2 === 0 ? "X" : "O";

export const getWinner = (board: Board): Cell => {
  const check = (p: Player) =>
    [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ].some(([a, b, c]) => p === board[a] && p === board[b] && p === board[c])
      ? p
      : undefined;
  return check("X") ?? check("O") ?? EmptyCell;
};

export const gameStatus = (b: Board): GameStatus => {
  const winner = getWinner(b);
  const turn = boardTurn(b);
  return winner !== EmptyCell || turn === BOARD_SIZE
    ? { done: true, winner }
    : { done: false, player: currentPlayer(b), turn };
};

export const makeMove = (board: Board, pos: Pos): Board => {
  const status = gameStatus(board);
  if (status.done === false && isAvailable(board, pos)) {
    const v = (i: Pos): Cell => (i === pos ? status.player : board[i]);
    return [v(0), v(1), v(2), v(3), v(4), v(5), v(6), v(7), v(8)];
  } else {
    return board;
  }
};

/*
export const isDone = (board: Board) =>  gameStatus(board).done;

const placePlayer = (board: Board, pos: Pos, value: Player): Board => {
  const v = (i: Pos): Cell => i === pos ? value : board[i];
  return !isDone(board) && !isAvailable(board, pos)
    ? board
    : [v(0), v(1), v(2), v(3), v(4), v(5), v(6), v(7), v(8)];
};
*/
