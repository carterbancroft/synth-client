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
        name: 'Cymbal',
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
    alreadyAdded: [],
    selectedInstrument: 'Bass',
  }

  handleClick = () => {
    const { instruments, alreadyAdded } = this.state
    const instrument = instruments.find(i => i.name === this.state.selectedInstrument)
    const config = instrument.config

    alreadyAdded.push(instrument.name)

    for (let i of instruments) {
      if (alreadyAdded.includes(i.name)) continue

      this.setState({ alreadyAdded, selectedInstrument: i.name })
      break
    }


    this.props.addInstrument(config)
  }

  render() {
    const { instruments, alreadyAdded } = this.state
    const options = instruments.map(instrument => {
      if (alreadyAdded.includes(instrument.name)) return

      return <option
        key={ instrument.id }
        value={ instrument.name }>{ instrument.name }</option>
    })

    return (
      <div>
        <select
          value={ this.state.selectedInstrument }
          onChange={
            (e) => this.setState({ selectedInstrument: e.target.value })
          }>
          { options }
        </select>
        <button onClick={ this.handleClick }>Add</button>
      </div>
    )
  }
}

export default InstrumentPicker
