import Terminal from './Terminal'
import Vscode from './Vscode'
import Image from './Image'
import Left from './Left'
import Piano from './Piano'
import Noodle from './Noodle'

export const appTypes = {
  terminal: 'terminal',
  vscode: 'vscode',
  image: 'image',
  left: 'left',
  piano: 'piano',
  noodle: 'noodle'
}

export const getAppContent = (type) => {
  switch (type) {
    case appTypes.terminal:
      return <Terminal />

    case appTypes.vscode:
      return <Vscode />

    case appTypes.image:
      return <Image />

    case appTypes.left:
      return <Left />

    case appTypes.piano:
      return <Piano />

    case appTypes.noodle:
      return <Noodle />

    default:
      return <div />
  }
}
