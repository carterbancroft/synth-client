import React from 'react'
import Tone from 'tone'

import Instrument from './Instrument'


class App extends React.Component {
  state = {
    beat: 0
  }

  constructor(props) {
    super(props)

    const beat = new Tone.Loop(song => {
      const c = this.state.beat
      const b = (c + 1) % 16

      this.setState({ beat: b })
    }, '16n')

    const bpm = 80

    Tone.Transport.bpm.value = parseInt(bpm)
    Tone.Transport.start()
    beat.start(0)
  }

  // Add instruments here... State should have a list of instruments.
  render() {
    const instruments = []

    /*for (let i = 0; i < 3; i++) {
      instruments.push(<Instrument />)
    }*/

    instruments.push(<Instrument currentBeat={this.state.beat} key={0} />)

    return (
      <div>
        { instruments }
      </div>
    )
  }
}

export default App
