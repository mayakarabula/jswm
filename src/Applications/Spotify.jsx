import styledComponents from 'styled-components'
import { configVariables } from '../configVariables'

const Iframe = styledComponents.iframe`
    border: 0;
    width: 100%;
    height: 100%;
`

const Component = () => (
  <Iframe src='https://spotify.com' title="Spotify" seamless />
)

const config = {
  mode: 'full',
  name: 'Spotify',
}

const module = { Component, config }

export default module
