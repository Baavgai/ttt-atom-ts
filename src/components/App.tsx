// This was forked and migrated to jotai from https://codesandbox.io/s/valtio-tic-tac-forked-7bzu4?file=/src/index.js
import React from "react";
import { Provider } from "jotai";
import { Square } from "./Square";
import { Status } from "./Status";
import { GameEnd } from "./GameEnd";

const BoardView = () =>
  <div className="board">
    {[0, 1, 2, 3, 4, 5, 6, 7, 8].map(pos => (
      <Square key={pos} pos={pos} />
    ))}
  </div>;


const View = () => {
  return (
    <>
      <div className="game">
        <h1>
          x<span>o</span>x<span>o</span>
        </h1>
        <Status />
        <BoardView />
      </div>
      <GameEnd />
    </>
  );
}

export const App = () =>
  <Provider><View /></Provider>;
