/**
 * Emulates Ruby's Enumerable#each_slice method.
 * http://www.ruby-doc.org/core/classes/Enumerable.html#M001514
 *
 * Example:
 *
 *   >>> _.each_slice([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 4)
 *   [[1, 2, 3, 4], [5, 6, 7, 8], [9, 10]]
 *
 */

// _.each_slice(obj, sliceLength, [iterator], [context])
const eachSlice = (obj, sliceLength, iterator, context) => {
  const collection = obj.map(item => item)
  const o = []
  const it = iterator || function() {}
  let t = null

  if (typeof collection.slice !== 'undefined') {
    for (let i = 0, s = Math.ceil(collection.length / sliceLength); i <
      s; i++) {
      it.call(context, (t = (collection)
        .slice(i * sliceLength, (i * sliceLength) + sliceLength), o
        .push(
          t), t), obj);
    }
  }

  return o;
}

export default eachSlice
