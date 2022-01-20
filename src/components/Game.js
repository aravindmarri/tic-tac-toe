import React from "react";
import Board from "./Board";
import "../index.css";

class Game extends React.Component {

  initialize = () => {
    return {
      history: [
        {
          squares: Array(9).fill(null),
          location: {
            col: 0,
            row: 0
          },
          active: false,
          moveNumber: 0
        }
      ],
      xIsNext: true,
      stepNumber: 0,
      toggle: false
    };
  };

  state = this.initialize();

  reset = () => {
    this.setState(this.initialize());
  };

  jumpTo = step => {
    let history = this.state.history;

    history.forEach(item => {
      item.active = false;
    });

    history[step].active = true;
    this.setState({
      history: history,
      stepNumber: step,
      xIsNext: step % 2 === 0
    });
  };

  handleClick = i => {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    const columns = 3;

    const col = Math.floor(i % columns) + 1;
    const row = Math.floor(i / columns) + 1;

    if (this.calculateWinner(squares) || squares[i]) {
      return;
    }

    squares[i] = this.state.xIsNext ? "X" : "O";

    this.setState(prevState => ({
      history: history.concat([
        {
          squares: squares,
          location: {
            col: col,
            row: row
          },
          active: false,
          moveNumber: history.length
        }
      ]),
      xIsNext: !prevState.xIsNext,
      stepNumber: history.length
    }));
  };

  calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
    let result = {
      status: "",
      win: {}
    };
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        result = {
          status: "win",
          win: { player: squares[a], squares: [a, b, c] }
        };
        return result;
      }
    }
    let tempSq = squares.filter(item => item === null);
    if (tempSq.length === 0) {
      result = { status: "draw", win: {} };
      return result;
    }
    return null;
  };

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const result = this.calculateWinner(current.squares);
    const gameStatus = result && result.status ? result.status : null;

    let status;

    if (gameStatus === "win") {
      status = `Winner: ${result.win.player}`;
    } else {
      status = "Next player: " + (this.state.xIsNext ? "X" : "O");
    }
    return (
      <div className="game">
        {
        gameStatus === "draw" ? (
          <div className="draw">
            <h2>Draw!</h2>
            <button className="again-btn" onClick={() => this.reset()}>Play again</button>
          </div>
        ) : (
          <div className="game-board">
            <Board
              squares={current.squares}
              winningSquares={gameStatus === "win" ? result.win.squares : []}
              onClick={(i, col, row) => this.handleClick(i, col, row)}
            />
            {
            gameStatus === "win" ? (
              <div className="win">
                <h2>{`"${result.win.player}" is winner!`}</h2>
                <button className="again-btn" onClick={() => this.reset()}>Play again</button>
              </div>
            ) : (
              <div className="reset">
                <div className="game-info">
                <p>{status}</p>
              </div>
                <button className="again-btn" onClick={() => this.reset()}>Reset game</button>
              </div>
            )}
          </div>
        )}
      </div>
    );
  }
}

export default Game;
