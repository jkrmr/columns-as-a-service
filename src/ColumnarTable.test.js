import assert from 'assert'

import ColumnarTable from './ColumnarTable'

describe("ColumnarTable.fromValues", () => {
  it("fills a table column-wise from the given list", () => {
    const list = [1, 2, 3, 4, 5, 6, 7, 8]
    const expectedTable = [
      [1, 5],
      [2, 6],
      [3, 7],
      [4, 8]
    ]

    const actualTable = ColumnarTable.fromValues({
      valuesList: list,
      numberOfColumns: 2
    })

    assert.deepEqual(actualTable, expectedTable)
  })

  it("adds padding so all sub-arrays are the same length", () => {
    const list = [1, 2, 3, 4, 5, 6, 7]
    const expectedTable = [
      [1, 4, 7],
      [2, 5, undefined],
      [3, 6, undefined]
    ]

    const actualTable = ColumnarTable.fromValues({
      valuesList: list,
      numberOfColumns: 3
    })

    assert.deepEqual(actualTable, expectedTable)
  })

  it("handles empty lists", () => {
    const actualTable = ColumnarTable.fromValues({
      valuesList: [],
      numberOfColumns: 3
    })

    assert.deepEqual(actualTable, [])
  })

  it("handles number of columns equal to list length", () => {
    const list = [1, 2, 3]

    const actualTable = ColumnarTable.fromValues({
      valuesList: list,
      numberOfColumns: 3
    })

    assert.deepEqual(actualTable, [list])
  })

  it("given an invalid number of columns, returns an empty table", () => {
    const list = [1, 2, 3]

    const actualTable = ColumnarTable.fromValues({
      valuesList: list,
      numberOfColumns: -1
    })

    assert.deepEqual(actualTable, [])
  })

  it("given an invalid number of columns, returns an empty table", () => {
    const list = [1, 2, 3]

    const actualTable = ColumnarTable.fromValues({
      valuesList: list,
      numberOfColumns: 0
    })

    assert.deepEqual(actualTable, [])
  })
})
