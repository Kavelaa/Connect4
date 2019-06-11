import * as React from 'react'
import Block from './Block'
import { paint } from '../service'

interface Props {
  pcs: number
  pos: number
  board: string[][]
  player?: string
  onClick?: () => void
}

const Column = ({ pcs, pos, player, board, onClick }: Props) => {
  let arr = []
  let columnState = board[pos]
  const wrapClick = () => {
    if (onClick) {
      paint(board, player!, pos, onClick)
    }
  }

  for (let i = 0; i < pcs; i++) {
    arr.push(<Block player={columnState[i] ? columnState[i] : ''} key={i} />)
  }

  return (
    <div
      className={`column ${onClick !== undefined ? 'can-click' : ''}`.trim()}
      onClick={wrapClick}
    >
      {arr}
    </div>
  )
}

export default Column
