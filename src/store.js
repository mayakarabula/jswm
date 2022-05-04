import { findIndex } from 'lodash-es';
import { v4 as uuid } from 'uuid';
import { config } from './config';

const {
    containerHeight,
    containerWidth,
    split
} = config

const initialState = ({
    boxes: [],
    active: null,
    split: split,
    template: ''
})

const types = {
    ADD_BOX: 'ADD_BOX',
    REMOVE_BOX: 'REMOVE_BOX',
    SET_ACTIVE: 'SET_ACTIVE',
    SET_NEXT_ACTIVE: 'SET_NEXT_ACTIVE',
    SET_PREV_ACTIVE: 'SET_PREV_ACTIVE',
    SET_SPLIT: 'SET_SPLIT',
}

export const addBox = (appType) => ({
    type: types.ADD_BOX,
    appType
})

export const removeBox = (id) => ({
    type: types.REMOVE_BOX,
    id
})

export const setActive = (active) => ({
    type: types.SET_ACTIVE,
    active
})

export const setNextActive = () => ({
    type: types.SET_NEXT_ACTIVE
})

export const setPrevActive = () => ({
    type: types.SET_PREV_ACTIVE
})

export const setSplit = (split) => ({
    type: types.SET_SPLIT,
    split
})

const setPositions = (boxes, split) => {
    if (boxes.length > 0) {
        boxes[0].top = 0
        boxes[0].left = 0
        boxes[0].width = boxes.length > 1 ? split : containerWidth
        boxes[0].height = containerHeight
    }

    const sideBoxesSize = boxes.length - 1

    if (sideBoxesSize > 0) {
        const left = split
        const height = Math.floor(containerHeight / sideBoxesSize)

        for (let i = 1; i <= sideBoxesSize; i++) {
            boxes[i].left = left
            boxes[i].top = height * (i - 1)
            boxes[i].width = containerWidth - split
            boxes[i].height = height
        }
    }

    return [...boxes]
}

export const reducer = (state = initialState, action) => {
    let { boxes, active, split, template } = state
    let index

    switch (action.type) {
        case types.SET_SPLIT:
            split = action.split
            boxes = setPositions(boxes, split)

            return {
                ...state,
               boxes,
               split,
               template
            }

        case types.SET_ACTIVE:
            return {
                ...state,
                active: action.active
            }

        case types.ADD_BOX:
            boxes = setPositions([...boxes, { 
                id: 'box' + uuid().split('-')[0],
                type: action.appType
            }], split)

            return {
                ...state,
                boxes
            }

        case types.REMOVE_BOX:
            boxes = setPositions(boxes.filter(box => box.id !== action.id), split)

            return {
                ...state,
                boxes
            }

        case types.SET_NEXT_ACTIVE:
            index = findIndex(boxes, { id: active }) + 1

            return {
                ...state,
                active: boxes[index].id
            }
        case types.SET_PREV_ACTIVE: 
            index = findIndex(boxes, { id: active }) - 1

            return {
                ...state,
                active: boxes[index].id
            }

        default:
            return state
    }
}
