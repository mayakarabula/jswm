import Topbar from './Topbar'
import Container from './Container'

const selectBoxes = (state) => state.boxes

function App() {
  return (
    <div>
      <Topbar />
      <Container boxesSelector={selectBoxes} />
    </div>
  )
}

export default App
