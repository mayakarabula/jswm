import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { config } from './config'
import { addBox } from './store'
import Clock from './Clock'
import menu from './menu.json'

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
        {Object.entries(menu).map(([key, apps]) => {
          return (
            <details className="dropdown">
              <summary className="dd-toggle">{key}</summary>

              <ul className="dd-menu">
                {Object.values(apps).map((app) => (
                  <li onClick={() => dispatch(addBox(app.name))}>{app.name}</li>
                ))}
              </ul>
            </details>
          )
        })}

        <details>
          <summary className="dd-toggle">[ {layer} ]</summary>
        </details>
      </TopBarSide>

      <TopBarSide>
        <details>
          <summary className="dd-toggle">Hey Maya</summary>
        </details>
        <details>
          <summary className="dd-toggle">
            <Clock />
          </summary>
        </details>
      </TopBarSide>
    </Topbar>
  )
}

export default Component
