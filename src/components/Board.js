import React, { Component } from "react";
import Cell from "./Cell";
import './Board.css';

class Board extends Component {
  static defaultProps = {
    numRows: 5, // board rows
    numCols: 5, // board cols
    chanceLightStartsOn: 0.25 // chance any cell is lit at start
  };

  constructor(props) {
    super(props);

    this.state = {
      hasWon: false,
      board: this.createBoard()
    };
  }

  createBoard() {
    const {
      numRows,
      numCols,
      chanceLightStartsOn
    } = this.props;

    let board = [];
    let rowCount, colCount;
    
    // create rows
    for (rowCount = 0; rowCount < numRows; rowCount++) {
      let row = [];

      for (colCount = 0; colCount < numCols; colCount++) {

        // push columns to the row
        row.push(Math.random() < chanceLightStartsOn);
      }

      board.push(row);
    }

    return board;
  }

  flipCell(y, x) {
    let { numCols, numRows } = this.props;
    let { board } = this.state;

    // if this coord is actually on board, flip it
    if (x >= 0 && x < numCols && y >= 0 && y < numRows) {
      board[y][x] = !board[y][x];
    }
  }

  flipCellsAround(coord) {
    const { board } = this.state;
    let [y, x] = coord.split("-").map(Number);

    // TODO: flip this cell and the cells around it
    this.flipCell(y, x); //Flip initial cell
    this.flipCell(y, x - 1); //flip left
    this.flipCell(y, x + 1); //flip right
    this.flipCell(y - 1, x); //flip below
    this.flipCell(y + 1, x); //flip above

    // win when every cell is turned off
    // TODO: determine is the game has been won
    let hasWon = board.every(row => row.every(cell => !cell));

    this.setState({ board: board, hasWon: hasWon });
  }

  generateTable() {
    const { numRows, numCols } = this.props;
    const { board } = this.state;

    let tblBoard = [];
    let rowCount, colCount;

    for (rowCount = 0; rowCount < numRows; rowCount++) {
      let row = [];
      for (colCount = 0; colCount < numCols; colCount++) {
        let coord = `${rowCount}-${colCount}`;
        row.push(
          <Cell 
            key={coord}
            isLit={board[rowCount][colCount]} 
            flipCellsAroundMe={() => this.flipCellsAround(coord)}
          />
        );
      }
      tblBoard.push(<tr key={rowCount}>{row}</tr>);
    }

    return (
      <table className="board">
        <tbody>{ tblBoard }</tbody>
      </table>
    );

  }

  render() {

    const { hasWon } = this.state;

    return (
      <div>
        { hasWon ? (
          <div className="winner">
            YOU WIN!
          </div>
        ) : (
          <div>
            {this.generateTable()}
          </div>
        )}
      </div>
    );
  }
}

export default Board;
