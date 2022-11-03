const setActive = (state, action) => {
  return {
    ...state,
    active: action.active,
  }
}

export default setActive
