// This was forked and migrated to jotai from https://codesandbox.io/s/valtio-tic-tac-forked-7bzu4?file=/src/index.js
import React from "react";

import { useAtom } from "jotai";
import { statusAtom, resetBoardAtom } from "../store";
import { EmptyCell  } from "../types";

export const Status = () => {
  const [status] = useAtom(statusAtom);
  const [, reset] = useAtom(resetBoardAtom);

  const message = status.done === true
  ? (status.winner === EmptyCell ? "Tie" : `Winner: ${status.winner}`)
  : `Next player: ${status.nextPlayer}`

  return (
    <div className="status">
      <div className="message">{message}</div>
      <button onClick={() => reset()}>Reset</button>
    </div>
  );
};
