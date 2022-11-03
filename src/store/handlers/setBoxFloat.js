import { config } from '../../config'
import setPositions from './setPositions'

const { containerHeight, containerWidth } = config

const setBoxFloat = (action, active, boxes, split, layer, order, state) => {
  const floatId = action.id || active
  const index = boxes.findIndex((box) => box.id === floatId)

  boxes[index].float = true
  boxes[index].top = Math.floor(containerHeight / 4)
  boxes[index].left = Math.floor(containerWidth / 4)
  boxes[index].width = Math.floor(containerWidth / 2)
  boxes[index].height = Math.floor(containerHeight / 2)
  order = order.filter((id) => id !== boxes[index].id)

  return {
    ...state,
    order,
    boxes: setPositions({ boxes, split, layer, order }),
  }
}

export default setBoxFloat
