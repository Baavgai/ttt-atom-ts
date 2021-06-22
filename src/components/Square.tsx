import React from "react";
import { useAtom } from "jotai";
import { selectCellAtom } from "../store";

export const Square = (p: { pos: number }) => {
  const [squares, selectSquare] = useAtom(selectCellAtom);
  return (
    <button className={`square ${squares[p.pos]}`} onClick={() => selectSquare(p.pos)}>
      {squares[p.pos]}
    </button>
  );
};
