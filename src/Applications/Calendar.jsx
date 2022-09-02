import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const Component = () => {
    return <Calendar />
}

const config = {
    mode: 'float',
    name: 'Calendar',
    width: 4,
    height: 4,
    top: 3,
    left: 19
  }
  
  const module = { Component, config }
  
  export default module