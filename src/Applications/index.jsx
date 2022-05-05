import Terminal from './Terminal'
import Vscode from './Vscode'

export const appTypes = {
  terminal: 'terminal',
  vscode: 'vscode',
}

export const getAppContent = (type) => {
  switch (type) {
    case appTypes.terminal:
      return <Terminal />

    case appTypes.vscode:
      return <Vscode />

    default:
      return <div />
  }
}
