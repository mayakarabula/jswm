import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { appTypes } from './Applications'
import { config } from './config'
import {
  addBox,
  setActive,
  setBoxMove,
  setNextActive,
  setPrevActive,
  setSplit,
} from './store'
import { colors } from './style'

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

const Component = () => {
  const dispatch = useDispatch()
  const boxes = useSelector(selectBoxes)
  const split = useSelector(selectSplit)
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
            <TopBarIcon onClick={() => dispatch(setSplit(split - 1))}>
              Left
            </TopBarIcon>
            <TopBarIcon onClick={() => dispatch(setSplit(split + 1))}>
              Right
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
      </TopBarSide>
      <TopBarSide>
        <span>Heyyy Mayaaa</span>
      </TopBarSide>
    </Topbar>
  )
}

export default Component
