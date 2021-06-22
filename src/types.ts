export type Player = "X" | "O";

export const EmptyCell = " ";

export type Cell = Player | " ";

export type Board = [Cell, Cell, Cell, Cell, Cell, Cell, Cell, Cell, Cell];

export type GameStatus = 
| { done: false; nextPlayer: Player } 
| { done: true; winner: Cell };

export const BOARD_SIZE = 9;

