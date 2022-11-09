import { config } from '../config'
import { types } from './actions'
import resizeBox from './handlers/resizeBox'
import moveBox from './handlers/moveBox'
import addBox from './handlers/addBox'
import removeBox from './handlers/removeBox'
import setBoxFloat from './handlers/setBoxFloat'
import setBoxStack from './handlers/setBoxStack'
import setNextActive from './handlers/setNextActive'
import setPrevActive from './handlers/setPrevActive'
import setTitlebar from './handlers/setTitlebar'
import setSplit from './handlers/setSplit'
import setLayer from './handlers/setLayer'
import setActive from './handlers/setActive'
import setSystemInfo from './handlers/setSystemInfo'

const { split } = config

const initialState = {
  boxes: [],
  active: null,
  split: split,
  layer: 1,
  order: [],
  systemInfo: {},
}

export const reducer = (state = initialState, action) => {
  let { boxes, active, split, layer, order } = state

  switch (action.type) {
    case types.SET_SPLIT:
      return setSplit(boxes, split, layer, order, state, action)

    case types.SET_ACTIVE:
      return setActive(state, action)

    case types.SET_LAYER:
      return setLayer(layer, action, boxes, split, order, state)

    case types.RESIZE_BOX:
      return resizeBox(boxes, active, order, layer, action, split, state)

    case types.MOVE_BOX:
      return moveBox(boxes, active, action, order, state, split, layer)

    case types.ADD_BOX:
      return addBox(action, state, order, boxes, split, layer, active)

    case types.REMOVE_BOX:
      return removeBox(action, active, boxes, split, layer, order, state)

    case types.SET_BOX_FLOAT:
      return setBoxFloat(action, active, boxes, split, layer, order, state)

    case types.SET_BOX_STACK:
      return setBoxStack(boxes, active, action, order, state, split, layer)

    case types.SET_NEXT_ACTIVE:
      return setNextActive(boxes, active, state)

    case types.SET_PREV_ACTIVE:
      return setPrevActive(boxes, active, state)

    case types.SET_TITLEBAR:
      return setTitlebar(boxes, active, action, state, split, layer, order)

    case types.SET_SYSTEM_INFO:
      return setSystemInfo(action, state)

    default:
      return state
  }
}
