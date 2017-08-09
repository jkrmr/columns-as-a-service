Columns as a Service
====================

[![CircleCI](https://circleci.com/gh/jkrmr/columns-as-a-service.svg?style=svg)](https://circleci.com/gh/jkrmr/columns-as-a-service)

Display a string of comma-separated values as a columnar table with a
user-selectable number of columns.

The app responds to input dynamically, validating input and generating the
columnar table on the fly.

Dependencies
------------

* [yarn](https://yarnpkg.com/lang/en/docs/install/)
* [React](https://facebook.github.io/react/)
* [react-bootstrap](https://github.com/react-bootstrap/react-bootstrap)

To install dependencies locally, issue `yarn install`.

To start a server locally, issue `yarn start`.

Screenshots
-----------

### Dynamic re-sorting

![demo1](https://user-images.githubusercontent.com/4433943/29000089-edaf4428-7a2e-11e7-8833-79701decc13c.png)

![demo2](https://user-images.githubusercontent.com/4433943/29000090-edb457b0-7a2e-11e7-9508-032d24b7685c.png)

### Error validation

![error-validation](https://user-images.githubusercontent.com/4433943/29000091-edb5b128-7a2e-11e7-9238-7465f8ccc519.png)


Architecture
------------

### Components

* `<CSVForm />`: The CSV string submission form
* `<ResultsTable />`: The table generated upon changes to the input
* `<CSVTransformer />`: The "controller" mediating interactions between the
  child components and the modules below.

```jsx
// src/CSVTransformer.js L21-L38 (4ddf0c9f)

  render () {
    const table = ColumnarTable.fromValues({
      valuesList: this.state.inputValues,
      numberOfColumns: this.state.selectedNumberOfColumns
    })

    return (
      <div className='App'>
        <CSVForm
          minColumns={this.MIN_COLS}
          maxColumns={this.MAX_COLS}
          maxEntries={this.MAX_CSV_ENTRIES}
          updateSharedState={this.setState.bind(this)} />

        <ResultsTable tableBody={table} />
      </div>
    )
  }
```
<sup>
  <a href="https://github.com/jkrmr/columns-as-a-service/blob/4ddf0c9f/src/CSVTransformer.js#L21-L38">
    src/CSVTransformer.js#L21-L38 (4ddf0c9f)
  </a>
</sup>

### Modules

* `ColumnarTable`

```javascript
// src/ColumnarTable.js L6-L27 (d36ac344)

  //
  // Generate a columnar table (as an Array of Arrays) of width
  // `numberOfColumns` (an Integer) from `valuesList`, expected to be a
  // 1-dimensional Array.
  //
  fromValues: ({ valuesList, numberOfColumns }) => {
    const sliceLength = Math.ceil(valuesList.length / numberOfColumns)

    if (sliceLength < 1 || isNaN(sliceLength)) { return [] }

    // partition values list into slices of length sliceLength
    const slices = Enum.eachSlice(valuesList, sliceLength)

    // transpose to make each slice into a column
    const tableBody = _.zip(...slices)

    // right-pad each row to the specified number of columns
    // (so a <td> will be rendered for empty cells, for valid HTML)
    tableBody.forEach(row => { row.length = numberOfColumns })

    return tableBody
  }
```
<sup>
  <a href="https://github.com/jkrmr/columns-as-a-service/blob/d36ac344/src/ColumnarTable.js#L6-L27">
    src/ColumnarTable.js#L6-L27 (d36ac344)
  </a>
</sup>


* `Enum`

```javascript
// src/Enum.js L1-L35 (d36ac344)

// Slice an enumerable `collection` into a list of lists, each sub-list of
// length at least `sliceLength`.
//
// Signature:
//
//   Enum.eachSlice(obj, sliceLength)
//
// Example:
//
//   >>> Enum.eachSlice([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 4)
//   [[1, 2, 3, 4], [5, 6, 7, 8], [9, 10]]
//
const Enum = {
  eachSlice: (collection, sliceLength) => {
    if (sliceLength < 1) {
      throw new InvalidSliceSizeException(sliceLength)
    }

    const slicedList = []
    const list = collection.map(e => e)
    if (typeof list.slice === 'undefined') { return slicedList }

    const numberOfSlices = Math.ceil(list.length / sliceLength)

    for (let i = 0; i < numberOfSlices; i++) {
      const startIdx = i * sliceLength
      const endIdx = startIdx + sliceLength
      const slice = list.slice(startIdx, endIdx)

      slicedList.push(slice)
    }

    return slicedList
  }
}
```
<sup>
  <a href="https://github.com/jkrmr/columns-as-a-service/blob/d36ac344/src/Enum.js#L1-L35">
    src/Enum.js#L1-L35 (d36ac344)
  </a>
</sup>



Tests
-----

Tests are written using [Jest](https://facebook.github.io/jest/) and co-located
with their implementation files.

To run tests locally, issue `yarn test` from the project root.

```javascript
// src/Enum.test.js L5-L15 (4ddf0c9f)

describe('Enum.eachSlice', () => {
  describe('given a slice size that divides into the collection', () => {
    it('slices into evenly sized sub-arrays', () => {
      const originalArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
      const expectedArray = [[1, 2], [3, 4], [5, 6], [7, 8], [9, 10]]

      const slicedArray = Enum.eachSlice(originalArray, 2)

      assert.deepEqual(slicedArray, expectedArray)
    })
  })
```
<sup>
  <a href="https://github.com/jkrmr/columns-as-a-service/blob/4ddf0c9f/src/Enum.test.js#L5-L15">
    src/Enum.test.js#L5-L15 (4ddf0c9f)
  </a>
</sup>
