import { findIndex, find, last } from 'lodash-es'
import { v4 as uuid } from 'uuid'
import { config } from './config'
import * as Applications from './Applications'

const { containerHeight, containerWidth, split } = config

const initialState = {
  boxes: [],
  active: null,
  split: split,
  layer: 1,
  order: []
}

const types = {
  ADD_BOX: 'ADD_BOX',
  REMOVE_BOX: 'REMOVE_BOX',
  SET_ACTIVE: 'SET_ACTIVE',
  SET_NEXT_ACTIVE: 'SET_NEXT_ACTIVE',
  SET_PREV_ACTIVE: 'SET_PREV_ACTIVE',
  SET_SPLIT: 'SET_SPLIT',
  SET_BOX_FLOAT: 'SET_BOX_FLOAT',
  SET_BOX_STACK: 'SET_BOX_STACK',
  MOVE_BOX: 'MOVE_BOX',
  RESIZE_BOX: 'RESIZE_BOX',
  SET_LAYER: 'SET_LAYER',
  SET_TITLEBAR: 'SET_TITLEBAR'
}

export const addBox = (appType) => ({
  type: types.ADD_BOX,
  appType,
})

export const removeBox = (id) => ({
  type: types.REMOVE_BOX,
  id,
})

export const setActive = (active) => ({
  type: types.SET_ACTIVE,
  active,
})

export const setNextActive = () => ({
  type: types.SET_NEXT_ACTIVE,
})

export const setPrevActive = () => ({
  type: types.SET_PREV_ACTIVE,
})

export const setSplit = (split) => ({
  type: types.SET_SPLIT,
  split,
})

export const setBoxFloat = (id) => ({
  type: types.SET_BOX_FLOAT,
  id,
})

export const setBoxStack = (id) => ({
  type: types.SET_BOX_STACK,
  id,
})

export const setBoxMove = (move) => ({
  type: types.MOVE_BOX,
  move,
})

export const resizeBox = (resize) => ({
  type: types.RESIZE_BOX,
  resize,
})

export const setLayer = (layer) => ({
  type: types.SET_LAYER,
  layer
})

export const setTitlebar = (titlebar) => ({
  type: types.SET_TITLEBAR,
  titlebar
})

const setPositions = ({ boxes, split, layer, order }) => {

  console.log({ layer, order, boxes })
console.log(order.map(id => find(boxes, { id })))

  const stackBoxes = order.map(id => find(boxes, { id })).filter((box) => box.layer === layer)

  if (stackBoxes.length > 0) {
    const left = split
    const boxesWithModHeight = stackBoxes.filter(box => box.modHeight)
    const modHeights = boxesWithModHeight.reduce((prev, curr) => prev + curr.modHeight, 0)
    const avgHeight = Math.floor((containerHeight - modHeights) / (stackBoxes.length - boxesWithModHeight.length - 1))

    console.log({ modHeights, boxesWithModHeight, avgHeight })

    let positionY = 0

    for (let i = 0; i < stackBoxes.length; i++) {
      if (stackBoxes[i].layer === layer) {
        if (i === 0) {
          stackBoxes[i].top = 0
          stackBoxes[i].left = 0
          stackBoxes[i].width = stackBoxes.length > 1 ? split : containerWidth
          stackBoxes[i].height = containerHeight
        } else {
          stackBoxes[i].left = left
          stackBoxes[i].top = positionY
          stackBoxes[i].width = containerWidth - split
          stackBoxes[i].height = stackBoxes[i].modHeight || avgHeight

          positionY += stackBoxes[i].height
        }
      }
    }
  }

  return [...boxes]
}

const swapArrayElements = (array, x, y) => {
  const temp = array[y];
  array[y] = array[x];
  array[x] = temp;

  return [...array]
}

