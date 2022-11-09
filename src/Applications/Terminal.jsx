import styledComponents from 'styled-components'

const Iframe = styledComponents.iframe`
    border: 0;
    width: 100%;
    height: 100%;
    border-radius: 5px;
    padding: 5px;
    background: #282a36;

    box-sizing: border-box;
`

const Component = () => (
  <Iframe src="http://localhost:8080" title="terminal" seamless />
)

const config = {
  mode: 'full',
  name: 'Terminal',
  noTitleBar: true,
}

const module = { Component, config }

export default module
