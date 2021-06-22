import { atom, useAtom } from "jotai";
import {
  EMPTY_BOARD,
  Board,
  EmptyCell,
  Cell,
  Player,
  DoneState
} from "./types";

const lines = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]] // prettier-ignore

export const boardAtom = atom(EMPTY_BOARD);

export const resetBoardAtom = atom<unknown, Board>(undefined, (_, set) =>
  set(boardAtom, EMPTY_BOARD)
);

export const boardTurnAtom = atom<number>(
  get => get(boardAtom).filter(x => x !== EmptyCell).length
);

export const currentPlayerAtom = atom<Player>(get =>
  get(boardTurnAtom) % 2 === 0 ? "X" : "O"
);

const winnerForBoard = (board: Board): Cell => {
  const winner = (p: Player) =>
    lines.some(
      ([a, b, c]) => p === board[a] && p === board[b] && p === board[c]
    )
      ? p
      : undefined;
  return winner("X") ?? winner("O") ?? EmptyCell;
};

export const winnerAtom = atom<Cell>(get => winnerForBoard(get(boardAtom)));

export const doneAtom = atom<DoneState>(get => {
  const winner = get(winnerAtom);
  return winner !== Empty || get(boardTurnAtom) === BOARD_SIZE
    ? { done: true, winner }
    : { done: false };
});

export const selectCellAtom = atom<Board, Player>(
  get => get(boardAtom),
  (get, set, square) => {
    if (get(winnerAtom) || get(squaresAtom)[square]) return;
    set(
      squaresAtom,
      get(squaresAtom).map((sqr, sqrIndex) =>
        sqrIndex === square ? get(nextValueAtom) : sqr
      )
    );
  }
);
const statusAtom = atom(get => {
  return get(winnerAtom)
    ? `Winner: ${get(winnerAtom)}`
    : get(squaresAtom).every(Boolean)
    ? `Scratch`
    : `Next player: ${get(nextValueAtom)}`;
});

function Square({ i }) {
  const [squares, selectSquare] = useAtom(selectSquareAtom);
  return (
    <button className={`square ${squares[i]}`} onClick={() => selectSquare(i)}>
      {squares[i]}
    </button>
  );
}

function Status() {
  const [gameStatus] = useAtom(statusAtom);
  const [, reset] = useAtom(resetSquaresAtom);

  return (
    <div className="status">
      <div className="message">{gameStatus}</div>
      <button onClick={() => reset()}>Reset</button>
    </div>
  );
}

function End() {
  const { width, height } = useWindowSize();
  const [gameWinner] = useAtom(winnerAtom);
  return (
    gameWinner && (
      <Confetti
        width={width}
        height={height}
        colors={[gameWinner === "X" ? "#d76050" : "#509ed7", "white"]}
      />
    )
  );
}
