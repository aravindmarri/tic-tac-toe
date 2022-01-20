import React from "react";
import Square from "./Square";
import "../index.css";

class Board extends React.Component {
  highlightSquares = i => {
    if (this.props.winningSquares.length > 0) {
      if (this.props.winningSquares.indexOf(i) > -1) {
        return "square winningSquares";
      } else {
        return "square";
      }
    } else {
      return "square";
    }
  };

  renderSquare(i) {
    let highlight = this.highlightSquares(i);
    return (
      <Square
        key={i}
        highlightWinSquares={highlight}
        value={this.props.squares[i]}
        updateStateOnClick={() => this.props.onClick(i)}
      />
    );
  }

  generateRow = (index, max) => {
    let rows = [];

    for (index; index < max; index++) {
      rows.push(this.renderSquare(index));
    }
    return rows;
  };

  generateBoard = (columns, rows) => {
    let board = [];
    for (let i = 0; i < columns * rows; i++) {
      if (i % columns === 0) {
        board.push(
          <div className="board-row" key={i}>
            {this.generateRow(i, i + columns)}
          </div>
        );
      }
    }
    return board;
  };

  render() {
    return (
      <div>
        <div>{this.generateBoard(3, 3)}</div>
      </div>
    );
  }
}

export default Board;
