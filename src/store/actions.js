export const types = {
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
  SET_TITLEBAR: 'SET_TITLEBAR',
  SET_SYSTEM_INFO: 'SET_SYSTEM_INFO',
}

export const addBox = (appType, input) => ({
  type: types.ADD_BOX,
  appType,
  input,
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

export const setBoxMove = (move, left, top) => ({
  type: types.MOVE_BOX,
  move,
  left,
  top,
})

export const resizeBox = (resize) => ({
  type: types.RESIZE_BOX,
  resize,
})

export const setLayer = (layer) => ({
  type: types.SET_LAYER,
  layer,
})

export const setTitlebar = (titlebar) => ({
  type: types.SET_TITLEBAR,
  titlebar,
})

export const setSystemInfo = (systemInfo) => ({
  type: types.SET_SYSTEM_INFO,
  systemInfo,
})
