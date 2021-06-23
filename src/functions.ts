import {
  BOARD_SIZE,
  Board,
  EmptyCell,
  Cell,
  Player,
  GameStatus,
  Pos,
  AllPos
} from "./types";

export const isAvailable = (board: Board, p: Pos) => board[p] === EmptyCell;

export const availableMoves = (board: Board): Pos[] =>
  AllPos.filter(pos => board[pos] === EmptyCell);

export const boardTurn = (b: Board) => BOARD_SIZE - availableMoves(b).length;

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

export const place = (board: Board, pos: Pos, player: Player): Board => {
  const status = gameStatus(board);
  if (status.done === false && isAvailable(board, pos)) {
    const v = (i: Pos): Cell => (i === pos ? player : board[i]);
    return [v(0), v(1), v(2), v(3), v(4), v(5), v(6), v(7), v(8)];
  } else {
    return board;
  }
};

export const makeMove = (board: Board, pos: Pos): [boolean, Board] => {
  const status = gameStatus(board);
  return [
    !status.done,
    status.done === false ? place(board, pos, status.player) : board
  ];
};

export const randInt = (n: number, endRange?: number): number =>
  endRange === undefined
    ? Math.floor(Math.random() * n)
    : n + randInt(endRange - n + 1);

export const randPick = <T>(xs: T[]): T => xs[randInt(xs.length)];

export const getBestMove = (board: Board): Pos | undefined => {
  const status = gameStatus(board);
  if (status.done === false) {
    if (status.turn === 0) {
      return 4;
    } else {
      const avail = availableMoves(board);
      const forPlayer = (player: Player) =>
        avail.find(pos => {
          const gs = gameStatus(place(board, pos, player));
          return gs.done === true && gs.winner === player;
        });
      return (
        forPlayer(status.player) ||
        forPlayer(status.player === "X" ? "O" : "X") ||
        randPick(avail)
      );
    }
  }
  return undefined;
};
