import { find, findIndex, last } from 'lodash-es'
import { config } from '../../config'
import setPositions from './setPositions'

const { containerHeight } = config

const resizeBox = (boxes, active, order, layer, action, split, state) => {
  const index = findIndex(boxes, (box) => box.id === active)
  const stackBoxes = order
    .map((id) => find(boxes, { id }))
    .filter((box) => box.layer === layer)
  const boxesWithModHeight = stackBoxes.filter((box) => box.modHeight)
  const modHeights = boxesWithModHeight.reduce(
    (prev, curr) => prev + curr.modHeight,
    0
  )
  const avgHeight = () =>
    Math.floor(
      (containerHeight - modHeights) /
        (stackBoxes.length - boxesWithModHeight.length - 1)
    )

  const freeUpSpace = () => {
    if (stackBoxes.length - boxesWithModHeight.length === 2) {
      if (last(stackBoxes).id === boxes[index].id) {
        delete stackBoxes[1].modHeight
      } else {
        delete last(stackBoxes).modHeight
      }
    }
  }

  if (boxes[index].float) {
    if (action.resize === 'left') {
      boxes[index].width -= 1
    }
    if (action.resize === 'right') {
      boxes[index].width += 1
    }
    if (action.resize === 'up') {
      boxes[index].height -= 1
    }
    if (action.resize === 'down') {
      boxes[index].height += 1
    }
  } else {
    if (action.resize === 'left') {
      split -= 1
    }
    if (action.resize === 'right') {
      split += 1
    }
    if (action.resize === 'up' && stackBoxes.length > 2) {
      if (boxes[index].modHeight > 3) {
        boxes[index].modHeight -= 1
      } else if (!boxes[index].modHeight) {
        freeUpSpace()
        boxes[index].modHeight = avgHeight() - 1
      }
    }
    if (action.resize === 'down' && stackBoxes.length > 2) {
      if (boxes[index].modHeight) {
        if (
          avgHeight() >
          (stackBoxes.length - boxesWithModHeight.length - 1) * 3
        ) {
          boxes[index].modHeight += 1
        }
      } else {
        freeUpSpace()
        boxes[index].modHeight = avgHeight() + 1
      }
    }
  }

  return {
    ...state,
    boxes: setPositions({ boxes, split, layer, order }),
    split,
  }
}

export default resizeBox
