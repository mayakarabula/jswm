import setPositions from './setPositions'

const setBoxStack = (boxes, active, action, order, state, split, layer) => {
  const stackId = action.id || active

  const index = boxes.findIndex((box) => box.id === stackId)
  boxes[index].float = false
  order = [...order, boxes[index].id]

  return {
    ...state,
    order,
    boxes: setPositions({ boxes, split, layer, order }),
  }
}

export default setBoxStack
