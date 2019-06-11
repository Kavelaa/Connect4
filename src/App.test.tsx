import * as React from 'react'
import * as ReactDOM from 'react-dom'
import AppLTR from './AppLTR'

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<AppLTR />, div)
  ReactDOM.unmountComponentAtNode(div)
})
