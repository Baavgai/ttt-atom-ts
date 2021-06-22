// This was forked and migrated to jotai from https://codesandbox.io/s/valtio-tic-tac-forked-7bzu4?file=/src/index.js
import React from "react";
import "./styles.css";
import useWindowSize from "react-use/lib/useWindowSize";
import Confetti from "react-confetti";
import { useAtom } from "jotai";
import { statusAtom } from "../store";
import { Cell } from "../types";

const View = (p: { winner: Cell }) => {
  const { width, height } = useWindowSize();

  return (
    <Confetti
      width={width}
      height={height}
      colors={[p.winner === "X" ? "#d76050" : "#509ed7", "white"]}
    />
  );
}


export const GameEnd = () => {
  const [gameStatus] = useAtom(statusAtom);
  return gameStatus.done === false
    ?<></>
    : <View winner={gameStatus.winner} />
    ;
};
