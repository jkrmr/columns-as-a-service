import React, { Component } from 'react'

import CSVForm from './CSVForm'
import ResultsTable from './ResultsTable'
import './App.css'

class App extends Component {
  constructor (props) {
    super(props)
    this.MIN_COLS = 2
    this.MAX_COLS = 10

    this.state = {
      errors: [],
      tableBody: [],
      numberOfColumns: this.MIN_COLS
    }
  }

  render () {
    return (
      <div className='App'>
        <CSVForm
          minColumns={this.MIN_COLS}
          maxColumns={this.MAX_COLS}
          updateSharedState={this.setState.bind(this)}
        />

        {this.renderResults()}
      </div>
    )
  }

  renderResults () {
    if (this.state.errors.length > 0) {
      return (
        <div className='errors-container'>
          {this.state.errors}
        </div>
      )
    } else {
      return (
        <ResultsTable
          tableBody={this.state.tableBody}
          numberOfColumns={this.state.numberOfColumns} />
      )
    }
  }
}

export default App
