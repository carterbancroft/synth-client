import React from 'react'
import Tone from 'tone'

import Instrument from './Instrument'


class App extends React.Component {
  state = {
    beat: 0,
    time: null,
  }

  constructor(props) {
    super(props)

    this.isLooping = false

    this.loop = new Tone.Loop(time => {
      const c = this.state.beat
      const b = (c + 1) % 16

      this.setState({ beat: b, time })
    }, '16n')

    const bpm = 80

    Tone.Transport.bpm.value = parseInt(bpm)
    Tone.Transport.start()
  }

  toggleLoop = () => {
    if (this.isLooping) {
      this.loop.stop()
    }
    else {
      this.loop.start(0)
    }

    this.isLooping = !this.isLooping
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
        <button onClick={this.toggleLoop}>Loop</button>
      </div>
    )
  }
}

export default App
