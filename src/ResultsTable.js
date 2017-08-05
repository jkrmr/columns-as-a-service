import React from 'react'
import _ from 'underscore'

const ResultsTable = ({ tableBody }) => {
  if (tableBody.length === 0) { return <div /> }

  const firstRow = tableBody[0]
  const numberOfColumns = firstRow.length

  const renderTableRows = (tableBody) => {
    return _.map(tableBody, (row, rowNum) => {
      return (
        <tr key={rowNum}>
          {
            _.map(row, (cell, colNum) => {
              return <td key={`${rowNum}-${colNum}`}>{cell}</td>
            })
          }
        </tr>
      )
    })
  }

  const renderTableHeaders = (numberOfColumns) => {
    return (
      <tr>
        {
          _.range(1, numberOfColumns + 1)
           .map((n) => <th key={`col-${n}`}>{n}</th>)
        }
      </tr>
    )
  }

  return (
    <div className='ResultsTable'>
      <table>
        <tbody>
          {renderTableHeaders(numberOfColumns)}
          {renderTableRows(tableBody)}
        </tbody>
      </table>
    </div>
  )
}

export default ResultsTable
