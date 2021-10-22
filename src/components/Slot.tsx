import React from 'react'

type Props = {
  position: number;
  color: string
}

const Slot = ({position, color}: Props) => {

  const handleClick = function(num: number){
    console.log(num)
    console.log(color)
  }
  
  return (
    <div className="slot" onClick={() => handleClick(position)}>
      <div className="hole" style={{background: color}}></div>
    </div>
  )
}

export default Slot