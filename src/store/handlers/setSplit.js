import setPositions from './setPositions'

const setSplit = (boxes, split, layer, order, state, action) => {
  split = action.split
  boxes = setPositions({ boxes, split, layer, order })

  return {
    ...state,
    boxes,
    split,
  }
}

export default setSplit
