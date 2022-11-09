import styledComponents from 'styled-components'

const Iframe = styledComponents.iframe`
    border: 0;
    width: 100%;
    height: 100%;
`

const Component = () => (
  <Iframe src="http://localhost:9988" title="Xpra" seamless />
)
const config = {
  mode: 'float',
  name: 'Xpra',
}

const module = { Component, config }

export default module
