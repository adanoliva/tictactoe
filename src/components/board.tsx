import React from 'react';
import { scryRenderedComponentsWithType } from 'react-dom/test-utils';
import Square from './square';

export default function Board(props: any) {
    const renderSquare = (i: number) => {
      let markWin = props.linesWin.includes(i);
      return (
        <Square
          markWin={markWin}
          value={props.squares[i]}
          onClick={() => props.onClick(i)}
        />
      );
    }

    const renderRow = (i: number) => {
      return (
        <div className="board-row" key={i}>
          {renderSquare(i)}
          {renderSquare(i + 1)}
          {renderSquare(i + 2)}
        </div>
      );
    };

    let rows = [];

    for (let index: number = 0; index < 9; index += 3) {
      rows.push(renderRow(index));
    }

    return (
      <div>
        {rows}
      </div>
    );
  };
