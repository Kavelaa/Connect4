import App from './App'
import { connect } from 'react-redux'
import { Store } from './reducers'

const mapStatetoProps = (state: Store) => {
  const { status, board } = state
  return { status, board }
}

export default connect(mapStatetoProps)(App)
