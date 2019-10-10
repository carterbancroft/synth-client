import React from 'react'
import Tone from 'tone'

import Instrument from './Instrument'
import InstrumentPicker from './InstrumentPicker'


class App extends React.Component {
  state = {
    beat: 0,
    time: null,
    instruments: [
      {
        synth: Tone.MembraneSynth,
        attackRelease: {
          note: 'C1',
          duration: '8n',
        },
        key: 0,
      },
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

    const bpm = 120

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

  addInstrument = (instrument) => {
    const { instruments } = this.state
    instruments.push(instrument)
    this.setState({ instruments })
  }

  render() {
    return (
      <div>
        {
          this.state.instruments.map(instrument => {
            return <Instrument
              synth={ instrument.synth }
              synthOptions={ instrument.synthOptions || null }
              attackRelease={ instrument.attackRelease }
              currentBeat={ this.state.beat }
              key={instrument.key}
            />
          })
        }
        <button onClick={this.toggleLoop}>Loop</button>
        <InstrumentPicker addInstrument={this.addInstrument} />
      </div>
    )
  }
}

export default App
