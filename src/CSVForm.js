import _ from 'underscore'
import React, { Component } from 'react'
import {
  Col,
  ControlLabel,
  Form,
  FormControl,
  FormGroup
} from 'react-bootstrap/lib'

import './CSVForm.css'

class CSVForm extends Component {
  constructor (props) {
    super(props)
    this.state = {
      inputString: '',
      inputColumns: this.props.minColumns,
      errors: []
    }
  }

  validationState () {
    if (this.state.errors.length === 0) { return }
    return 'error'
  }

  render () {
    return (
      <form className='CSVForm' onSubmit={e => e.preventDefault()}>
        <Form componentClass='fieldset' horizontal>
          <FormGroup controlId='formControlsSelect'>
            <Col componentClass={ControlLabel} xs={4}>
              Number of columns:
            </Col>

            <Col xs={3}>
              <FormControl
                componentClass='select'
                onChange={this.handleSelectChange.bind(this)}>
                {
                  _.range(this.props.minColumns, this.props.maxColumns + 1)
                   .map(n => <option key={n} value={n}>{n}</option>)
                }
              </FormControl>
            </Col>
          </FormGroup>
        </Form>

        <FormGroup validationState={this.validationState()}>
          <FormControl
            label='text'
            name='inputString'
            onChange={this.handleChange.bind(this)}
            onKeyUp={this.handleKeyUp.bind(this)}
            placeholder='Enter comma-separated values'
            type='text'
            value={this.state.inputString} />
          <FormControl.Feedback />
        </FormGroup>

        {this.renderErrors()}
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
    this.setState({ errors: [message] })
    this.props.updateSharedState({ inputValues: [] })
  }

  clearErrors () {
    this.setState({ errors: [] })
  }

  renderErrors () {
    return (
      <ul className='errors'>
        {_.map(this.state.errors, (err, i) => <li key={i}>{err}</li>)}
      </ul>
    )
  }
}

export default CSVForm
