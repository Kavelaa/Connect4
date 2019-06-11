import { Store } from 'src/reducers'
import * as actions from '../actions'
import * as constants from '../constants'

export function update(state: Store, action: actions.Chess | actions.Receive) {
  let newInfos = [...state['infos']]
  let newBoard = JSON.parse(JSON.stringify(state['board']))
  let { player } = state

  if (player === '1') {
    player = '2'
  } else {
    player = '1'
  }
  newInfos.push(action.info)
  newBoard[action.info.pos].push(action.info.player)

  let status = judge(action.type, action.info.player, action.info.pos, newBoard)

  if (newInfos.length === 42 && status !== constants.END) {
    return {
      ...state,
      player,
      status: constants.DEUCE,
      infos: newInfos,
      board: newBoard
    }
  }
  return { ...state, player, status, infos: newInfos, board: newBoard }
}

function judge(
  type: constants.CHESS | constants.RECEIVE,
  player: string,
  pos: number,
  board: string[][]
) {
  let y = board[pos].length - 1
  let left,
    right,
    top,
    bottom,
    riseLx,
    riseLy,
    riseRx,
    //riseRy,
    fallLx,
    fallLy,
    fallRx
  //fallRy

  if (pos <= 3) {
    left = 0
    right = pos
  } else {
    left = pos - 3
    right = 3
  }

  if (y < 3) {
    bottom = 0
    top = y
  } else {
    bottom = y - 3
    top = 2
  }

  if (pos - left > y - bottom) {
    riseLx = pos - (y - bottom)
    riseLy = bottom
  } else {
    riseLx = left
    riseLy = y - (pos - left)
  }

  if (right + 3 - pos > top + 3 - y) {
    riseRx = pos - (y - top)
    //riseRy = top
  } else {
    riseRx = right
    //riseRy = y + (right - pos)
  }

  if (pos - left > top + 3 - y) {
    fallLx = pos - (top + 3 - y)
    fallLy = top + 3
  } else {
    fallLx = left
    fallLy = y + (pos - left)
  }

  if (right + 3 - pos > y - bottom) {
    fallRx = right - (right + 3 - pos - (y - bottom))
    //fallRy = bottom
  } else {
    fallRx = right
    //fallRy = y - (right - pos)
  }

  for (let i = left; i <= right; i++) {
    if (
      board[i][y] === player &&
      board[i + 1][y] === player &&
      board[i + 2][y] === player &&
      board[i + 3][y] === player
    ) {
      return constants.END
    }
  }
  for (let i = bottom; i <= top; i++) {
    if (
      board[pos][i] === player &&
      board[pos][i + 1] === player &&
      board[pos][i + 2] === player &&
      board[pos][i + 3] === player
    ) {
      return constants.END
    }
  }
  for (let i = 0; i <= riseRx - riseLx; i++) {
    if (
      board[i + riseLx][i + riseLy] === player &&
      board[i + riseLx + 1][i + riseLy + 1] === player &&
      board[i + riseLx + 2][i + riseLy + 2] === player &&
      board[i + riseLx + 3][i + riseLy + 3] === player
    ) {
      return constants.END
    }
  }
  for (let i = 0; i <= fallRx - fallLx; i++) {
    if (
      board[i + fallLx][fallLy - i] === player &&
      board[i + fallLx + 1][fallLy - i - 1] === player &&
      board[i + fallLx + 2][fallLy - i - 2] === player &&
      board[i + fallLx + 3][fallLy - i - 3] === player
    ) {
      return constants.END
    }
  }

  if (type === constants.CHESS) return constants.WAITING
  else if (type === constants.RECEIVE) return constants.GAMING
  return constants.WAITING
}

export function paint(
  board: string[][],
  player: string,
  pos: number,
  action?: () => void
) {
  let ctx: CanvasRenderingContext2D = (document.getElementById(
    'canvas'
  ) as HTMLCanvasElement).getContext('2d')!
  let style = player === '1' ? 'red' : 'orange'
  let x = 26 + pos * 52
  let y = 278 - board[pos].length * 51
  let i = 26
  let timer = setInterval(() => {
    ctx.clearRect(x - 26, 0, 52, y + 25)
    ctx.beginPath()
    ctx.fillStyle = style
    ctx.arc(x, i, 20, 0, 2 * Math.PI)
    ctx.fill()
    ctx.closePath()
    i += y / 100
    if (i >= y) {
      if (action) action()
      clearInterval(timer)
    }
  }, 3)
}

export function undo(board: string[][], pos: number) {
  let ctx: CanvasRenderingContext2D = (document.getElementById(
    'canvas'
  ) as HTMLCanvasElement).getContext('2d')!
  let y = 278 - (board[pos].length - 1) * 51

  ctx.clearRect(pos * 52, 0, 52, y + 25)
}

export function clear() {
  let ctx: CanvasRenderingContext2D = (document.getElementById(
    'canvas'
  ) as HTMLCanvasElement).getContext('2d')!

  ctx.clearRect(0, 0, 364, 302)
}
