import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { removeBox, setActive, setBoxFloat, setBoxStack } from './store'
import { colors } from './style'
import { config } from './config'
import { getAppContent } from './Applications'

const { margin, containerHeight, containerWidth } = config

const Box = styled.div`
  grid-area: ${(props) => props.area};
  background: ${(props) => (props.active ? 'lightblue' : 'pink')};
  border: 2px solid ${(props) => (props.active ? 'lightblue' : 'pink')};
  display: ${props => props.activeLayer ? 'flex' : 'none'};
  flex-direction: column;

  ${(props) =>
    props.box.float
      ? `
    position: fixed;
    left: ${(props.box.left / containerWidth) * 100}%;
    top: ${(props.box.top / containerHeight) * 100}%;
    width: ${(props.box.width / containerWidth) * 100}%;
    height: ${(props.box.height / containerHeight) * 100}%;
  `
      : ''}

  z-index: ${(props) => (props.active ? 900 : 100)};
`

const ContentWrapper = styled.div`
  flex: 1;
`

const WindowBar = styled.div`
  background-color: #16171e;
  color: ${colors.white};
  padding: 5px 10px;
  font-size: 11px;
  display: flex;
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const BoxIcon = styled.a`
  text-decoration: none;
  color: inherit;
  cursor: pointer;
  display: block;
  margin-left: ${margin}px;
`

const WindowBarSide = styled.div`
  display: flex;
  gap: ${margin};
`

const selectActive = (state) => state.active
const selectLayer = (state) => state.layer

const Component = (props) => {
  const { id, type, float } = props.box
  const active = useSelector(selectActive)
  const layer = useSelector(selectLayer)
  const dispatch = useDispatch()

  return (
    <Box
      area={id}
      box={props.box}
      active={active === id}
      activeLayer={layer === props.box.layer}
      tabIndex="0"
      onFocus={() => dispatch(setActive(id))}
      onClick={() => dispatch(setActive(id))}
      onMouseOver={() => setActive(id)}
    >
      <WindowBar>
        <WindowBarSide>
          <span>{type}</span>
        </WindowBarSide>
        <WindowBarSide>
          <BoxIcon
            onClick={() => dispatch(float ? setBoxStack(id) : setBoxFloat(id))}
          >
            
          </BoxIcon>
          <BoxIcon onClick={() => dispatch(removeBox(id))}></BoxIcon>
        </WindowBarSide>
      </WindowBar>
      <ContentWrapper>{getAppContent(type)}</ContentWrapper>
    </Box>
  )
}

export default Component
