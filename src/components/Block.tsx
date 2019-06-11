import * as React from 'react'

interface Props {
  player: string
}

const Block = (props: Props) => {
  let player = '' //props.player ? 'player' + props.player : ''
  return <div className={`block ${player}`.trim()} />
}

export default Block
