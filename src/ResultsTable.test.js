import React from 'react'
import ReactDOM from 'react-dom'

import ResultsTable from './ResultsTable'

it('renders without crashing', () => {
  const div = document.createElement('div')
  const table = <ResultsTable tableBody={[]} />

  ReactDOM.render(table, div)
})
