import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { appTypes } from './Applications'
import { config } from './config'
import {
  addBox,
  resizeBox,
  setActive,
  setBoxMove,
  setNextActive,
  setPrevActive,
  setSplit,
  setLayer
} from './store'
import { colors } from './style'
import Clock from './Clock'

const { topBarHeight, margin } = config

const Topbar = styled.div`
  top: 0;
  left: 0;
  position: fixed;
  width: 100vw;
  height: ${topBarHeight}px;
  background-color: ${colors.black};
  color: ${colors.white};
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 ${margin}px;
  box-sizing: border-box;
  font-size: 12px;
`

const TopBarIcon = styled.a`
  text-decoration: none;
  color: inherit;
  cursor: pointer;
  display: block;
  margin-right: 10px;
`

const TopBarSide = styled.div`
  display: flex;
`

const selectBoxes = (state) => state.boxes
const selectSplit = (state) => state.split
const selectLayer = (state) => state.layer

const Component = () => {
  const dispatch = useDispatch()
  const boxes = useSelector(selectBoxes)
  const split = useSelector(selectSplit)
  const layer = useSelector(selectLayer)

  const [selectedMode, setMode] = useState('normal')

  return (
    <Topbar>
      <TopBarSide>
        <TopBarIcon>menu</TopBarIcon>
        <TopBarIcon onClick={() => dispatch(addBox(appTypes.terminal))}>
          terminal
        </TopBarIcon>
        <TopBarIcon onClick={() => dispatch(addBox(appTypes.vscode))}>
          vscode
        </TopBarIcon>
        <TopBarIcon>|</TopBarIcon>
        {['normal', 'focus', 'resize', 'move'].map((mode) => (
          <TopBarIcon onClick={() => setMode(mode)}>
            {selectedMode === mode ? '[' + mode + ']' : mode}
          </TopBarIcon>
        ))}
        <TopBarIcon>|</TopBarIcon>
        {selectedMode === 'focus' && (
          <>
            <TopBarIcon
              onClick={() => boxes[0] && dispatch(setActive(boxes[0].id))}
            >
              Left
            </TopBarIcon>
            <TopBarIcon
              onClick={() => boxes[1] && dispatch(setActive(boxes[1].id))}
            >
              Rright
            </TopBarIcon>
            <TopBarIcon onClick={() => dispatch(setNextActive())}>
              Down
            </TopBarIcon>
            <TopBarIcon onClick={() => dispatch(setPrevActive())}>
              Up
            </TopBarIcon>
          </>
        )}
        {selectedMode === 'resize' && (
          <>
            <TopBarIcon onClick={() => dispatch(resizeBox('left'))}>
              Left
            </TopBarIcon>
            <TopBarIcon onClick={() => dispatch(resizeBox('right'))}>
              Right
            </TopBarIcon>
            <TopBarIcon onClick={() => dispatch(resizeBox('up'))}>
              Up
            </TopBarIcon>
            <TopBarIcon onClick={() => dispatch(resizeBox('down'))}>
              Down
            </TopBarIcon>
          </>
        )}
        {selectedMode === 'move' && (
          <>
            <TopBarIcon onClick={() => dispatch(setBoxMove('left'))}>
              Left
            </TopBarIcon>
            <TopBarIcon onClick={() => dispatch(setBoxMove('right'))}>
              Right
            </TopBarIcon>
            <TopBarIcon onClick={() => dispatch(setBoxMove('up'))}>
              Up
            </TopBarIcon>
            <TopBarIcon onClick={() => dispatch(setBoxMove('down'))}>
              Down
            </TopBarIcon>
          </>
        )}
        <>
          <TopBarIcon onClick={() => dispatch(setLayer(0))}>
            {layer === 0 ? '[0]' : '0'}
          </TopBarIcon>
          <TopBarIcon onClick={() => dispatch(setLayer(1))}>
            {layer === 1 ? '[1]' : '1'}
          </TopBarIcon>
          <TopBarIcon onClick={() => dispatch(setLayer(2))}>
            {layer === 2 ? '[2]' : '2'}
          </TopBarIcon>
          <TopBarIcon onClick={() => dispatch(setLayer(3))}>
            {layer === 3 ? '[3]' : '3'}
          </TopBarIcon>
        </>
      </TopBarSide>
      <TopBarSide>
        <TopBarIcon>Heyyy Mayaaa </TopBarIcon>
        <Clock/>
      </TopBarSide>
    </Topbar>
  )
}

export default Component
