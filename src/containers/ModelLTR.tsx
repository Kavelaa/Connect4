import { connect } from 'react-redux'
import Model from '../components/Model'
import { Store } from '../reducers'

const mapStatetoProps = (state: Store) => {
  const { status } = state

  return {
    status
  }
}

export default connect(mapStatetoProps)(Model)
