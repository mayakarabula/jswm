import { findIndex } from 'lodash-es'
import setPositions from './setPositions'

const setTitlebar = (boxes, active, action, state, split, layer, order) => {
  const index = findIndex(boxes, { id: active })

  boxes[index].noTitleBar = action.titlebar

  return {
    ...state,
    boxes: setPositions({ boxes, split, layer, order }),
  }
}

export default setTitlebar
