export type Player = "X" | "O";

export const EmptyCell = " ";

export type Cell = Player | " ";

export type Board = [Cell, Cell, Cell, Cell, Cell, Cell, Cell, Cell, Cell];

export type DoneState = { done: false } | { done: true; winner: Cell };

export const BOARD_SIZE = 9;

export const EMPTY_BOARD = Array(BOARD_SIZE).fill(EmptyCell) as Board;
