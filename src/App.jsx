import React, { useState } from "react";

const snakes = {
  99: 54,
  95: 75,
  92: 37,
  89: 68,
  74: 53,
  64: 36,
  62: 19,
  49: 11,
  47: 26,
  16: 6,
};

const ladders = {
  2: 38,
  7: 14,
  8: 31,
  15: 26,
  21: 42,
  28: 84,
  36: 44,
  51: 67,
  71: 91,
  78: 98,
};

const createInitialPlayers = () => ({
  P1: 1,
  P2: 1,
});

function App() {
  const [players, setPlayers] = useState(createInitialPlayers);
  const [turn, setTurn] = useState("P1");
  const [dice, setDice] = useState(null);
  const [winner, setWinner] = useState(null);
  const [message, setMessage] = useState("Roll the dice to start!");

  const getNewPosition = (position) => {
    if (ladders[position]) {
      return {
        position: ladders[position],
        type: "ladder",
      };
    }

    if (snakes[position]) {
      return {
        position: snakes[position],
        type: "snake",
      };
    }

    return {
      position,
      type: null,
    };
  };

  const rollDice = () => {
    if (winner) {
      return;
    }

    const roll = Math.floor(Math.random() * 6) + 1;
    const currentPosition = players[turn];

    setDice(roll);

    let nextPosition = currentPosition + roll;

    if (nextPosition > 100) {
      setMessage(
        `${turn} rolled ${roll}. Exact 100 is required, so ${turn} stays at ${currentPosition}.`
      );
      setTurn(turn === "P1" ? "P2" : "P1");
      return;
    }

    const result = getNewPosition(nextPosition);
    nextPosition = result.position;

    const updatedPlayers = {
      ...players,
      [turn]: nextPosition,
    };

    setPlayers(updatedPlayers);

    if (nextPosition === 100) {
      setWinner(turn);
      setMessage(`${turn} wins the game!`);
      return;
    }

    if (result.type === "ladder") {
      setMessage(`${turn} rolled ${roll} and climbed a ladder to ${nextPosition}!`);
    } else if (result.type === "snake") {
      setMessage(`${turn} rolled ${roll} and slid down a snake to ${nextPosition}!`);
    } else {
      setMessage(`${turn} rolled ${roll} and moved to ${nextPosition}.`);
    }

    setTurn(turn === "P1" ? "P2" : "P1");
  };

  const resetGame = () => {
    setPlayers(createInitialPlayers());
    setTurn("P1");
    setDice(null);
    setWinner(null);
    setMessage("Roll the dice to start!");
  };

  const getCellNumber = (row, col) => {
    const rowFromBottom = 9 - row;

    if (rowFromBottom % 2 === 1) {
      return rowFromBottom * 10 - col;
    }

    return rowFromBottom * 10 - 9 + col;
  };

  const renderCell = (number) => {
    const playersHere = Object.entries(players)
      .filter(([, position]) => position === number)
      .map(([player]) => player);

    return (
      <div
        key={number}
        className={`cell ${
          ladders[number]
            ? "ladder-cell"
            : snakes[number]
              ? "snake-cell"
              : ""
        }`}
      >
        <span className="number">{number}</span>

        {ladders[number] && (
          <span className="special">↗ {ladders[number]}</span>
        )}

        {snakes[number] && (
          <span className="special">↘ {snakes[number]}</span>
        )}

        <div className="players">
          {playersHere.includes("P1") && (
            <span className="player p1">P1</span>
          )}

          {playersHere.includes("P2") && (
            <span className="player p2">P2</span>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="page">
      <div className="game-card">
        <h1>Snake &amp; Ladders</h1>

        <div className="game-info">
          <div className="turn-info">
            <span>Turn:</span>
            <strong className={turn === "P1" ? "p1-text" : "p2-text"}>
              {winner ? winner : turn}
            </strong>
          </div>

          <div className="score-info">
            <span className="score p1-score">P1: {players.P1}</span>
            <span className="score p2-score">P2: {players.P2}</span>
          </div>
        </div>

        <div className="status">
          {winner ? `Winner: ${winner}` : message}
        </div>

        <div className="board">
          {Array.from({ length: 10 }, (_, row) =>
            Array.from({ length: 10 }, (_, col) =>
              renderCell(getCellNumber(row, col))
            )
          )}
        </div>

        <div className="actions">
          <button
            className="roll-button"
            onClick={rollDice}
            disabled={Boolean(winner)}
          >
            🎲 Roll Dice {dice ? `(${dice})` : ""}
          </button>

          <button className="reset-button" onClick={resetGame}>
            Reset
          </button>
        </div>

        <p className="description">
          Exact 100 is required to win. Land on a ladder to climb up, a snake
          to slide down.
        </p>
      </div>
    </div>
  );
}

export default App;