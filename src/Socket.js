import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { io } from 'socket.io-client'
import {
  addBox,
  removeBox,
  resizeBox,
  setBoxFloat,
  setBoxMove,
  setBoxStack,
  setLayer,
  setNextActive,
  setPrevActive,
  setSystemInfo,
  setTitlebar,
} from './store/actions'

const useSocketClient = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    const socket = io('http://localhost:8888')

    socket.on('emit', (data) => console.log({ data }))

    socket.on('move', (data) => {
      console.log('MOVEE')
      dispatch(setBoxMove(data))
    })

    socket.on('resize', (data) => {
      dispatch(resizeBox(data))
    })

    socket.on('focus', (data) => {
      if (data === 'next') {
        dispatch(setNextActive())
      }
      if (data === 'prev') {
        dispatch(setPrevActive())
      }
    })

    socket.on('float', (data) => {
      if (data === 'true') {
        dispatch(setBoxFloat())
      }
      if (data === 'false') {
        dispatch(setBoxStack())
      }
    })

    socket.on('kill', (data) => {
      dispatch(removeBox())
    })

    socket.on('titlebar', (data) => {
      if (data === 'true') {
        dispatch(setTitlebar(false))
      }
      if (data === 'false') {
        dispatch(setTitlebar(true))
      }
    })

    socket.on('open', (data) => {
      dispatch(addBox('Image', data))
    })

    socket.on('layer', (data) => {
      dispatch(setLayer(+data))
    })

    socket.on('set_system_info', (data) => {
      dispatch(setSystemInfo(data))
    })
  })
}

export default useSocketClient
