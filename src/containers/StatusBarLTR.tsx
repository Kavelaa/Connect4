import StatusBar from '../components/StatusBar'
import { connect } from 'react-redux'
import { Store } from '../reducers'

const mapStatetoProps = (state: Store) => {
  const { player, status, infos } = state

  return { player, status, infos }
}

const StatusBarLTR = connect(mapStatetoProps)(StatusBar)

export default StatusBarLTR
