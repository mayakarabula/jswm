import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { removeBox, setActive, setBoxFloat, setBoxStack } from './store'
import { config } from './config'
import { getAppContent } from './Applications'

const { containerHeight, containerWidth } = config

const Box = styled.div`
  grid-area: ${(props) => props.area};
  display: ${props => props.activeLayer ? 'flex' : 'none'};
  flex-direction: column;
  border: 1px solid black;
  background-color: white;

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
      <div className={active === id ? 'title-bar' : 'inactive-title-bar'}>
        {active === id && <button aria-label="Close" class="close" onClick={() => dispatch(removeBox(id))}></button>}
        <h1 class="title">{type}</h1>
        {active === id && <button aria-label="Resize" class="resize" onClick={() => dispatch(float ? setBoxStack(id) : setBoxFloat(id))}></button>}
      </div>
      <ContentWrapper>{getAppContent(type)}</ContentWrapper>
    </Box>
  )
}

export default Component
