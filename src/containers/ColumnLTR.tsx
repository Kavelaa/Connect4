import { connect } from 'react-redux'
import Column from '../components/Column'
import { Store } from '../reducers'
import { Chess, Info } from '../actions'
import { GAMING } from '../constants'

function mapStateToProps(state: Store) {
  return {
    infos: state['infos'],
    board: state['board'],
    player: state['player'],
    status: state['status']
  }
}

function mapDispatchToProps(dispatch: any) {
  return {
    onClick: (info: Info) => {
      dispatch(Chess(info))
    }
  }
}

function mergeProps(
  stateProps: { player: any; status: any; board: any },
  dispatchProps: { onClick: any },
  ownProps: { pos: any; socket: SocketIOClient.Socket }
) {
  const { player, status, board } = stateProps
  const { onClick } = dispatchProps
  const { pos, socket } = ownProps
  let info: Info = { player, pos }

  if (status === GAMING && board[pos].length < 6) {
    return {
      board,
      player,
      ...ownProps,
      onClick: () => {
        socket.emit('chess', info)
        onClick(info)
      }
    }
  }

  return {
    board,
    ...ownProps
  }
}

const ColumnLTR = connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(Column)

export default ColumnLTR
