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
        attackRelease: {
          note: 'C1',
          duration: '8n',
          time: null
        },
        key: 0,
      },
      {
        synth: Tone.MetalSynth,
        synthOptions: {
          frequency: 250,
          envelope: {
            attack: 0.001,
            decay: 0.1,
            release: 0.01,
          },
          harmonicity: 3.1,
          modulationIndex: 16,
          resonance: 4000,
          octaves: 1.5,
        },
        attackRelease: {
          duration: '32n',
          time: null,
          velocity: 0.3,
        },
        key: 1,
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
      </div>
    )
  }
}

export default App
