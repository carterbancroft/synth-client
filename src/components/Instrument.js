import React from 'react'
import Tone from 'tone'

import Cell from './Cell'


class Instrument extends React.Component {
  constructor(props) {
    super(props)

    this.synth = new Tone.MembraneSynth().toMaster()
  }

  play = () => {
    this.synth.triggerAttackRelease('C1', '8n', this.props.currentTime)
  }

  render() {
    const cells = []

    for (let i = 0; i < 16; i++) {
      cells.push(<Cell play={this.play} key={ i } isPlaying={ this.props.currentBeat === i } />)
    }

    return (
      <div className="instrument">
        { cells }
      </div>
    )
  }
}

export default Instrument
