import _ from 'underscore'

import Enum from './Enum'

const ColumnarTable = {
  /**
    Generate a columnar table (as an Array of Arrays) of width
    `numberOfColumns` (an Integer) from `valuesList`, expected to be a
    1-dimensional Array.
  */
  fromValues: ({ valuesList, numberOfColumns }) => {
    const sliceLength = Math.ceil(valuesList.length / numberOfColumns)

    // partition values list into slices of length sliceLength
    const slices = Enum.eachSlice(valuesList, sliceLength)

    // transpose to make each slice into a column
    const tableBody = _.zip(...slices)

    // right-pad each row to the specified number of columns
    // (so a <td> will be rendered for empty cells, for valid HTML)
    tableBody.forEach(row => { row.length = numberOfColumns })

    return tableBody
  }
}

export default ColumnarTable
