type Props = {
  color: string
}

const Slot = ({color}: Props) => {
  
  return (
    <div className="slot">
      <div className="hole" style={{background: color}}></div>
    </div>
  )
}

export default Slot