import React from 'react'

import Instrument from './Instrument'


class App extends React.Component {
  render() {
    const instruments = []

    for (let i = 0; i < 3; i++) {
      instruments.push(<Instrument />)
    }

    return (
      <div>
        { instruments }
      </div>
    )
  }
}

export default App
