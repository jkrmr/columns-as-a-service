import _ from 'underscore'
import React, { Component } from 'react'

import eachSlice from './eachSlice'
import ResultsTable from './ResultsTable'
import './App.css'

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      inputString: '',
      numberOfColumns: 2,
      errors: [],
      tableBody: []
    }
  }

  populateTable ({valuesList, numberOfColumns}) {
    this.clearErrors()

    const sliceLength = Math.ceil(valuesList.length / numberOfColumns)
    const slices = eachSlice(valuesList, sliceLength)
    const tableBody = _.zip(...slices)
    tableBody.forEach(row => { row.length = numberOfColumns })

    this.setState({ tableBody })
  }

  setError (message) {
    this.clearErrors()
    this.setState({ errors: [message], tableBody: [] })
  }

  clearErrors () {
    this.setState({errors: []})
  }

  handleInput ({ inputString, numberOfColumns }) {
    this.setState({ inputString, numberOfColumns })
    const list = inputString.split(',').filter(s => s !== '')

    if (list.length > 0 && list.length <= 100) {
      this.populateTable({
        valuesList: list,
        numberOfColumns: numberOfColumns
      })
    } else {
      this.setError(`Entered ${list.length} items. Please enter between 1 and 100.`)
    }
  }

  handleKeyUp (event) {
    this.handleInput({
      inputString: event.target.value,
      numberOfColumns: this.state.numberOfColumns
    })
  }

  handleChange (event) {
    this.handleInput({
      inputString: event.target.value,
      numberOfColumns: this.state.numberOfColumns
    })
  }

  handleSelectChange (event) {
    this.handleInput({
      inputString: this.state.inputString,
      numberOfColumns: parseInt(event.target.value, 10)
    })
  }

  render () {
    return (
      <div className='App'>
        <form className='CsvForm' onSubmit={e => e.preventDefault()}>
          <div>
            <input
              name='inputString'
              type='text'
              value={this.state.inputString}
              onChange={this.handleChange.bind(this)}
              onKeyUp={this.handleKeyUp.bind(this)} />
          </div>

          <div>
            <label htmlFor='cols'>
              Number of columns to display:
            </label>
            <select
              name='cols'
              onChange={this.handleSelectChange.bind(this)} >
              {_.range(2, 11).map(n => <option key={n} value={n}>{n}</option>)}
            </select>
          </div>
        </form>

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
