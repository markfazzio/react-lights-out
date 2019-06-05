import React, { Component } from 'react';
import Board from './components/Board';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      numRows: 5,
      numCols: 5
    }
  }

  handleRowsChange = (e) => {    
    this.setState({
      numRows : e.target.value
    });
  }

  handleColumnsChange = (e) => {    
    this.setState({
      numCols : e.target.value
    });
  }

  render() {
    const { numRows, numCols } = this.state;

    return (
      <div className="App">
        <div className="instructions">
          <h1>React Lights-Out</h1>
          <p>A simple React remake of the 1995 <a href="https://en.wikipedia.org/wiki/Lights_Out_(game)" target="_blanl">"Lights Out"</a> game by Tiger.</p>
          <form>
            {/* <label>
              Number of Rows
              <input type="number" value={numRows} defaultValue={numRows} onChange={this.handleRowsChange} />
            </label> */}
            <label>
              Columns: 
              <input type="number" value={numCols} defaultValue={numCols} onChange={this.handleColumnsChange} />
            </label>
          </form>
        </div>
        <Board numRows={numRows} numCols={numCols} />
      </div>
    );
  }
}

export default App;
