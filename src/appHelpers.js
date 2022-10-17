import * as Applications from './Applications'

export const appTypes = Object.values(Applications).reduce((prev, curr) => {
  const { name } = curr.config

  return {
    ...prev,
    [name]: name,
  }
}, {})

export const getAppContent = (type, input) => {
  const { Component } = Applications[type]

  return Component ? <Component input={input} /> : <div />
}
