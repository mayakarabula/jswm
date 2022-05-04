import { max } from 'lodash-es'
import { min } from 'lodash-es'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { appTypes } from './Applications'
import { config } from './config'
import { addBox, setActive, setNextActive, setPrevActive, setSplit } from './store'
import { colors } from './style'

const {
    topBarHeight,
    margin
} = config

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
`

const TopBarSide = styled.div`
  display: flex;
  gap: ${margin}px;
`

const selectBoxes = (state) => state.boxes
const selectSplit = (state) => state.split

const Component = () => {
    const dispatch = useDispatch()
    const boxes = useSelector(selectBoxes)
    const split = useSelector(selectSplit)
    const [showFocus, setShowFocus] = useState(false)
    const [showResize, setShowResize] = useState(false)

    return (
        <Topbar>
        <TopBarSide>
            <TopBarIcon>
            
            </TopBarIcon>
          <TopBarIcon onClick={() => dispatch(addBox(appTypes.terminal))}>
            
          </TopBarIcon>
          <TopBarIcon onClick={() => dispatch(addBox(appTypes.vscode))}>
            
          </TopBarIcon>
            <TopBarIcon onClick={() => setShowFocus(!showFocus)}>
             {showFocus ?  '' : ''}
            </TopBarIcon>
          {
              showFocus && (
               <>
                <TopBarIcon onClick={() => boxes[0] && dispatch(setActive(boxes[0].id))}>
                    
                </TopBarIcon>
                <TopBarIcon onClick={() => boxes[1] && dispatch(setActive(boxes[1].id))}>
                    
                </TopBarIcon>
                <TopBarIcon onClick={() => dispatch(setNextActive())}>
                    
                </TopBarIcon>
                <TopBarIcon onClick={() => dispatch(setPrevActive())}>
                    
                </TopBarIcon>
               </>
              )
          }
            <TopBarIcon onClick={() => setShowResize(!showResize)}>
            ﭕ
            </TopBarIcon>
          {showResize && (
              <>
              <TopBarIcon onClick={() => dispatch(setSplit(split - 1))}>
            ﲕ 
          </TopBarIcon>
          <TopBarIcon onClick={() => dispatch(setSplit(split + 1))}>
            ﲖ 
          </TopBarIcon>
          </>
          )}
        </TopBarSide>
        <TopBarSide>
          <span>
            Heyyy Mayaaa
          </span>
        </TopBarSide>
      </Topbar>
    )
}

export default Component
