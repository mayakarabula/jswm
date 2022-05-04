import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { removeBox, setActive } from './store'
import { colors } from './style'
import { config } from './config'
import { getAppContent } from './Applications'

const {
    margin
} = config

const Box = styled.div`
    grid-area: ${(props => props.area)};
    background: ${(props) => props.active ? 'lightblue' : 'pink'};
    border: 2px solid ${(props) => props.active ? 'lightblue' : 'pink'};
    display: flex;
    flex-direction: column;
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
`

const WindowBarSide = styled.div`
    display: flex;
    gap: ${margin};
`

const selectActive = (state) => state.active

const Component = (props) => {
    const { id, type } = props.box
    const active = useSelector(selectActive)
    const dispatch = useDispatch()

    return (
        <Box 
            area={id} 
            active={active === id} 
            tabIndex='0'
            onFocus={() => dispatch(setActive(id))}
            onClick={() => dispatch(setActive(id))}
            onMouseOver={() => setActive(id)}
        >
            <WindowBar>
                <WindowBarSide>
                    <span>Window</span>
                </WindowBarSide>
                <WindowBarSide>
                    <BoxIcon onClick={() => dispatch(removeBox(id))}></BoxIcon>
                </WindowBarSide>
            </WindowBar>
            <ContentWrapper onMouseOver={() => dispatch(setActive(id))}>
                {getAppContent(type)}
            </ContentWrapper>
        </Box>
    )
}

export default Component