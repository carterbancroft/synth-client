import React from 'react'
import Tone from 'tone'

import Dash from './Dash'
import Instrument from './Instrument'

//import recording from '../recording'

class App extends React.Component {
  state = {
    // Tracks which beat we are on in the 16 beat measure
    beat: 0,
    // Stores all the instruments currently added to the overall loop
    instruments: [],
    recording: [],
  }

  componentDidMount() {
    // Used to tell if the loop is running. Toggled by hitting play/pause.
    this.isLooping = false

    // Configure our Tone.js loop to hae 16 notes (this essentially means every
    // beat is a 16th note).
    this.loop = new Tone.Loop(time => {
      // Do a little math to calculate which beat within the loop timer we are
      // on.
      const previousBeat = this.state.beat

      // As the loop runs the beat as defined in the Transport will just keep
      // counting higher. We can mod it by 16 to get where we are at within
      // a 16 beat measure.
      const currentBeat = (previousBeat + 1) % 16

      this.setState({ beat: currentBeat })
    }, '16n') // The 16n says our loop should be using 16th notes.
  }

  // Used to start and stop the loop from playing.
  toggleLoop = () => {
    if (Tone.Transport.state === 'stopped') {
      // The transport is tone's internal time keeper. It handles keeping things
      // within a loop in sync without having to worry about js timers. If it
      // hasn't been started yet, start it.
      Tone.Transport.start()
    }

    if (this.isLooping) {
      this.loop.stop()
    }
    else {
      this.loop.start(0)
    }

    this.isLooping = !this.isLooping
  }

  // Used to add a new instrument to the loop. Instruments are defined in
  // src/components/instruments.js
  addInstrument = instrument => {
    const { instruments, recording } = this.state
    instruments.push(instrument)

    const recordedInstrument = {
      name: instrument.name,
      data: new Array(16).fill(false)
    }
    recording.push(recordedInstrument)


    this.setState({ instruments, recording })
  }

  // Used to remove an instrument from the loop.
  removeInstrument = instrumentName => {
    const { instruments } = this.state
    const filtered = instruments.filter(i => i.name !== instrumentName)
    this.setState({ instruments: filtered })
  }

  updateRecording = (instrumentName, padId) => {
    this.setState(prevState => {
      // TODO: Should I spread here??
      const updatedRecording = prevState.recording
      updatedRecording.forEach(r => {
        if (r.name !== instrumentName) return

        r.data[padId] = !r.data[padId]
      })

      return { recording: updatedRecording }
    })
  }

  getRecording = () => {
    console.log(this.state.recording)
  }

  render() {
    const instrumentComponents = this.state.instruments.map(instrument => {
      const currRecording = this.state.recording.find(r => r.name === instrument.name)
      return (
        <Instrument
          synth={ instrument.config.synth }
          synthOptions={ instrument.config.synthOptions || null }
          attackRelease={ instrument.config.attackRelease }
          currentBeat={ this.state.beat }
          key={ instrument.config.key }
          recording={ currRecording.data }
          name={ instrument.name }
          updateRecording={ this.updateRecording }
        />
      )
    })

    return (
      <div>
        <Dash key="dashboard"
          toggleLoop={ this.toggleLoop }
          addInstrument={ this.addInstrument }
          removeInstrument={ this.removeInstrument }
          currentBeat={ this.state.beat }
          isLooping={ this.isLooping }
        />
        { instrumentComponents }
        <button key="saveButton" onClick={ this.getRecording }>Get Data</button>
      </div>
    )
  }
}

export default App
