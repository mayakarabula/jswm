import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { addBox, setLayer, setSystemInfo } from './store/actions'
import Clock from './Clock'
import menu from './menu.json'
import { useEffect } from 'react'
import { useState } from 'react'

const Topbar = styled.div`
  top: 0;
  left: 0;
  position: fixed;
  width: 100vw;
  display: flex;
  z-index: 1000;
  padding: 2px;
  border: 1px solid;
  justify-content: space-between;
`

const TopBarSide = styled.div`
  display: flex;
`

const selectLayer = (state) => state.layer

const selectSystemInfo = (state) => state.systemInfo

const Component = () => {
  const dispatch = useDispatch()
  const layer = useSelector(selectLayer)
  const systemInfo = useSelector(selectSystemInfo)

  const [weather, setWeather] = useState('')

  useEffect(() => {
    fetch('http://localhost:8888/system')
      .then((res) => res.json())
      .then((res) => dispatch(setSystemInfo(res)))

    fetch('http://localhost:8888/weather')
      .then((res) => res.text())
      .then((res) => setWeather(res))
  }, [dispatch])

  console.log(layer)

  return (
    <Topbar className="topbar">
      <TopBarSide>
        {Object.entries(menu).map(([key, apps]) => {
          return (
            <details className="dropdown">
              <summary className="dd-toggle">{key}</summary>

              <ul className="dd-menu cyan">
                {Object.values(apps).map((app) => (
                  <li onClick={() => dispatch(addBox(app.name))}>{app.name}</li>
                ))}
              </ul>
            </details>
          )
        })}

        <details>
          <summary className="dd-toggle orange">
            {[0,1,2,3,4,5].map((index) => (
              <span key={index} onClick={() => dispatch(setLayer(index))}>
                {index === layer ? `[${layer}] ` : index + ' '}
              </span>
            ))}
          </summary>
        </details>
      </TopBarSide>

      <TopBarSide>
        <details>
          <summary className="dd-toggle">
            <Clock /> |
          </summary>
        </details>
        <details>
          <summary className="dd-toggle yellow"> {weather} </summary>
        </details>
      </TopBarSide>

      <TopBarSide>
        <details>
          <summary className="dd-toggle green"> Hey Maya</summary>
        </details>
        <details>
          <summary className="dd-toggle purple">
            {systemInfo?.battery?.percent} %
            {systemInfo?.battery?.acConnected ? ' ﮣ' : ' ﮤ'}
          </summary>
        </details>
      </TopBarSide>
    </Topbar>
  )
}

export default Component
