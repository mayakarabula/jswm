import { findIndex } from 'lodash-es'

const setPrevActive = (boxes, active, state) => {
  const index = findIndex(boxes, { id: active }) - 1

  return {
    ...state,
    active: boxes[index].id,
  }
}

export default setPrevActive
