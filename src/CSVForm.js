import _ from 'underscore'
import React, { Component } from 'react'

class CSVForm extends Component {
  constructor (props) {
    super(props)
    this.state = {
      inputString: '',
      inputColumns: this.props.minColumns
    }
  }

  render () {
    return (
      <form
        className='CsvForm'
        onSubmit={e => e.preventDefault()}>

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
            onChange={this.handleSelectChange.bind(this)}>
            {
              _.range(this.props.minColumns, this.props.maxColumns + 1)
               .map(n => <option key={n} value={n}>{n}</option>)
            }
          </select>
        </div>
      </form>
    )
  }

  handleKeyUp (event) {
    this.handleInput({
      inputString: event.target.value,
      inputColumns: this.state.inputColumns
    })
  }

  handleChange (event) {
    this.handleInput({
      inputString: event.target.value,
      inputColumns: this.state.inputColumns
    })
  }

  handleSelectChange (event) {
    this.handleInput({
      inputString: this.state.inputString,
      inputColumns: parseInt(event.target.value, 10)
    })
  }

  handleInput ({ inputString, inputColumns }) {
    this.setState({ inputString, inputColumns })
    this.props.updateSharedState({ selectedNumberOfColumns: inputColumns })

    const list =
      inputString
      .split(',')
      .filter(s => s !== '')

    if (list.length > 0 && list.length <= this.props.maxEntries) {
      this.clearErrors()
      this.props.updateSharedState({
        inputValues: list,
        selectedNumberOfColumns: inputColumns
      })
    } else {
      this.setError(`Entered ${list.length} items.
                     Please enter between 1 and ${this.props.maxEntries}.`)
    }
  }

  setError (message) {
    this.props.updateSharedState({ errors: [message], inputValues: [] })
  }

  clearErrors () {
    this.props.updateSharedState({ errors: [] })
  }
}

export default CSVForm
