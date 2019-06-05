import React, { Component } from 'react';
import classNames from 'classnames';
import './Cell.css'

class Cell extends Component {
    
    handleClick = (e) => {
        this.props.flipCellsAroundMe();
    }
    
    render() {

        const { isLit } = this.props;

        const cellClasses = classNames({
            'cell' : true,
            'cell--lit' : isLit
        });

        return (
            <td className={cellClasses} onClick={this.handleClick}></td>
        )
    }
}

export default Cell;