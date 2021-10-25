import React from 'react'

type Props = {
  columnNumber: number;
  takeTurn: Function;
  color: string;
}

const Entry = ({columnNumber, takeTurn, color}: Props) => {

  const handleClick = function(columnNumber: number){
    takeTurn(columnNumber)
  }

  return (
    <div className="topSlot">
      <div className="hole" onClick={() => handleClick(columnNumber)} style={{background: color}}></div>
    </div>
  )
}

export default Entry