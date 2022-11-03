import styledComponents from 'styled-components'
import { configVariables } from '../configVariables'

const Iframe = styledComponents.iframe`
    border: 0;
    width: 100%;
    height: 100%;
`

const Component = () => (
  <Iframe
    src={`https://insiders.vscode.dev/tunnel/nifty-partridge`}
    title="vs code"
    seamless
  />
)

const config = {
  mode: 'full',
  name: 'Vscode',
}

const module = { Component, config }

export default module
