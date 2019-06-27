import * as actions from '../actions'
import * as constants from '../constants'
import { update, clear, undo } from '../service'

export interface Store {
  status: string
  player: string
  infos: Array<actions.Info>
  board: string[][]
}

const defaultState: Store = {
  player: '1',
  status: constants.INIT,
  infos: [],
  board: [[], [], [], [], [], [], []]
}

export function mainReducer(
  state: Store = defaultState,
  action:
    | actions.Gaming
    | actions.Waiting
    | actions.Chess
    | actions.Undo
    | actions.Reset
    | actions.Receive
    | actions.Decide
    | actions.WaitDecide
    | actions.RemoteReady
) {
  switch (action.type) {
    case constants.GAMING: {
      return { ...state, status: constants.GAMING }
    }
    case constants.WAITING: {
      return { ...state, status: constants.WAITING }
    }
    case constants.RECEIVE:
    case constants.CHESS: {
      return update(state, action)
    }
    case constants.DECIDE: {
      return { ...state, status: constants.DECIDE }
    }
    case constants.WAIT_DECIDE: {
      return { ...state, status: constants.WAIT_DECIDE }
    }
    case constants.UNDO: {
      let status = state['status']
      let newInfos = [...state['infos']]
      let newBoard = JSON.parse(JSON.stringify(state['board']))

      let info = newInfos.pop()!
      let player = info.player
      let pos = info.pos

      undo(newBoard, pos)
      if (status === constants.WAIT_DECIDE) {
        status = constants.GAMING
      } else {
        status = constants.WAITING
      }
      newBoard[pos].pop()
      return {
        ...state,
        player,
        status,
        infos: newInfos,
        board: newBoard
      }
    }
    case constants.REMOTE_READY:
      return { ...state, status: constants.REMOTE_READY }
    case constants.RESET: {
      let {status,player} = state

      clear()
      if (status === constants.REMOTE_READY) {
        status = constants.WAITING
        if (document.location.hash) player = '1'
        else player = '2'
      }
      else {
        status = constants.WAIT_DECIDE
        if (document.location.hash) player = '2'
        else player = '1'
      }

      return { ...defaultState, status, player }
    }
    default:
      return state
  }
}
