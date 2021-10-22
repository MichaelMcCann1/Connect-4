import './App.css';
import Entry from './components/Entry';
import Slot from './components/Slot';
import { useState, useEffect } from 'react'
import winningArray from './winningArray';

function App() {
  const entryArray: number[] = Array(7).fill(1)

  const [slotArray, setSlotArray] = useState(Array(42).fill(""))
  const [turn, setTurn] = useState(0)
  const [color, setColor] = useState('Yellow')
  const [winner, setWinner] = useState('')

  const takeTurn = function(position: number){
    if (slotArray[position + 35]) return
    let result = [...slotArray]
    position = getSlotNumber(position)
    result[position] = color
    setSlotArray(result)
    setTurn(turn + 1)
    setColor(color === 'Yellow' ? 'Red' : 'Yellow')
  }

  const getSlotNumber = function(row: number){
    for (let i=0; i<7; i++){
      if (!slotArray[row + 7*i]) return row + 7*i
    }
    return row
  }

  const checkWinner = function(color: string){
    color === 'Yellow' ? color = 'Red' : color = 'Yellow'

    for (let i=0; i<winningArray.length; i++){
      let winner = true
      for (let j=0; j<4; j++){
        if (color !== slotArray[winningArray[i][j]]) {
          winner = false
        }
      }
      if (winner) setWinner(color)
    }
  }

  const resetGame = function(){
    setSlotArray(Array(42).fill(""))
    setTurn(0)
    setColor('Yellow')
    setWinner('')
  }

  useEffect(() => {
    if (turn === 0) return
    checkWinner(color)
  }, [slotArray])

  return (
    <div className="App">
      <a className="githubLink" href="https://github.com/MichaelMcCann1/Connect-4"><img src="Images/GitHub.svg"></img></a>
      <div className="game">
        <div className="entry">
          {entryArray.map((entry, index: number) => (
            <Entry key={index} position={index} takeTurn={takeTurn} color={color}/>
          ))}
        </div>
        <div className="board">
          {slotArray.map((slot, index: number) => (
            <Slot key={index} position={index} color={slotArray[index]}/>
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