import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import {
  removeBox,
  setActive,
  setBoxFloat,
  setBoxMove,
  setBoxStack,
} from './store/actions'
import { config } from './config'
import { getAppContent } from './appHelpers'
import { useRef, useState } from 'react'

const { containerHeight, containerWidth } = config

const getPosition = (box) => {
  if (!box.float) {
    return ''
  }

  return `
    position: fixed;
    left: ${(box.left / containerWidth) * 100}%;
    top: ${(box.top / containerHeight) * 100}%;
    width: ${(box.width / containerWidth) * 100}%;
    height: ${(box.height / containerHeight) * 100}%;
  `
}

const Box = styled.div`
  grid-area: ${(props) => props.area};
  display: ${(props) => (props.activeLayer ? 'flex' : 'none')};
  flex-direction: column;

  ${(props) => getPosition(props.box)}

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
  const boxRef = useRef(null)
  const [offsets, setOffests] = useState({})

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
      draggable={float}
      ref={boxRef}
      onDragCapture={(event) => {
        if (event.pageX && event.pageY) {
          dispatch(
            setBoxMove(
              'exact',
              ((event.pageX - offsets.left) / window.innerWidth) *
                containerWidth,

              ((event.pageY - offsets.top) / window.innerHeight) *
                containerHeight
            )
          )
        }
      }}
      onDragStart={(e) => {
        setOffests({
          left: e.pageX - boxRef.current.offsetLeft,
          top: e.pageY - boxRef.current.offsetTop,
        })

        var crt = boxRef.current.cloneNode(true)
        crt.style.display = 'none'
        e.dataTransfer.setDragImage(crt, 0, 0)
      }}
    >
      {!props.box.noTitleBar && (
        <div className={active === id ? 'title-bar' : 'inactive-title-bar'}>
          {active === id && (
            <button
              aria-label="Close"
              class="close"
              onClick={() => dispatch(removeBox(id))}
            ></button>
          )}
          <h1 class="title">{type}</h1>
          {active === id && (
            <button
              aria-label="Resize"
              class="resize"
              onClick={() =>
                dispatch(float ? setBoxStack(id) : setBoxFloat(id))
              }
            ></button>
          )}
        </div>
      )}
      <ContentWrapper>{getAppContent(type, props.box.input)}</ContentWrapper>
    </Box>
  )
}

export default Component
