import * as React from 'react'
import {
  END,
  WAITING,
  REMOTE_READY,
  GAMING,
  INIT,
  DECIDE,
  WAIT_DECIDE,
  DEUCE
} from '../constants'
import { Reset, WaitDecide, Info, Init } from '../actions'

interface Props {
  player: string
  status: string
  infos: Array<Info>
  socket: SocketIOClient.Socket
  dispatch: React.Dispatch<any>
}

const StatusBar = ({ player, status, infos, socket, dispatch }: Props) => {
  let semantic: string
  const handleRestart = () => {
    dispatch(Reset())
    socket.emit('restart')
  }
  const handleUndo = () => {
    dispatch(WaitDecide())
    socket.emit('undo')
  }
  const handleLeave = () => {
    dispatch(Init())
    socket.close()
  }

  switch (status) {
    case INIT:
      semantic = '欢迎'
      break
    case GAMING:
      semantic = '我方下棋'
      break
    case WAITING:
      semantic = '等待对方'
      break
    case DECIDE:
      semantic = '你的意见'
      break
    case WAIT_DECIDE:
      semantic = '等待意见'
      break
    case REMOTE_READY:
      semantic = '对方已准备'
      break
    case END:
      if (player === '1') semantic = '1P胜！'
      else semantic = '2P胜！'
      break
    case DEUCE:
      semantic = '平局'
      break
    default:
      semantic = status
  }

  return (
    <div id="status">
      <div
        className={`player-info ${
          player === '1' ? 'bold border left' : ''
        }`.trim()}
      >
        <div className={`player1 circle`} />
        1P
      </div>
      <div id="status-info">
        {semantic}
        {status === WAITING && Boolean(infos.length) && (
          <div className="btn" onClick={handleUndo}>
            撤销
          </div>
        )}
        {(status === END || status === REMOTE_READY || status === DEUCE) && (
          <>
          <div className="btn" onClick={handleRestart}>
            再来一局
          </div>
          <div className="btn" onClick={handleLeave}>回到菜单</div>
        </>)}
      </div>
      <div
        className={`player-info ${
          player === '2' ? 'bold border right' : ''
        }`.trim()}
      >
        2P
        <div className={`player2 circle`} />
      </div>
    </div>
  )
}

export default StatusBar
