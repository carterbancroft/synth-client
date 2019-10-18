import React from 'react'

import Cell from './Cell'


// This defines a grouping of pad components to make up a single drum loop of
// 16 beats. i.e. it's made up of 16 pads.
class Instrument extends React.Component {
  componentDidMount() {
    // We have some special casing for Tone.js synths. Individual instruments
    // may have extra options defining them, or they may not. If they do
    // then we need to pass those in. I could be clever and pass null and not
    // have this conditional but Tone.js treats null as something specific.
    // It's better to have the explicit conditional even if it's extra code in
    // this case.
    if (this.props.synthOptions) {
      this.synth = new this.props.synth(this.props.synthOptions).toMaster()
    }
    else {
      this.synth = new this.props.synth().toMaster()
    }
  }

  // Handles playing a given pad within the instrument.
  play = () => {
    const attackRelease = this.props.attackRelease

    // More special casing depending on what instrument we are working with.
    if (attackRelease.note) {
      this.synth.triggerAttackRelease(
        attackRelease.note,
        attackRelease.duration,
        undefined,
      )
    }
    else {
      this.synth.triggerAttackRelease(
        attackRelease.duration,
        undefined,
        attackRelease.velocity
      )
    }
  }

  updateRecording = padId => {
    this.props.updateRecording(this.props.name, padId)
  }

  render() {
    const cells = []

    // Render 16 pads for any particular instrument.
    for (let i = 0; i < 16; i++) {
      const cell = (
        <Cell
          play={ this.play }
          key={ i }
          cellId={ i }
          isPlaying={ this.props.currentBeat === i }
          recordingState={ this.props.recording[i] }
          updateRecording={ this.updateRecording }
        />
      )

      cells.push(cell)
    }

    return (
      <div className="instrument">
        { cells }
      </div>
    )
  }
}

export default Instrument
