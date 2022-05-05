import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import { config } from './config'
import Box from './Box'

const { margin, topBarHeight, containerHeight, containerWidth } = config

const Container = styled.div`
  padding: ${margin}px;
  padding-top ${margin + topBarHeight}px;
  box-sizing: border-box;
  height: 100vh;
  width: 100vw;
  display: grid; 
  gap: ${margin}px;
  grid-template-areas: 
    ${(props) => props.template};
    background-image: url('./v.jpg');
`

const getNewTemplate = () => {
  const map = []

  for (let y = 0; y < containerHeight; y++) {
    map.push(new Array(containerWidth).fill('.'))
  }

  return map
}

const generateAreaTemplating = (boxes) => {
  const template = getNewTemplate()

  boxes
    .filter((box) => !box.float)
    .forEach((box) => {
      for (let y = box.top; y < box.top + box.height; y++) {
        for (let x = box.left; x < box.left + box.width; x++) {
          template[y][x] = box.id
        }
      }
    })

  return template.map((row) => '"' + row.join(' ') + '"').join('\n')
}

const Component = (props) => {
  const boxes = useSelector(props.boxesSelector)
  const [template, setTemplate] = useState(generateAreaTemplating(boxes))

  useEffect(() => {
    setTemplate(generateAreaTemplating(boxes))
  }, [boxes])

  return (
    <Container template={template}>
      {boxes.map((box) => (
        <Box key={box.id} box={box} />
      ))}
    </Container>
  )
}

export default Component
