import { findIndex } from 'lodash-es'
import { v4 as uuid } from 'uuid'
import { config } from './config'

const { containerHeight, containerWidth, split } = config

const initialState = {
  boxes: [],
  active: null,
  split: split,
  layer: 0
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
  SET_LAYER: 'SET_LAYER'
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

const setPositions = (boxes, split, layer) => {
  const stackBoxes = boxes.filter((box) => !box.float && box.layer === layer)

  if (stackBoxes.length > 0) {
    const left = split
    const height = Math.floor(containerHeight / (stackBoxes.length - 1))

    let stackIndex = 0

    for (let i = 0; i < boxes.length; i++) {
      if (!boxes[i].float && boxes[i].layer === layer) {
        if (stackIndex === 0) {
          boxes[i].top = 0
          boxes[i].left = 0
          boxes[i].width = stackBoxes.length > 1 ? split : containerWidth
          boxes[i].height = containerHeight
        } else {
          boxes[i].left = left
          boxes[i].top = height * (stackIndex - 1)
          boxes[i].width = containerWidth - split
          boxes[i].height = height
        }

        stackIndex++
      }
    }
  }

  return [...boxes]
}

export const reducer = (state = initialState, action) => {
  let { boxes, active, split, layer } = state
  let index

  switch (action.type) {
    case types.SET_SPLIT:
      split = action.split
      boxes = setPositions(boxes, split, layer)

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
      boxes = setPositions(boxes, split, layer)

      return {
        ...state,
        layer,
        boxes
      }

    case types.RESIZE_BOX:
      index = findIndex(boxes, (box) => box.id === active)

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
      }

      return {
        ...state,
        boxes: setPositions(boxes, split, layer),
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
      }

      return {
        ...state,
        boxes: setPositions(boxes, split, layer),
      }

    case types.ADD_BOX:
      const newId = 'box' + uuid().split('-')[0]
      boxes = setPositions(
        [
          ...boxes,
          {
            id: newId,
            type: action.appType,
            layer: state.layer
          },
        ],
        split,
        layer
      )

      if (!active) {
        active = newId
      }

      return {
        ...state,
        boxes,
        active,
      }

    case types.REMOVE_BOX:
      boxes = setPositions(
        boxes.filter((box) => box.id !== action.id),
        split,
        layer
      )

      return {
        ...state,
        boxes,
      }

    case types.SET_BOX_FLOAT:
      index = boxes.findIndex((box) => box.id === action.id)
      boxes[index].float = true
      boxes[index].top = Math.floor(containerHeight / 4)
      boxes[index].left = Math.floor(containerWidth / 4)
      boxes[index].width = Math.floor(containerWidth / 2)
      boxes[index].height = Math.floor(containerHeight / 2)

      return {
        ...state,
        boxes: setPositions(boxes, split, layer),
      }

    case types.SET_BOX_STACK:
      index = boxes.findIndex((box) => box.id === action.id)
      boxes[index].float = false

      return {
        ...state,
        boxes: setPositions(boxes, split, layer),
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

    default:
      return state
  }
}
