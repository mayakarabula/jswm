import styledComponents from 'styled-components'

const Iframe = styledComponents.iframe`
    border: 0;
    width: 100%;
    height: 100%;
`

const Component = () => (
  <Iframe src="https://vscode.dev/" title="vs code" seamless />
)

export default Component
