import React from 'react'
import Tone from 'tone'

import Instrument from './Instrument'


class App extends React.Component {
  state = {
    beat: 0,
    time: null,
    instruments: [
      {
        synth: Tone.MembraneSynth,
        key: Date.now()
      }
    ]
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

  render() {
    return (
      <div>
        {
          this.state.instruments.map(instrument => {
            return <Instrument
              synth={instrument.synth}
              currentBeat={this.state.beat}
              key={instrument.key}
            />
          })
        }
        <button onClick={this.toggleLoop}>Loop</button>
      </div>
    )
  }
}

export default App
