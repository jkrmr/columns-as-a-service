import React, { Component } from 'react'

import CSVForm from './CSVForm'
import ResultsTable from './ResultsTable'
import ColumnarTable from './ColumnarTable'
import './App.css'

class App extends Component {
  constructor (props) {
    super(props)
    this.MIN_COLS = 2
    this.MAX_COLS = 10
    this.MAX_CSV_ENTRIES = 100

    this.state = {
      errors: [],
      inputValues: [],
      selectedNumberOfColumns: this.MIN_COLS
    }
  }

  render () {
    return (
      <div className='App'>
        <CSVForm
          minColumns={this.MIN_COLS}
          maxColumns={this.MAX_COLS}
          maxEntries={this.MAX_CSV_ENTRIES}
          updateSharedState={this.setState.bind(this)} />

        {this.renderResults()}
      </div>
    )
  }

  renderResults () {
    if (this.state.errors.length > 0) {
      return <div className='errors'>{this.state.errors}</div>
    } else {
      const table = ColumnarTable.fromValues({
        valuesList: this.state.inputValues,
        numberOfColumns: this.state.selectedNumberOfColumns
      })

      return <ResultsTable tableBody={table} />
    }
  }
}

export default App
