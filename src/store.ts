import { atom, useAtom } from "jotai";
import {
  BOARD_SIZE,
  Board,
  EmptyCell,
  Cell,
  Player
} from "./types";

import { initBoard, gameStatus, makeMove } from "./functions";

export const boardAtom = atom(initBoard());

export const resetBoardAtom = atom<unknown, Board>(undefined, (_, set) =>
  set(boardAtom, initBoard())
);

export const statusAtom = atom(get => gameStatus(get(boardAtom)));


export const selectCellAtom = atom<Board, number>(
  get => get(boardAtom),
  (get, set, pos) => set(boardAtom, makeMove(get(boardAtom), pos))
);


/*
export const statusAtom = atom(get => {
  const status = gameStatus(get(boardAtom));
  return status.done === true
    ? (status.winner === EmptyCell ? "Tie" : `Winner: ${status.winner}`)
    : `Next player: ${status.nextPlayer}`
});
export const resetBoardAtom = atom<unknown, Board>(undefined, (_, set) =>
  set(boardAtom, EMPTY_BOARD)
);

export const boardTurnAtom = atom<number>(
  get => get(boardAtom).filter(x => x !== EmptyCell).length
);

export const currentPlayerAtom = atom<Player>(get =>
  get(boardTurnAtom) % 2 === 0 ? "X" : "O"
);

export const winnerAtom = atom<Cell>(get =>  {
  const board = get(boardAtom);
  const winner = (p: Player) =>
    lines.some(
      ([a, b, c]) => p === board[a] && p === board[b] && p === board[c]
    )
      ? p
      : undefined;
  return winner("X") ?? winner("O") ?? EmptyCell;
});

export const doneAtom = atom<DoneState>(get => {
  const winner = get(winnerAtom);
  return winner !== EmptyCell || get(boardTurnAtom) === BOARD_SIZE
    ? { done: true, winner }
    : { done: false };
});

export const selectCellAtom = atom<Board, number>(
  get => get(boardAtom),
  (get, set, square) => {
    if (!get(doneAtom).done) {
      const nextBoard = get(boardAtom)
        .map((sqr, sqrIndex) =>
      sqrIndex === square ? get(nextValueAtom) : sqr
    )

      set(
        boardAtom,
        get(boardAtom).map((sqr, sqrIndex) =>
          sqrIndex === square ? get(nextValueAtom) : sqr
        )
      );

    }
  }
);
const statusAtom = atom(get => {
  return get(winnerAtom)
    ? `Winner: ${get(winnerAtom)}`
    : get(squaresAtom).every(Boolean)
      ? `Scratch`
      : `Next player: ${get(nextValueAtom)}`;
});

*/
