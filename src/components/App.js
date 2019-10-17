import React from 'react'
import Tone from 'tone'

import Dash from './Dash'
import Instrument from './Instrument'


class App extends React.Component {
  state = {
    beat: 0,
    time: null,
    instruments: [],
  }

  constructor(props) {
    super(props)

    this.isLooping = false

    this.loop = new Tone.Loop(time => {
      const c = this.state.beat
      const b = (c + 1) % 16

      this.setState({ beat: b, time })
    }, '16n')

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

  addInstrument = instrument => {
    const { instruments } = this.state
    instruments.push(instrument)
    this.setState({ instruments })
  }

  removeInstrument = instrumentName => {
    const { instruments } = this.state
    const filtered = instruments.filter(i => i.name !== instrumentName)
    this.setState({ instruments: filtered })
  }

  render() {
    return (
      <div>
        <Dash key="dashboard"
          toggleLoop={ this.toggleLoop }
          addInstrument={ this.addInstrument }
          removeInstrument={ this.removeInstrument }
          currentBeat={ this.state.beat }
        />
        {
          this.state.instruments.map(instrument => {
            return <Instrument
              synth={ instrument.config.synth }
              synthOptions={ instrument.config.synthOptions || null }
              attackRelease={ instrument.config.attackRelease }
              currentBeat={ this.state.beat }
              key={ instrument.config.key }
            />
          })
        }
      </div>
    )
  }
}

export default App
