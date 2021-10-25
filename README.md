# Connect-4

**Live Link to Project: https://mm-connect4.web.app/**

The classic game of Connect 4. Connect 4 of your disks either vertically, horizontally, or diagonally before your opponent does to win! Click the box at the top of the column where you want to drop your disk. 

This game was bade with ReactJS and TypeScript. 


## Code Explination

The state of the board is game is recorded with an array where each element represents each slot on the board game. If the slot is empty the element in the array has the value of an empty string. Otherwise it has the value of the color that occupies the slot. The array is initialized as an array of empty strings with `const [gameArray, setGameArray] = useState(Array(42).fill(""))`. The first index of the array represents the bottom left slot on the board. The second index is the slot to the right. This continues until index 7 which represents the leftmost slot in the second row. This pattern continues until the last index of the array represnts the rightmost slot on the top row. 

### Taking a turn

A click event handler is set to the slots on top of the board. When a slot is clicked the `takeTurn(columnNumber)` function is called to begin the process of taking a turn. The column number of the slot is passed to the function as an argument. The function is shown below. First the function checks to see if the column that was clicked is already completely filled with the game pieces with `if (gameArray[columnNumber + 35]) return`. It checks the index of the row plus 35 because that will always result in the index of the slots in the top row of the board. If it is filled then the function returns nothing and nothing else happens. 

If there is room on the column that was selected then the game now has to figure out which row to put the game piece in. The game pieces must always go down as far as possible. The game first checks if the bottom row is empty. If it is, then the piece is placed there. If not then it checks the index of the row plus 7 since there are 7 columns on the board. The game continues checking slots in an increment of 7 at a time until a slot is found empty. It then changes the index of `gameArray` to the color of the game piece that was placed. The color state is then changed to the next color for the other player.

```javascript
const takeTurn = function(columnNumber: number){
  if (gameArray[columnNumber + 35]) return //collumn on board is full
  let result = [...gameArray]
  columnNumber = getSlotNumber(columnNumber)
  result[columnNumber] = color
  setGameArray(result)
  setFirstTurn(false)
  setColor(color === 'Yellow' ? 'Red' : 'Yellow')
}
```

### Checking for a winner
