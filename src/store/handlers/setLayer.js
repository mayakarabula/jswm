import setPositions from './setPositions'

const setLayer = (layer, action, boxes, split, order, state) => {
  layer = action.layer
  boxes = setPositions({ boxes, split, layer, order })

  return {
    ...state,
    layer,
    boxes,
  }
}

export default setLayer
