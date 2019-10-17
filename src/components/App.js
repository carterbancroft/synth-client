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
    const { instruments } = this.state
    instruments.push(instrument)
    this.setState({ instruments })
  }

  // Used to remove an instrument from the loop.
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
