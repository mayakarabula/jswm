import setPositions from './setPositions'

const removeBox = (action, active, boxes, split, layer, order, state) => {
  const killId = action.id || active
  order = order.filter((id) => id !== killId)

  boxes = setPositions({
    boxes: boxes.filter((box) => box.id !== action.id),
    split,
    layer,
    order,
  })

  return {
    ...state,
    boxes,
    order,
  }
}

export default removeBox
