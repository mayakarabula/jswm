import Topbar from './Topbar'
import Container from './Container'
import useSocketClient from './Socket'

const selectBoxes = (state) => state.boxes

function App() { 
  useSocketClient()

  return (
    <div>
      <Topbar />
      <Container boxesSelector={selectBoxes} />
    </div>
  )
}

export default App
