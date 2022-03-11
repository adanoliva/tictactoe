import React, {useState} from 'react';
import Board from './board';

type Cell = null | "X" | "O";

interface Board {
  squares: Cell[],
  indexInsert: number
}

type Data = {
  history: Board[];
  stepNumber: number;
  xIsNext: boolean;
};

export default function Game() {
    const dataInit: Data = {
      history: [{ squares: Array(9).fill(null), indexInsert: 0 }],
      stepNumber: 0,
      xIsNext: true
    }
    const [ascendingMoves, setascendingMoves] = useState(true)
    const [board, setBoard] = useState(dataInit);
    const [endGame, setEndGame] = useState(false);

    function handleClick(i: number) {
      let hCopy     = board.history.slice(0, board.stepNumber + 1);
      let current   = hCopy[hCopy.length - 1];
      const squares = current.squares.slice();

      if (calculateWinner(squares) || squares[i] || endGame) {
        return;
      }
      
      squares[i] = board.xIsNext ? "X" : "O";
      
      hCopy.push({squares: squares, indexInsert: i});
      
      let data: Data = {
        history: hCopy,
        stepNumber: board.history.length,
        xIsNext:!board.xIsNext
      };
      
      setBoard(data);
      if (hCopy.length === 10 && !endGame) {
        setEndGame(true);
      }
    }
  
    function jumpTo(step: number) {
      let data: Data = {
        history: board.history,
        stepNumber: step,
        xIsNext: (step % 2) === 0
      }
      setEndGame(false);
      setBoard(data);
    }

    let hCopy = board.history.slice(0, board.stepNumber + 1);
    let current = hCopy[hCopy.length - 1];
    
    const moves = board.history.map((step: Board, move: number) => {
      let celda: string = '';

      if (move > 0){
            celda = calculateColumRow(step.indexInsert);
      }

      const desc = move ?
        'Go to move #' + move + ' Push: ' + celda:
        'Go to game start';

      return (
        <li key={move} className={board.stepNumber === move ? 'active' : ''}>
          <button onClick={() => jumpTo(move)}>{desc}</button>
        </li>
      );
    });

    if (!ascendingMoves) {
      moves.reverse();
    }

    let winner = calculateWinner(current.squares);
    let linesWin = (winner) ? winner.linesWin : [];
   
    let status: string = (endGame && !winner) ? "Tie!" :
      ( winner ?  "Winner: " + winner.win :
      "Next player: " + (board.xIsNext ? "X" : "O"));
    
    return (
      <div className="game">
        <div className="game-board">
          <Board
            linesWin={linesWin}
            squares={current.squares}
            onClick={(i: number) => handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <div>
          <label className="switch">
            <input 
              type="checkbox" 
              checked={!ascendingMoves} 
              onChange={ ()=> setascendingMoves(!ascendingMoves)}/>
            <span className="slider round"></span>
          </label>
              <div>Order: {ascendingMoves ? 'Ascending' : 'Descending'}</div>
          </div>
          <ol reversed={!ascendingMoves}>{moves}</ol>
        </div>
      </div>
    );
};

function calculateWinner(squares: any) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return { 
          win: squares[a],
          linesWin: lines[i]
        }
      }
    }

    return null;
}

function calculateColumRow(index: number) {
  let column = 1 + index % 3;
  let row = 1 + Math.floor(index/3)

  return '(' + column + '/' + row + ')'
}