import React from 'react'
import {useState} from 'react'

function Square({ handleClick, value }) {
  return <button 
  className="square" 
  onClick={handleClick}>
    {value}
    </button>
}

function Board({xIsNext, squares, onPlay}) {
  // Why doesn't this work? 
  // function handleSquareClick(index) {
  //   function temp() {
  //     console.log("We made it!!!");
  //     console.log(index);
  //     squares[index] = 'Y';
  //     console.log(squares);
  //     setSquares(squares);
  //   };
  //   return temp;
  // }

  function handleSquareClick(index) {
    function temp() {
      if (squares[index] || calculateWinner(squares)) {
        return;
      }
      const nextSquares = squares.slice();
      if (xIsNext) {
        nextSquares[index] = 'X';
      } else {
        nextSquares[index] = 'O';
      }
      onPlay(nextSquares);
      
    };
    return temp;
  }

  const winner = calculateWinner(squares);
  let status; 

  if (winner) {
    status = "Winner: " + winner;
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }

  return (
    <React.Fragment>
      <div className="status">{status}</div>
      <div className="board-row">
        <Square value={ squares[0] } handleClick={ handleSquareClick(0) }/>
        <Square value={ squares[1] } handleClick={ handleSquareClick(1) }/>
        <Square value={ squares[2] } handleClick={ handleSquareClick(2) }/>
      </div>
      <div className="board-row">
        <Square value={ squares[3] } handleClick={ handleSquareClick(3) }/>
        <Square value={ squares[4] } handleClick={ handleSquareClick(4) }/>
        <Square value={ squares[5] } handleClick={ handleSquareClick(5) }/>
      </div>
      <div className="board-row">
        <Square value={ squares[6] } handleClick={ handleSquareClick(6) }/>
        <Square value={ squares[7] } handleClick={ handleSquareClick(7) }/>
        <Square value={ squares[8] } handleClick={ handleSquareClick(8) }/>
      </div>
    </React.Fragment>
  );
}

export default function Game() {
  const [xIsNext, setXIsNext] = useState(true);
  const [history, setHistory] = useState(Array(9).fill(Array(9)));
  const currentSquares = history[history.length - 1];

  function handlePlay(nextSquares) {
    setHistory([...history, nextSquares]);
    setXIsNext(!xIsNext);
  }

  // function jumpTo(nextMove) {

  // }

  // const moves = history.map(
  //   (squares, index) => {
  //     let description;
  //     if (index > 0) {
  //       description = 'Go to move #' + index;
  //     } else {
  //       description = 'Go to game start';
  //     }

  //     return (
  //       <li>
  //         <button onClick={() => jumpTo(index)}>{description}</button>
  //       </li>
  //     );
  //   }
  // )

  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay}/>
      </div>
      <div className="game-info">
        <ol>{/* TODO */}</ol>
      </div>
    </div>
  );
}

function calculateWinner(boardSquares) {
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
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (boardSquares[a] && boardSquares[a] === boardSquares[b] && boardSquares[a] === boardSquares[c]) {
      return boardSquares[a];
    }
  }
  return null;
}