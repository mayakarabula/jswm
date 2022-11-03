import { find } from 'lodash-es'
import { config } from '../../config'

const { containerHeight, containerWidth } = config

const setPositions = ({ boxes, split, layer, order }) => {
  const stackBoxes = order
    .map((id) => find(boxes, { id }))
    .filter((box) => box.layer === layer)

  if (stackBoxes.length > 0) {
    const left = split
    const boxesWithModHeight = stackBoxes.filter((box) => box.modHeight)
    const modHeights = boxesWithModHeight.reduce(
      (prev, curr) => prev + curr.modHeight,
      0
    )
    const avgHeight = Math.floor(
      (containerHeight - modHeights) /
        (stackBoxes.length - boxesWithModHeight.length - 1)
    )

    let positionY = 0

    for (let i = 0; i < stackBoxes.length; i++) {
      if (stackBoxes[i].layer === layer) {
        if (i === 0) {
          stackBoxes[i].top = 0
          stackBoxes[i].left = 0
          stackBoxes[i].width = stackBoxes.length > 1 ? split : containerWidth
          stackBoxes[i].height = containerHeight
        } else {
          stackBoxes[i].left = left
          stackBoxes[i].top = positionY
          stackBoxes[i].width = containerWidth - split
          stackBoxes[i].height = stackBoxes[i].modHeight || avgHeight

          positionY += stackBoxes[i].height
        }
      }
    }
  }

  return [...boxes]
}

export default setPositions