export const reducer = (state = initialState, action) => {
  let { boxes, active, split, layer, order } = state
  let index

  switch (action.type) {
    case types.SET_SPLIT:
      split = action.split
      boxes = setPositions({ boxes, split, layer, order })

      return {
        ...state,
        boxes,
        split,
      }

    case types.SET_ACTIVE:
      return {
        ...state,
        active: action.active,
      }

    case types.SET_LAYER:
      layer = action.layer
      boxes = setPositions({ boxes, split, layer, order })

      return {
        ...state,
        layer,
        boxes
      }

    case types.RESIZE_BOX:
      index = findIndex(boxes, (box) => box.id === active)
      const stackBoxes = order.map(id => find(boxes, { id })).filter((box) => box.layer === layer)
      const boxesWithModHeight = stackBoxes.filter(box => box.modHeight)
      const modHeights = boxesWithModHeight.reduce((prev, curr) => prev + curr.modHeight, 0)
      const avgHeight = () => Math.floor((containerHeight - modHeights) / (stackBoxes.length - boxesWithModHeight.length -1))

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
            if (avgHeight() > (stackBoxes.length - boxesWithModHeight.length - 1) * 3) {
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

    case types.MOVE_BOX:
      index = findIndex(boxes, (box) => box.id === active)

      if (boxes[index].float) {
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
      } else {
        const orderIndex = findIndex(order, id => id === active)

        if (action.move === 'left') {
          order = swapArrayElements(order, 0, orderIndex)

        } else if (action.move === 'right' && orderIndex === 0) {
          order = swapArrayElements(order, 0, 1)

        } else if (action.move === 'up' && orderIndex > 1) {
          order = swapArrayElements(order, orderIndex, orderIndex - 1)

        } else if (action.move === 'down' && orderIndex > 0 && (orderIndex !== order.length - 1)) {
          order = swapArrayElements(order, orderIndex, orderIndex + 1)
        }
      }

      return {
        ...state,
        order,
        boxes: setPositions({ boxes, split, layer, order }),
      }

    case types.ADD_BOX:
      const newId = 'box' + uuid().split('-')[0]

      console.log(action.appType)
      console.log(
        Applications
      )

      const { config } = Applications[action.appType]

      let box = {
        id: newId,
        type: action.appType,
        layer: state.layer,
        noTitleBar: config.noTitleBar
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

        boxes = boxes.map(box => {
          delete box.modHeight
          return box
        })
      }

      boxes = setPositions({
        boxes: [
          ...boxes,
          box,
        ],
        split,
        layer,
        order
      })

      active = newId

      return {
        ...state,
        order,
        boxes,
        active,
      }

    case types.REMOVE_BOX:
      const killId = action.id || active
      order = order.filter((id) => id !== killId)

      boxes = setPositions({
          boxes: boxes.filter((box) => box.id !== action.id),
          split,
          layer,
          order
      })

      return {
        ...state,
        boxes,
        order
      }

    case types.SET_BOX_FLOAT:
      const floatId = action.id || active
      index = boxes.findIndex((box) => box.id === floatId)
      
      boxes[index].float = true
      boxes[index].top = Math.floor(containerHeight / 4)
      boxes[index].left = Math.floor(containerWidth / 4)
      boxes[index].width = Math.floor(containerWidth / 2)
      boxes[index].height = Math.floor(containerHeight / 2)
      order = order.filter(id => id !== boxes[index].id)

      return {
        ...state,
        order,
        boxes: setPositions({ boxes, split, layer, order }),
      }

    case types.SET_BOX_STACK:
      const stackId = action.id || active

      index = boxes.findIndex((box) => box.id === stackId)
      boxes[index].float = false
      order = [...order, boxes[index].id]

      return {
        ...state,
        order,
        boxes: setPositions({ boxes, split, layer, order }),
      }

    case types.SET_NEXT_ACTIVE:
      index = findIndex(boxes, { id: active }) + 1

      return {
        ...state,
        active: boxes[index].id,
      }
    case types.SET_PREV_ACTIVE:
      index = findIndex(boxes, { id: active }) - 1

      return {
        ...state,
        active: boxes[index].id,
      }

    case types.SET_TITLEBAR:
      index = findIndex(boxes, { id: active })

      boxes[index].noTitleBar = action.titlebar

      return {
        ...state,
        boxes: setPositions({ boxes, split, layer, order }),
      }

    default:
      return state
  }
}
