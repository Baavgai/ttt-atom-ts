import {
  BOARD_SIZE,
  Board,
  EmptyCell,
  Cell,
  Player,
  GameStatus
} from "./types";

const lines = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]] // prettier-ignore

export const initBoard = () => Array(BOARD_SIZE).fill(EmptyCell) as Board;

export const boardTurn = (b: Board) =>
  b.filter(x => x !== EmptyCell).length;

export const currentPlayer = (b: Board): Player =>
  boardTurn(b) % 2 === 0 ? "X" : "O"


export const getWinner = (board: Board): Cell => {
  const check = (p: Player) =>
    lines.some(
      ([a, b, c]) => p === board[a] && p === board[b] && p === board[c]
    )
      ? p
      : undefined;
  return check("X") ?? check("O") ?? EmptyCell;
};

export const gameStatus = (b: Board): GameStatus => {
  const winner = getWinner(b);
  return winner !== EmptyCell || boardTurn(b) === BOARD_SIZE
    ? { done: true, winner }
    : { done: false, nextPlayer: currentPlayer(b) };
};

export const makeMove = (b: Board, pos: number): Board => {
  if (!gameStatus(b) && b[pos] === EmptyCell) {
    return b.map((x, i) => i === pos ? currentPlayer(b) : x) as Board;
  } else {
    return b;
  }
}
