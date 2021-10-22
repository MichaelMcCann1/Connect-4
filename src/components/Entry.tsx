import React from 'react'

type Props = {
  position: number;
  takeTurn: Function;
  color: string;
}

const Entry = ({position, takeTurn, color}: Props) => {

  const handleClick = function(position: number){
    takeTurn(position)
  }

  return (
    <div className="topSlot">
      <div className="hole" onClick={() => handleClick(position)} style={{background: color}}></div>
    </div>
  )
}

export default Entry