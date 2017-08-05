import React, { Component } from 'react'
import _ from 'underscore'
import eachSlice from './eachSlice'
import './App.css'

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      csv: '',
      slicedCells: [],
      numberOfColumns: 2,
      errors: []
    }
  }

  populateTable ({valuesList, numberOfColumns}) {
    this.clearErrors()

    const sliceLength = Math.ceil(valuesList.length / numberOfColumns)
    const slices = eachSlice(valuesList, sliceLength)
    const slicedCells = _.zip(...slices)
    slicedCells.forEach(row => { row.length = numberOfColumns })

    this.setState({ slicedCells })
  }

  setError (message) {
    this.clearErrors()
    this.setState({ errors: [message] })
  }

  clearErrors () {
    this.setState({errors: []})
  }

  handleInput ({ csv, numberOfColumns }) {
    this.setState({ csv, numberOfColumns })
    const list = csv.split(',').filter(s => s !== '')

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
      csv: event.target.value,
      numberOfColumns: this.state.numberOfColumns
    })
  }

  handleChange (event) {
    this.handleInput({
      csv: event.target.value,
      numberOfColumns: this.state.numberOfColumns
    })
  }

  handleSelectChange (event) {
    this.handleInput({
      csv: this.state.csv,
      numberOfColumns: parseInt(event.target.value, 10)
    })
  }

  renderTable () {
    return _.map(this.state.slicedCells, (row, rowNum) => {
      return (
        <tr key={rowNum}>
          {_.map(row, (cell, colNum) => <td key={`${rowNum}-${colNum}`}>{cell}</td>)}
        </tr>
      )
    })
  }

  renderTableHeaders () {
    return (
      <tr>
        {_.range(1, this.state.numberOfColumns + 1)
          .map((n) => <th key={`col-${n}`}>{n}</th>)}
      </tr>
    )
  }

  renderErrors () {
    if (this.state.errors.count === 0) { return }

    return (
      <div className='errors-container'>
        {this.state.errors}
      </div>
    )
  }

  render () {
    return (
      <div className='App'>
        <form className='CsvForm' onSubmit={e => e.preventDefault()}>
          <div>
            <input
              name='csv'
              type='text'
              value={this.state.csv}
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

          {this.renderErrors()}
        </form>

        <div className='ResultsTable'>
          <table>
            <tbody>
              {this.renderTableHeaders()}
              {this.renderTable()}
            </tbody>
          </table>
        </div>
      </div>
    )
  }
}

export default App
