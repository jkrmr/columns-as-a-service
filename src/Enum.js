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

class InvalidSliceSizeException {
  constructor(givenSize) {
    this.name = 'InvalidSliceSizeException'
    this.message = `the given slice size ${givenSize} must be > 0`
  }
}

export default Enum
