import Topbar from './Topbar'
import Container from './Container'
import useSocketClient from './Socket'
import SeaImage from './images/sea.png'

const selectBoxes = (state) => state.boxes

function App() { 
  useSocketClient()

  return (
    <div style={{ backgroundImage: `url(${SeaImage})`, backgroundSize: '100% 100%' }} >
      <Topbar />
      <Container boxesSelector={selectBoxes} />
    </div>
  )
}

export default App
