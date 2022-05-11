import { useEffect } from 'react'
import { io } from "socket.io-client";

const useSocketClient = () => {
  useEffect(() => {
    const socket = io('http://localhost:8888');

    socket.on('event', data => {

    })
  })
}

export default useSocketClient

