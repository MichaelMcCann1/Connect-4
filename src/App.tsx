import './App.css';
import Entry from './components/Entry';
import Slot from './components/Slot';
import { useState, useEffect } from 'react'
import winningArray from './winningArray';

function App() {

  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);

  const [gameArray, setGameArray] = useState(Array(42).fill(""))
  const [firstTurn, setFirstTurn] = useState(true)
  const [color, setColor] = useState('Yellow')
  const [winner, setWinner] = useState('')
  const entryArray: number[] = Array(7).fill(1)

  const takeTurn = function(columnNumber: number){
    if (gameArray[columnNumber + 35]) return //collumn on board is full
    let result = [...gameArray]
    columnNumber = getSlotNumber(columnNumber)
    result[columnNumber] = color
    setGameArray(result)
    setFirstTurn(false)
    setColor(color === 'Yellow' ? 'Red' : 'Yellow')
  }

  const getSlotNumber = function(columnNumber: number){
    for (let i=0; i<7; i++){
      if (!gameArray[columnNumber + 7*i]) return columnNumber + 7*i
    }
    return columnNumber
  }

  const checkWinner = function(color: string){
    color === 'Yellow' ? color = 'Red' : color = 'Yellow' //check previous color

    for (let i=0; i<winningArray.length; i++){
      let winner = true
      for (let j=0; j<4; j++){
        if (color !== gameArray[winningArray[i][j]]) {
          winner = false
        }
      }
      if (winner) setWinner(color)
    }
  }

  const resetGame = function(){
    setGameArray(Array(42).fill(""))
    setFirstTurn(true)
    setColor('Yellow')
    setWinner('')
  }

  useEffect(() => {
    if (!firstTurn) return
    checkWinner(color)
  }, [gameArray])

  return (
    <div className="App">
      <a className="githubLink" href="https://github.com/MichaelMcCann1/Connect-4"><img src="Images/GitHub.svg" alt="GitHub Link"></img></a>
      <div className="game">
        <div className="entry">
          {entryArray.map((entry, index: number) => (
            <Entry key={index} columnNumber={index} takeTurn={takeTurn} color={color}/>
          ))}
        </div>
        <div className="board">
          {gameArray.map((slot, index: number) => (
            <Slot key={index} color={gameArray[index]}/>
          ))}
        </div>
      </div>
      {winner && <div className="modalBackground">
        <div className="modal">
          <h1>{winner} wins!</h1>
          <div className="playAgain" onClick={resetGame}>
            <p>Play Again</p>
          </div>
        </div>
      </div>}
    </div>
  );
}

export default App;