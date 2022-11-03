const setSystemInfo = (action, state) => {
  const { systemInfo } = action

  return {
    ...state,
    systemInfo,
  }
}

export default setSystemInfo
