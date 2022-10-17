import styledComponents from 'styled-components'

const Iframe = styledComponents.iframe`
    border: 0;
    width: 100%;
    height: 100%;
`

const Component = () => (
  <Iframe
    src="https://gba.js.org/player#tetris_worlds"
    title="tetris"
    seamless
  />
)

const config = {
  mode: 'float',
  name: 'Tetris',
  width: 8,
  height: 22,
}

const module = { Component, config }

export default module
