import React from 'react'
import Tone from 'tone'

import Dash from './Dash'
import Instrument from './Instrument'


class App extends React.Component {
  state = {
    // Tracks which beat we are on in the 16 beat measure
    beat: 0,
    // Stores all the instruments currently added to the overall loop
    instruments: [],
    // The recording contains the current state of the enter loop. It can be
    // persisted to a DB for sharing.
    recording: [],
    isLooping: false,
  }

  // Used to start and stop the loop from playing.
  toggleLoop = () => {
    if (Tone.Transport.state === 'stopped') {
      // The transport is tone's internal time keeper. It handles keeping things
      // within a loop in sync without having to worry about js timers. If it
      // hasn't been started yet, start it.
      Tone.Transport.start()
    }

    if (this.state.isLooping) {
      this.loop.stop()
    }
    else {
      this.loop.start(0)
    }

    this.setState({ isLooping: !this.state.isLooping })
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

  // Used to update the current state of the recording.
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

  /*saveRecording = () => {
    const url = 'http://localhost:4000/graphql'
    console.log(JSON.stringify(this.state.recording))
    const body = {
      query: `mutation {
        createComposition(compositionInput: {data:${JSON.stringify(this.state.recording)}}) {
          shortid
        }
      }`
    })
    console.log('about to print body')
    console.log(body)
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body
    }

    fetch(url, options)
      .then(res => res.json())
      .then(res => console.log(res.data));
  }*/

  componentDidMount() {
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


  render() {
    const instrumentComponents = this.state.instruments.map(instrument => {
      const currRecording = this.state.recording.find(r => r.name === instrument.name)
      return (
        <Instrument
          key={ instrument.name }
          instrument={ instrument }
          currentBeat={ this.state.beat }
          recording={ currRecording.data }
          updateRecording={ this.updateRecording }
          isLooping={ this.state.isLooping }
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
          isLooping={ this.state.isLooping }
        />
        { instrumentComponents }
        <button
          key="saveRecording"
          onClick={ this.saveRecording }
          className="saveRecordingButton">Save</button>
      </div>
    )
  }
}

export default App
