export const BOARD_SIZE = 9;

export const AllPos = [0, 1, 2, 3, 4, 5, 6, 7, 8] as const;

export type Pos = typeof AllPos[number];

export type Player = "X" | "O";

export type Cell = Player | " ";

export const EmptyCell: Cell = " ";

export type Board = readonly [
  Cell,
  Cell,
  Cell,
  Cell,
  Cell,
  Cell,
  Cell,
  Cell,
  Cell
];

export const EmptyBoard: Board = [
  EmptyCell,
  EmptyCell,
  EmptyCell,
  EmptyCell,
  EmptyCell,
  EmptyCell,
  EmptyCell,
  EmptyCell,
  EmptyCell
] as const;

export type GameStatus =
  | { done: false; player: Player; turn: number }
  | { done: true; winner: Cell };
