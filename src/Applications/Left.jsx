import styledComponents from 'styled-components'

const Iframe = styledComponents.iframe`
    border: 0;
    width: 100%;
    height: 100%;
`

const Component = () => (
  <Iframe src="http://localhost:2222/left.html" title="left" seamless />
)

const config = {
  mode: 'float',
  name: 'Left',
}

const module = { Component, config }

export default module
