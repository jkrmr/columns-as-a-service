import React from 'react'
import ReactDOM from 'react-dom'

import CSVTransformer from './CSVTransformer'

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<CSVTransformer />, div)
})
