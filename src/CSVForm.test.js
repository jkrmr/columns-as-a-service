import React from 'react'
import ReactDOM from 'react-dom'

import CSVForm from './CSVForm'

it('renders without crashing', () => {
  const div = document.createElement('div')
  const csvForm =
    <CSVForm
      minColumns={2}
      maxColumns={5}
      maxEntries={100}
      updateSharedState={() => {}} />

  ReactDOM.render(csvForm, div)
})
