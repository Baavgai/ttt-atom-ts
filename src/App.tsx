
import React, { useMemo } from "react";

import { useAtom } from "jotai";
import { buildCellAtom, gameStatusAtom, resetBoardAtom } from "./tttAtoms";

const StatusMessage = () => {
    const [status] = useAtom(gameStatusAtom);
    const message = status.done === true
        ? (status.winner === undefined ? "Tie" : `Winner: ${status.winner}`)
        : `Player Turn: ${status.player}`
        ;

    return <div className="status">{message}</div>;
};

const RestartGame = () => {
    const [, reset] = useAtom(resetBoardAtom);
    return <button className="restart" onClick={() => reset()}>Restart Game</button>;
};

const Square = (p: { pos: number }) => {
    const [value, move] = useAtom(useMemo(() => buildCellAtom(p.pos), []));
    return <div className="cell" onClick={() => move()}>{value}</div>;
};

const BoardView = () =>
    <div className="board">
        {[0, 1, 2, 3, 4, 5, 6, 7, 8,].map(i => <div className="col" key={i}><Square pos={i} /></div>)}
    </div>
    ;

export const App = () => {
    return (
        <div className="container">
            <div className="title">Tic Tac Toe</div>
            <BoardView />
            <StatusMessage />
            <RestartGame />
        </div>
    );
};
