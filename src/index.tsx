import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { devToolsEnhancer } from 'redux-devtools-extension'
import AppLTR from './AppLTR'
import './index.css'
import registerServiceWorker from './registerServiceWorker'
import { mainReducer } from './reducers'

const store = createStore(mainReducer, devToolsEnhancer({}))

ReactDOM.render(
  <Provider store={store}>
    <AppLTR />
  </Provider>,
  document.getElementById('root') as HTMLElement
)
registerServiceWorker()
