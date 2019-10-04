import React from 'react'
import Tone from 'tone'

import Instrument from './Instrument'

let beat
let bassSynth

class App extends React.Component {
  state = {
    beat: 0,
    time: null,
  }

  constructor(props) {
    super(props)

    beat = new Tone.Loop(time => {
      const c = this.state.beat
      const b = (c + 1) % 16

      this.setState({ beat: b, time })
    }, '16n')

    document.addEventListener('keydown', this.handleKeyPress);

    const bpm = 80

    bassSynth = new Tone.MembraneSynth().toMaster()

    Tone.Transport.bpm.value = parseInt(bpm)
  }

  play = () => {
    bassSynth.triggerAttackRelease('C1', '8n', this.state.time)
  }

  handleClick = () => {
    Tone.Transport.start()
    beat.start(0)
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
        <button onClick={this.handleClick}>Loop</button>
      </div>
    )
  }
}

export default App
