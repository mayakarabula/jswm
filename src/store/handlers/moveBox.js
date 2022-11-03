import { findIndex } from 'lodash-es'
import setPositions from './setPositions'

const swapArrayElements = (array, x, y) => {
  const temp = array[y]
  array[y] = array[x]
  array[x] = temp

  return [...array]
}

const moveBox = (boxes, active, action, order, state, split, layer) => {
  const index = findIndex(boxes, (box) => box.id === active)

  if (boxes[index].float) {
    if (action.move === 'exact') {
      boxes[index].left = action.left
      boxes[index].top = action.top
      boxes[index].exact = true
    } else {
      if (action.move === 'left') {
        boxes[index].left -= 1
      }
      if (action.move === 'right') {
        boxes[index].left += 1
      }
      if (action.move === 'up') {
        boxes[index].top -= 1
      }
      if (action.move === 'down') {
        boxes[index].top += 1
      }
    }
  } else {
    const orderIndex = findIndex(order, (id) => id === active)

    if (action.move === 'left') {
      order = swapArrayElements(order, 0, orderIndex)
    } else if (action.move === 'right' && orderIndex === 0) {
      order = swapArrayElements(order, 0, 1)
    } else if (action.move === 'up' && orderIndex > 1) {
      order = swapArrayElements(order, orderIndex, orderIndex - 1)
    } else if (
      action.move === 'down' &&
      orderIndex > 0 &&
      orderIndex !== order.length - 1
    ) {
      order = swapArrayElements(order, orderIndex, orderIndex + 1)
    }
  }

  return {
    ...state,
    order,
    boxes: setPositions({ boxes, split, layer, order }),
  }
}

export default moveBox
