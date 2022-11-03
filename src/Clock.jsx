import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { appTypes } from './appHelpers'
import { addBox } from './store/actions'

const Clock = () => {
  const [time, setTime] = useState(new Date())
  const dispatch = useDispatch()

  useEffect(() => {
    setInterval(() => {
      setTime(new Date())
    }, 1000)
  }, [])

  return (
    <span onClick={() => dispatch(addBox(appTypes.Calendar))}>
      {time.toLocaleString()}
    </span>
  )
}

export default Clock
