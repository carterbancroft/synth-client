import React from 'react'
import Tone from 'tone'


class InstrumentPicker extends React.Component {
  state = {
    instruments: [
      {
        id: 0,
        name: 'Bass',
        config: {
          synth: Tone.MembraneSynth,
          attackRelease: {
            note: 'C1',
            duration: '8n',
          },
          key: 0,
        },
      },
      {
        id: 1,
        name: 'High Hat',
        config: {
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
            velocity: 0.3,
          },
          key: 1,
        },
      }
    ],
  }

  toggleInstrument = e => {
    const name = e.target.value
    const isChecked = e.target.checked
    const { instruments } = this.state
    const instrument = instruments.find(i => i.name === name)

    isChecked ?
      this.props.addInstrument(instrument) :
      this.props.removeInstrument(instrument.name)
  }

  componentDidMount() {
    const { instruments } = this.state

    // Add all the instruments on startup
    instruments.forEach(i => this.props.addInstrument(i))
  }

  render() {
    const { instruments } = this.state

    const checkboxes = instruments.map(instrument => {
      return (
        <li key={ instrument.id }>
          <input
            defaultChecked
            type="checkbox"
            key={ instrument.id }
            value={ instrument.name }
            onClick= { this.toggleInstrument } />
          <label>{ instrument.name }</label>
        </li>
      )
    })

    return (
      <div>
        <ul className="instrumentSelector">
          { checkboxes }
        </ul>
      </div>
    )
  }
}

export default InstrumentPicker
