import { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { io } from "socket.io-client";
import { resizeBox, setBoxMove, setNextActive, setPrevActive } from './store';

const useSocketClient = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    const socket = io('http://localhost:8888');

    socket.on('emit', data => console.log({ data }))

    socket.on('move', data => {
      console.log('MOVEE')
      dispatch(setBoxMove(data))
    })

    socket.on('resize', data => {
      dispatch(resizeBox(data))
    })

    socket.on('focus', data => {
      if (data === 'next') {
        dispatch(setNextActive())
      }
      if (data === 'prev') {
        dispatch(setPrevActive())
      }
    })
  })
}

export default useSocketClient

