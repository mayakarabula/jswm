import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { appTypes } from './appHelpers'
import { config } from './config'
import {
  addBox,
} from './store'
import Clock from './Clock'

const { topBarHeight } = config

const Topbar = styled.div`
  top: 0;
  left: 0;
  position: fixed;
  width: 100vw;
height: ${topBarHeight}px;
  display: flex;
  z-index: 1000;
  background-color: white;
  padding: 2px;
  border: 1px solid;
  justify-content: space-between;
`

const TopBarSide = styled.div`
  display: flex;
`

const selectLayer = (state) => state.layer

const Component = () => {
  const dispatch = useDispatch()
  const layer = useSelector(selectLayer)

  return (
    <Topbar>
      <TopBarSide>
      <details class="dropdown">
        <summary class="dd-toggle">
          Applications
        </summary>

        <ul class="dd-menu">
          {Object.values(appTypes).map(type => (
            <li onClick={() => dispatch(addBox(type))}>{type}</li>
          ))}
        </ul>
      </details>
      <details>
        <summary class="dd-toggle">
          [ {layer} ]
        </summary>
      </details>
    </TopBarSide>

      <TopBarSide>
        <details>
        <summary class="dd-toggle">
          Hey Maya
        </summary>
      </details>
        <details>
        <summary class="dd-toggle">
          <Clock/>
        </summary>
        </details>
      </TopBarSide>
    </Topbar>
  )
}

export default Component
