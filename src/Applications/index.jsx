import Terminal from './Terminal'
import Vscode from './Vscode'
import Image from './Image'

export const appTypes = {
  terminal: 'terminal',
  vscode: 'vscode',
  image: 'image'
}

export const getAppContent = (type) => {
  switch (type) {
    case appTypes.terminal:
      return <Terminal />

    case appTypes.vscode:
      return <Vscode />

    case appTypes.image:
      return <Image />

    default:
      return <div />
  }
}
