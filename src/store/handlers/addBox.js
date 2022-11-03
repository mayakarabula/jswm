import { config } from '../../config'
import * as Applications from '../../Applications'
import { v4 as uuid } from 'uuid'
import setPositions from './setPositions'

const { containerHeight, containerWidth } = config

const addBox = (action, state, order, boxes, split, layer, active) => {
  const newId = 'box' + uuid().split('-')[0]

  const { config } = Applications[action.appType]

  let box = {
    id: newId,
    type: action.appType,
    layer: state.layer,
    noTitleBar: config.noTitleBar,
    input: action.input,
  }

  if (config.mode === 'float') {
    box = {
      ...box,
      float: true,
      top: config.top || Math.floor(containerHeight / 4),
      left: config.left || Math.floor(containerWidth / 4),
      width: config.width || Math.floor(containerWidth / 2),
      height: config.height || Math.floor(containerHeight / 2),
    }
  } else {
    order = [...order, newId]

    boxes = boxes.map((box) => {
      delete box.modHeight
      return box
    })
  }

  boxes = setPositions({
    boxes: [...boxes, box],
    split,
    layer,
    order,
  })

  active = newId

  return {
    ...state,
    order,
    boxes,
    active,
  }
}

export default addBox
