import React from 'react'
import Tone from 'tone'

import Instrument from './Instrument'

let bassSynth

class App extends React.Component {
  state = {
    beat: 0,
    time: null,
  }

  constructor(props) {
    super(props)

    const beat = new Tone.Loop(time => {
      const c = this.state.beat
      const b = (c + 1) % 16

      this.setState({ beat: b, time })
    }, '16n')

    const bpm = 80

    bassSynth = new Tone.MembraneSynth().toMaster()

    Tone.Transport.bpm.value = parseInt(bpm)
    Tone.Transport.start()
    beat.start(0)
  }

  play = () => {
    bassSynth.triggerAttackRelease('C1', '8n', this.state.time)
  }

  // Add instruments here... State should have a list of instruments.
  render() {
    const instruments = []

    /*for (let i = 0; i < 3; i++) {
      instruments.push(<Instrument />)
    }*/

    instruments.push(<Instrument play={this.play} currentBeat={this.state.beat} key={0} />)

    return (
      <div>
        { instruments }
      </div>
    )
  }
}

export default App
