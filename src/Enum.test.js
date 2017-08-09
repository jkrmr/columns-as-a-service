import assert from 'assert'

import Enum from './Enum'

describe('Enum.eachSlice', () => {
  describe('given a slice size that divides into the collection', () => {
    it('slices into evenly sized sub-arrays', () => {
      const originalArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
      const expectedArray = [[1, 2], [3, 4], [5, 6], [7, 8], [9, 10]]

      const slicedArray = Enum.eachSlice(originalArray, 2)

      assert.deepEqual(slicedArray, expectedArray)
    })
  })

  describe('given a slice size that does not divide into the collection', () => {
    it('does not pad the final sub-array', () => {
      const originalArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
      const expectedArray = [[1, 2, 3], [4, 5, 6], [7, 8, 9], [10]]

      const slicedArray = Enum.eachSlice(originalArray, 3)

      assert.deepEqual(slicedArray, expectedArray)
    })
  })

  describe('given a slice size of 1 and a collection of length n', () => {
    it('returns an array of n sub-arrays', () => {
      const originalArray = [1, 2, 3, 4, 5]
      const expectedArray = [[1], [2], [3], [4], [5]]

      const slicedArray = Enum.eachSlice(originalArray, 1)

      assert.deepEqual(slicedArray, expectedArray)
    })
  })

  describe('given a slice size equal to the collection length', () => {
    it('returns an array of 1 sub-arrays', () => {
      const list = [1, 2, 3, 4, 5]

      const slicedArray = Enum.eachSlice(list, list.length)

      assert.deepEqual(slicedArray, [list])
    })
  })

  describe('given an invalid slice size', () => {
    it('raises an exception', () => {
      const originalArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
      const expectedArray = [[1, 2], [3, 4], [5, 6], [7, 8], [9, 10]]

      assert.throws(() => { Enum.eachSlice(originalArray, -1) })
    })
  })

  describe('given a zero slice size', () => {
    it('raises an exception', () => {
      const originalArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
      const expectedArray = [[1, 2], [3, 4], [5, 6], [7, 8], [9, 10]]

      assert.throws(() => { Enum.eachSlice(originalArray, 0) })
    })
  })
})
